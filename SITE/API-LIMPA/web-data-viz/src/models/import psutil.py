import psutil
import time
from datetime import datetime, timedelta
import boto3
from uuid import getnode as get_mac
import json
from requests import HTTPError
import requests
import mysql.connector
import random

macAddress = "14857f833746"

# Configurações iniciais
URL = "https://moodle.sptech.school"
INTERVALO = 5

print("Iniciando a coleta de dados.")

dados_capturados = []

chave_id = "ASIAZZA7XBHSRTXO6XS4"
chave_secret = "43zydVGSmD7YMxBnAkIxkJrRlbRkD8ADqzlbFAWm"
session_token = "IQoJb3JpZ2luX2VjEKD//////////wEaCXVzLXdlc3QtMiJIMEYCIQCWb/MxCQ8XVXvvQJ402sosrwrVXtK5k3/LolA3XwkDGwIhALDyAbWBoCzL6TyYbPJ3BmJwNIKYmbHV/6epQn2oSsRnKrkCCEgQARoMNjcyMjI4OTAzMzk3IgxBG+1nQWtor9lNlt0qlgJPcTbDgnSEnplUYmYHnxH6EB32aC/6ITHEJk2H3rSrfGMo6GwJ8mbgl98lYETb3tZYBmVNR+yFvaAKhk/YgKFSWB4bWor0vd8laxV2sNHWGVQ3v7BQyM16LDe91NIG/uSto9Rmtt7d5FvUEM4YkUkBvxrKqFXALK5gOSQ5twvKs5fro2l6CNepLAeYUiPjiox1YnPiE3DS2Wcsh8noEY56TbZHwI+lStEOdW+7KvtwRgrWRDUXS5KDG0yY90FW8brM0UJIF8otnf1O4619wI6ozKNAP2AB+7mbiN9U/Ne2dSkkQVgzI0Uj7v6ls3rhtt4xX6snjDHvXgLEXj4OM02WM8dLE/n+NtzE9Dn5+9Jpp15byLKB5zDk8Jy6BjqcAQPQpcIeYJtTEeNftVynjkodpa5CXRS3587q4DuSSQaJQYVVxF7p06jAA/uhLQ9Aj7aoj0yEkIWJbReL2147MuIIgkDqO4YVAOPo/Ti7o6z+pjhDIGLyQk4342dL/7RdB2El5A1BJkxIxyi27XSNTg9RgguBRies4WD3yF/SjSp+ndSjGPBsFUoaKKukwMjF1fGNOBmuZSUrIjr7GA=="

session = boto3.Session(
    aws_access_key_id=chave_id,
    aws_secret_access_key=chave_secret,
    aws_session_token=session_token
)

s3_client = session.client('s3')
arquivo_json = "dadosCapturados.json"
bucket_name = "raw-stocks-fabricio"

try:
    response = s3_client.get_object(Bucket=bucket_name, Key=arquivo_json)
    dados_existentes = json.loads(response['Body'].read().decode('utf-8'))
    print(f"Arquivo {arquivo_json} baixado com sucesso.")
except Exception as e:
    print(f"Arquivo {arquivo_json} não encontrado. Criando novo arquivo.")
    dados_existentes = []

tempo_final = datetime.now() + timedelta(minutes=0.25)
i = 0

tamanho_ram = psutil.virtual_memory().total
tamanho_disco = psutil.disk_usage('C:/').total

while i < 100:
    fator2 = round(random.uniform(0, 15), 1)
    fator3 = round(random.uniform(0, 7), 1)
    fator4 = round(random.uniform(0, 1.7), 1)
    fator5 = round(random.uniform(0, 1.7), 1)
    fator6 = round(random.uniform(0, 1.5), 1)

    for j in range(0, 3):

        time.sleep(5)
        cpuP = psutil.cpu_percent()
        cpu_times = psutil.cpu_times()
        memoriaP = psutil.virtual_memory().percent
        memoriaB = psutil.virtual_memory().used
        discoP = psutil.disk_usage('C:/').percent
        discoB = psutil.disk_usage('C:/').used

        # Coleta dos bytes enviados e recebidos <<<< Não tirem os comentários de rede que eu fiz
        dados_rede = psutil.net_io_counters()
        bytes_enviados_inicio = dados_rede.bytes_sent
        bytes_recebidos_inicio = dados_rede.bytes_recv
        # time.sleep(5)
        # Coleta os contadores após o intervalo
        dados_rede = psutil.net_io_counters()
        bytes_enviados_fim = dados_rede.bytes_sent
        bytes_recebidos_fim = dados_rede.bytes_recv
        # Calcula a quantidade de dados transferidos no intervalo
        # Calcula a taxa de transferência em Mbps
        bytes_enviados = bytes_enviados_fim - bytes_enviados_inicio
        bytes_recebidos = bytes_recebidos_fim - bytes_recebidos_inicio
        mbps_enviados = round(((bytes_enviados * 8) / (10 ** 6 * INTERVALO)) + 20.5, 2)
        mbps_recebidos = round((bytes_recebidos * 8) / (10 ** 6 * INTERVALO) + 20.5, 2)
        # 10 Gbps ou mais é geralmente recomendado para servidores que processam transações de banco de alta frequência. ALERTAAA 1000 MB para evitar congestionamentos na rede.

        # LATÊNCIA <<<< Não tirem os comentários de rede que eu fiz
        # Vou usar alertas para latência acima de 100ms, porque a partir daí já começa a ter um risco de queda
        inicio = time.time()
        resposta = requests.get(URL, timeout=5)
        fim = time.time()
        latencia = round((fim - inicio) * 100, 2)

        data = {
            "macAddress": macAddress,
            "dataHora": str(datetime.now() - timedelta(days=i)),
            "cpuPercentual": cpuP,
            "memoriaPercentual": round(memoriaP + fator2, 1) if memoriaP + fator2 <= 100 else round(memoriaP - fator2, 1),
            "memoriaUsada": round((memoriaP + fator2) * tamanho_ram / 100) if memoriaP + fator2 <= 100 else round((memoriaP - fator2) * tamanho_ram / 100),
            "discoPercentual": round(discoP + fator3, 1) if discoP + fator3 <= 100 else round(discoP - fator3, 1),
            "discoUsado":  round((discoP + fator3) * tamanho_disco / 100) if discoP + fator3 <= 100 else round((discoP - fator3) * tamanho_disco / 100),
            "bytesEnviados": round(mbps_enviados * fator4),
            "bytesRecebidos": round(mbps_recebidos * fator5),
            "latencia": round(latencia * fator6)
        }

        print(data)

        dados_capturados.append(data)

    i += 1

with open(arquivo_json, mode='w', newline='') as file:
    dados_existentes.extend(dados_capturados)
    json.dump(dados_existentes, file)

print(f"Dados capturados e salvos em {arquivo_json}.")

try:
    s3_client.upload_file(arquivo_json, bucket_name, arquivo_json)
    print(f"Arquivo {arquivo_json} enviado para o bucket S3 {bucket_name}.")
except Exception as e:
    print(f"Falha ao enviar o arquivo: {e}")
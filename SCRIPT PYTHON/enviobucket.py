import psutil
import time
import pandas as pd
import boto3
from socket import gethostname

run = True

# Configuração do cliente
s3_client = boto3.client(
's3',
aws_access_key_id='',
aws_secret_access_key='',
aws_session_token='',
region_name='')

def byte_para_gb(byte):
    return byte / (1024 ** 3)

tempo = int(input("Digite o intervalo de tempo que você quer entre os cadastros (em segundos): "))

dados = []
nome = gethostname()

while run:
    print('=======================')

    # Obtém as informações da CPU e da memória
    cpu = psutil.cpu_percent()  # Porcentagem de uso da CPU
    memoria = psutil.virtual_memory()  # Informações da memória

    memoria_usada = byte_para_gb(memoria.used)  # Converte bytes para Gigabytes
    memoria_usada_formatada = f'{memoria_usada:.1f}'  # Formata o número

    # Imprime as informações no terminal
    print(f'Nome salvo: {nome}')
    print(f'A CPU está em {cpu} %')
    print(f'A memória está em {memoria.percent} %')

    # Adiciona os dados à lista
    dados.append({
        'Nome': nome,
        'CPU (%)': cpu,
        'Memória RAM (GB)': memoria.percent
    })

    # Cria um DataFrame a partir da lista de dados
    df = pd.DataFrame(dados)

    caminho_arquivo = "dados.csv"

    # Salva o DataFrame em um arquivo CSV
    df.to_csv(caminho_arquivo, index=True, encoding='utf-8')

    print('Dados salvos com sucesso!')

    nome_bucket = "s3-raw-runguard"
    chave_bucket = "dados.csv"

    # Faz upload de um arquivo para um bucket específico com um nome específico para o arquivo
    s3_client.upload_file(caminho_arquivo, nome_bucket, chave_bucket)
    time.sleep(tempo)
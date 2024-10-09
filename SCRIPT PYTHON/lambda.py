import json
import tempfile
import os
import boto3
import csv
from io import StringIO

def lambda_handler(event, context):
    try:

        s3 = boto3.client('s3',
        aws_access_key_id='',
        aws_secret_access_key='',
        aws_session_token='',
        region_name='')
        
        # Obter o arquivo CSV do S3
        resposta = s3.get_object(Bucket='s3-raw-runguard', Key="dadosraw.csv")
        
        # Ler o conteúdo do arquivo CSV
        file_content = resposta['Body'].read().decode('utf-8')
        
        # Converter o conteúdo CSV para JSON
        csv_reader = csv.DictReader(StringIO(file_content))
        
        # Criar uma lista de dicionários a partir do CSV
        lista_json = [linha for linha in csv_reader]
        
        # Gerar o arquivo JSON temporário
        nome_arquivo = os.path.join(tempfile.gettempdir(), 'dados.json')
        
        with open(nome_arquivo, mode='wt') as f:
            json.dump(lista_json, f)
        
        # Upload para o S3
        s3.upload_file(
            Filename=nome_arquivo,
            Bucket='s3-raw-runguard',
            Key='dados.json'
        )
        
        return lista_json

    except Exception as e:
        print(f"Erro ao processar o arquivo: {e}")
        return None

print(lambda_handler(None, None))
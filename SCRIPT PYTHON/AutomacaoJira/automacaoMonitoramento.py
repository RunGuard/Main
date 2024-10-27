import psutil
import time
import mysql.connector
import pandas as pd
import boto3
import platform
import socket

import json
import requests
from requests.auth import HTTPBasicAuth

# Configurações da conexão com JIRA
urlBase = "https://projeto.atlassian.net/rest/api/3"
auth = HTTPBasicAuth("ilys.maroto@sptech.school", "chave")
headers = {"Accept": "application/json", "Content-Type": "application/json"}

# Configuração do cliente
s3_client = boto3.client(
    's3',
    aws_access_key_id='',
    aws_secret_access_key='',
    aws_session_token='',
    region_name=''
)

# Funções de integração com JIRA
def buscarUsuario(email):
    url = f"{urlBase}/user/search"
    params = {"query": email}
    
    response = requests.get(url, headers=headers, auth=auth, params=params)
    if response.status_code == 200:
        users = response.json()
        if users:
            return users[0]['accountId']
        else:
            print("Usuário não encontrado.")
            return None
    else:
        print(f"Falha ao buscar usuário. Status: {response.status_code}, Detalhes: {response.text}")
        return None

def abrirChamado(summary, project_key="RUNGUARD", issue_type="Solicitação por e-mail"):
    url = f"{urlBase}/issue"
    payload = json.dumps({
        "fields": {
            "summary": summary,
            "project": {"key": project_key},
            "issuetype": {"name": issue_type}
        }
    })

    response = requests.post(url, headers=headers, auth=auth, data=payload)
    if response.status_code == 201:
        issue_data = response.json()
        print(f"Chamado criado com sucesso! ID: {issue_data['id']}")
        return issue_data['id']
    else:
        print(f"Falha ao abrir chamado. Status: {response.status_code}, Detalhes: {response.text}")
        return None
    
def contarQtdChamados(idConta):
    url = f"{urlBase}/search"
    query = f"assignee={idConta} AND status!=Done"
    params = {"jql": query}
    
    response = requests.get(url, headers=headers, auth=auth, params=params)
    if response.status_code == 200:
        issues = response.json()
        return len(issues['issues'])
    else:
        print(f"Falha ao buscar atribuições. Status: {response.status_code}, Detalhes: {response.text}")
        return None
    
def selecionarUsuarioAtribuicao(users):
    menorQtdChamados = float('inf')
    usuarioSelecionado = None

    for email in users:
        idConta = buscarUsuario(email)
        if idConta:
            qtdChamados = contarQtdChamados(idConta)
            if qtdChamados is not None and qtdChamados < menorQtdChamados:
                menorQtdChamados = qtdChamados
                usuarioSelecionado = idConta

    return usuarioSelecionado

def atribuirChamado(chave, idContaUsuario):
    url = f"{urlBase}/issue/{chave}/assignee"
    payload = json.dumps({"accountId": idContaUsuario})

    response = requests.put(url, headers=headers, auth=auth, data=payload)
    if response.status_code == 204:
        print("Chamado atribuído com sucesso.")
    else:
        print(f"Falha ao atribuir chamado. Status: {response.status_code}, Detalhes: {response.text}")

# Criação da conexão do Banco de Dados
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ubatuba0815",
    database="runguard",
    port=3306 
)

mycursor = mydb.cursor()

sistemaOperacional = platform.system()
run = True
dados = []

usuarios = ["ilys.maroto@sptech.school"]  # Lista de emails dos usuários do jira (add o resto depois)
intervaloChamado = 10 * 60  # 10 minutos de intervalo
horaUltimoChamado = 0  # Timestamp do último chamado criado

# Função para converter os valores de Bytes para Gigabytes
def byte_para_gb(byte):
    return byte / (1024 ** 3)

nomeMaquina = socket.gethostname()
memoria_total = psutil.virtual_memory().total
cpu_versao = platform.processor()

tempo = int(input("Digite o intervalo de tempo que você quer entre os cadastros: "))

fkEmpresa = input("Digite o código de sua empresa: ")


while run:
    print('=======================')
    print("Pressione Ctrl+C para interromper o script")

    # Obtém a porcentagem da CPU e Memória
    cpu = psutil.cpu_percent() # Porcentagem de uso da CPU
    memoria = psutil.virtual_memory() # Informações da memória

    memoria_usada = byte_para_gb(memoria.used) # Converte bytes para Gigabytes
    memoria_usada_formatada = f'{memoria_usada:.1f}'  # Formata o número

    # Imprime as informações no terminal
    print(f'Nome salvo: {nomeMaquina}')
    print(f'A CPU está em {cpu} %')
    print(f'A memória está em {memoria.percent} %')

    #Select para verificação da inserção do equipamento
    instrucaoVerEquipamento = "SELECT * FROM equipamento WHERE nomeEquipamento = %s" 
    mycursor.execute(instrucaoVerEquipamento, ([nomeMaquina]))

    #Função para utilizar o resultado do mycursor, se não da erro de unread result
    for row in mycursor:  
        print(f"Máquina selecionada: {row}")

    #Função para verificar (apartir do select de cima) se já existe um equipamento com esse nome para fazer inserção automática dele
    if mycursor.rowcount < 1: 
        sql = "INSERT INTO equipamento VALUES (default, %s, %s, %s, %s, %s)"
        values = (nomeMaquina, cpu_versao, memoria_total, sistemaOperacional, fkEmpresa)
        mycursor.execute(sql, values) 
        mydb.commit()

    # Obtém o id do equipamento
    instrucaoID = "SELECT idEquipamento FROM equipamento WHERE nomeEquipamento LIKE %s"
    valuesID = ([nomeMaquina])
    mycursor.execute(instrucaoID, valuesID)
    idEquipamento_tupla = mycursor.fetchone()
    
    #Seleção do id selecionado
    idEquipamento = mycursor.fetchone()[0]

    # Imprime as informações no terminal para visualização
    print(f"""A CPU está em {cpu} %
A memória está em {memoria.percent} %
Total de memória usada: {memoria_usada_formatada} GB""")
    
    # Faz as inserções no banco de dados passando os componentes
    sql = "INSERT INTO dado (idDado, cpuPercent, memoriaPercent, memoriaUsada, dtHora, fkEquipamento) VALUES (default, %s, %s, %s, default, %s)"
    val = (cpu, memoria.percent, memoria_usada_formatada, idEquipamento)
   
    mycursor.execute(sql, val)
    mydb.commit()

    # Verifica se o chamado deve ser criado com base em condições individuais de CPU e memória
    anormalidade = []
    if cpu > 80:
        anormalidade.append(f"CPU: {cpu}%")
    if memoria.percent > 80:
        anormalidade.append(f"Memória: {memoria.percent}%")
    if memoria_usada > 8:  # Ajuste de limite arbitrário para memória usada, ex.: 8 GB
        anormalidade.append(f"Memória usada: {memoria_usada_formatada} GB")

    # Condição para abertura do chamado se 10 minutos passaram desde o último
    if anormalidade and (time.time() - horaUltimoChamado) > intervaloChamado:
        summary = "Alerta de uso alto - " + ", ".join(anormalidade)
        idChamado = abrirChamado(summary)
        
        # Atualiza o timestamp do último chamado criado
        horaUltimoChamado = time.time()

        if idChamado:
            idUsuarioAtribuicao = selecionarUsuarioAtribuicao(usuarios)
            if idUsuarioAtribuicao:
                atribuirChamado(idChamado, idUsuarioAtribuicao)

    sql = "SELECT * FROM dados"

    mycursor.execute(sql)
    dados_coletados = mycursor.fetchall()
    mydb.commit()

    print(dados_coletados)

    # Adiciona os dados à lista
    dados.append({
        'nome': nomeMaquina,
        'cpu': cpu,
        'memoria': memoria.percent,
    })
    
    # Cria um DataFrame a partir da lista de dados
    df = pd.DataFrame(dados)

    caminho_arquivo = "dados.json"
    
    # Salva o DataFrame em um arquivo json
    df.to_json(caminho_arquivo, orient='records', lines=False)
    
    print('Dados salvos com sucesso!')
   
    nome_bucket = "s3-raw-runguard"
    chave_bucket = "dados.json"
   
    # Faz upload de um arquivo para um bucket específico com um nome específico para o arquivo
    s3_client.upload_file(caminho_arquivo, nome_bucket, chave_bucket)
    time.sleep(tempo)

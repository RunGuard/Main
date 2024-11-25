import psutil
import time
import mysql.connector
import pandas as pd
import boto3
import platform
import socket
import speedtest

run = True

# Configuração do cliente
# s3_client = boto3.client(
# 's3',
# aws_access_key_id='',
# aws_secret_access_key='',
# aws_session_token='',
# region_name='')

# Criação da conexão do Banco de Dados
mydb = mysql.connector.connect(
  host="127.0.0.1",
  user="root",
  password="Mysql123.",
  database="runguard",
  port= 3306
)

mycursor = mydb.cursor()

sistemaOperacional = platform.system()
dados = []

# Função para converter os valores de Bytes para Gigabytes
def byte_para_gb(byte):
    return byte / (1024 ** 3)

nomeMaquina = socket.gethostname()
memoria_total = psutil.virtual_memory().total
cpu_versao = platform.processor()

tempo = int(input("Digite o intevalo de tempo que você quer entre os cadastros: "))

fkEmpresa = input("Digite a o código de sua empresa: ")

def get_ping():
    st = speedtest.Speedtest()
    st.get_best_server()
    ping = st.results.ping
    return ping

while run:
    print('=======================')
    print("Pressione Ctrl+C para interromper o script")

    # Obtém as informações da CPU e da memória
    cpu = psutil.cpu_percent()  # Porcentagem de uso da CPU
    memoria = psutil.virtual_memory()  # Informações da memória

    net_io = psutil.net_io_counters()

    bytes_enviados = net_io.bytes_sent
    bytes_enviados_formatada =  bytes_enviados / (1024 ** 2)
    bytes_recebidos = net_io.bytes_recv
    bytes_recebidos_formatada =  bytes_recebidos / (1024 ** 2)
    pacotes_enviados = net_io.packets_sent
    pacotes_enviados_formatada =  pacotes_enviados / (1024 ** 2)
    pacotes_recebidos = net_io.packets_recv
    pacotes_enviados_formatada =  pacotes_enviados / (1024 ** 2)
    memoria_usada = byte_para_gb(memoria.used)  # Converte bytes para Gigabytes
    memoria_usada_formatada = f'{memoria_usada:.1f}'

    def formatar_pacotes(pacotes_enviados):
        if pacotes_enviados >= 1_000_000:  # Milhões
            return f"{pacotes_enviados / 1_000_000:.2f}M"
        elif pacotes_enviados >= 1_000:  # Milhares
            return f"{pacotes_enviados / 1_000:.2f}K"
        else:  # Sem alteração
            return str(pacotes_enviados)
    
    def formatar_pacotes(pacotes_recebidos):
        if pacotes_recebidos >= 1_000_000:  # Milhões
            return f"{pacotes_recebidos / 1_000_000:.2f}M"
        elif pacotes_recebidos >= 1_000:  # Milhares
            return f"{pacotes_recebidos / 1_000:.2f}K"
        else:  # Sem alteração
            return str(pacotes_recebidos)
        
    pacotes_enviados_formatada = formatar_pacotes(pacotes_enviados)
    pacotes_recebidos_formatada = formatar_pacotes(pacotes_recebidos)
    
  # Formata o número

    # Captura o ping
    ping = get_ping()

    # Imprime as informações no terminal
    print(f'Nome salvo: {nomeMaquina}')
    print(f'A CPU está em {cpu} %')
    print(f'A memória está em {memoria.percent} %')
    print(f'O envio de bytes está em {bytes_enviados:.2f} bytes')
    print(f'O recebimento de bytes está em {bytes_recebidos:.2f} bytes')
    print(f'Quantidade de pacotes enviados em  {pacotes_enviados_formatada} ')
    print(f'Quantidade de pacotes recebidos em {pacotes_recebidos_formatada} ')
    print(f'Ping: {ping} ms')

    # Select para verificação da inserção do equipamento
    instrucaoVerEquipamento = "SELECT * FROM equipamento WHERE nomeEquipamento = %s" 
    mycursor.execute(instrucaoVerEquipamento, ([nomeMaquina]))

    # Função para utilizar o resultado do mycursor, se não da erro de unread result
    for row in mycursor:  
        print(f"Máquina selecionada: {row}")

    # Função para verificar (apartir do select de cima) se já existe um equipamento com esse nome para fazer inserção automática dele
    if mycursor.rowcount < 1: 
        sql = "INSERT INTO equipamento VALUES (default, %s, %s, %s, %s, %s)"
        values = (nomeMaquina,cpu_versao, memoria_total, sistemaOperacional, fkEmpresa)
        mycursor.execute(sql, values) 
        mydb.commit()

    instrucaoID = "SELECT idEquipamento FROM equipamento WHERE nomeEquipamento LIKE %s"
    valuesID = ([nomeMaquina])
    mycursor.execute(instrucaoID, valuesID)
    idEquipamento_tupla = mycursor.fetchone()

    # Seleção do id selecionado
    idEquipamento = idEquipamento_tupla[0]

    # Imprime as informações no terminal para visualização
    print(f"""A CPU está em {cpu} %
            A memória está em {memoria.percent} %
            Total de memória usada: {memoria_usada_formatada} GB %
            O envio de bytes está em {bytes_enviados/ 1024 :.2f} bytes %
            O recebimento de bytes está em {bytes_recebidos/ 1024 :.2f} bytes %
            Quantidade de pacotes enviados em {pacotes_enviados}  %
            Quantidade de pacotes recebidos em {pacotes_recebidos}  %
            Ping: {ping} ms""")

    # Faz as inserções no banco de dados passando os componentes
    sql = "INSERT INTO dado (idDado, cpuPercent, memoriaPercent, memoriaUsada, bytes_recebidos, bytes_enviados, pacotes_recebidos, pacotes_enviados, ping, dtHora, fkEquipamento) VALUES (default, %s, %s, %s, %s, %s, %s, %s, %s, default, %s)"
    val = (cpu, memoria.percent, memoria_usada_formatada, bytes_recebidos, bytes_enviados, pacotes_enviados_formatada, pacotes_recebidos_formatada, ping, idEquipamento)

    mycursor.execute(sql, val)
    mydb.commit()

    sql = "SELECT * FROM dado"

    mycursor.execute(sql)
    dados_coletados = mycursor.fetchall()
    mydb.commit()

    print(dados_coletados)

    # Adiciona os dados à lista
    dados.append({
        'nome': nomeMaquina,
        'cpu': cpu,
        'memoria': memoria.percent,
        'dados_enviados': bytes_enviados,
        'dados_recebidos': bytes_recebidos,
        'pacotes_enviados': pacotes_enviados,
        'pacotes_recebidos': pacotes_recebidos,
        'ping': ping       
    })

    # Cria um DataFrame a partir da lista de dados
    df = pd.DataFrame(dados)

    caminho_arquivo = "dados.json"

    # Salva o DataFrame em um arquivo json
    df.to_json(caminho_arquivo, orient='records', lines=False)

    print('Dados salvos com sucesso!')

    nome_bucket = "raw-stocks-alexandre"
    chave_bucket = "dados.json"

    # Faz upload de um arquivo para um bucket específico com um nome específico para o arquivo
    # s3_client.upload_file(caminho_arquivo, nome_bucket, chave_bucket)
    time.sleep(tempo)
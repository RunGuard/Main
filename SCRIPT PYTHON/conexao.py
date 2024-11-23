# API de captura de dados de CPU, RAM e Latência de Rede - Guilherme Duarte

# Importação das bibliotecas
import psutil
import time
import mysql.connector
import socket 
import pandas as pd
import platform
from ping3 import ping  # Importando a biblioteca ping3

# Criação da conexão do Banco de Dados
mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="Guizao150405#",
  database="runguard",
  port=3306 
)

mycursor = mydb.cursor()
sistemaOperacional = platform.system()
run = True
dados = []

# Função para converter os valores de Bytes para Gigabytes (não será utilizada)
def byte_para_gb(byte):
    return byte / (1024 ** 3)

nomeMaquina = socket.gethostname()
cpu_versao = platform.processor()

print(cpu_versao)  # Adicione esta linha para verificar o valor da variável

tempo = int(input("Digite o intervalo de tempo que você quer entre os cadastros: "))

fkEmpresa = input("Digite o código de sua empresa: ")

# Função para capturar a latência usando ping3
def captura_latencia():
    try:
        # Realiza o ping e retorna o tempo de resposta
        latencia = ping("8.8.8.8")  # Endereço do servidor (Google DNS)

        if latencia is None:    
            raise Exception("Falha ao obter latência")
        
        # Converte para milissegundos e trunca para duas casas decimais
        latencia_ms = latencia * 1000
        latencia_truncada = float(f"{latencia_ms:.2f}")  # Formatação direta para duas casas decimais
        
        return latencia_truncada
    
    except Exception as e:
        print(f"Erro ao capturar latência: {e}")
        return None

# Exemplo de uso
latencia = captura_latencia()
if latencia is not None:
    print(f"Latência truncada: {latencia} ms")

# Loop para capturar os dados e cadastrar no Banco de Dados
while run:
    print('=======================')
    print("Pressione Ctrl+C para interromper o script")
    
    # Obtém quanto a CPU está em porcentagem
    cpu = psutil.cpu_percent() 
    # Obtém quanto a Memória está em porcentagem
    memoria = psutil.virtual_memory() 

    # Captura a latência de rede
    latencia_rede = captura_latencia()
    if latencia_rede is None:
        latencia_rede = 0  # Caso a latência não tenha sido capturada, insere 0

    # Select para verificação da inserção do equipamento
    instrucaoVerEquipamento = "SELECT * FROM equipamento WHERE nomeEquipamento = %s" 
    mycursor.execute(instrucaoVerEquipamento, ([nomeMaquina]))

    # Função para utilizar o resultado do mycursor, se não dá erro de unread result
    for row in mycursor:  
        print(f"Máquina selecionada: {row}")

    # Função para verificar (a partir do select de cima) se já existe um equipamento com esse nome para fazer inserção automática dele
    if mycursor.rowcount < 1: 
        sql = "INSERT INTO equipamento VALUES (default, %s, %s, %s, %s, %s)"
        values = (nomeMaquina, cpu_versao, memoria.total, sistemaOperacional, fkEmpresa)
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
    A latência de rede é {latencia_rede} ms""")

    # Faz as inserções no banco de dados passando os componentes
    sql = "INSERT INTO dado (idDado, cpuPercent, memoriaPercent, latencia_rede, dtHora, fkEquipamento) VALUES (default, %s, %s, %s, default, %s)"
    val = (cpu, memoria.percent, latencia_rede, idEquipamento)

    mycursor.execute(sql, val)
    mydb.commit()

    sql = "SELECT * FROM dado"

    mycursor.execute(sql)
    dados_coletados = mycursor.fetchall()
    mydb.commit()

    print(dados_coletados)

    # Cria um DataFrame a partir da lista de dados
    # df = pd.DataFrame(dados_coletados, columns=['idDado', 'cpuPercent', 'memoriaPercent', 'latencia_rede', 'dtHora', 'fkEquipamento'])

    # caminho_arquivo = "~/dadosServidor.csv"

    # Salva o DataFrame em um arquivo CSV
    # df.to_csv(caminho_arquivo, index=True, encoding='utf-8')

    print('Dados salvos com sucesso!')

    time.sleep(tempo)
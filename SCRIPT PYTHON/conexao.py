# API do Captura dados - Sprint 2 - RunGuard

# Importação das bibliotecas
import psutil
import time
import mysql.connector
import socket 
import pandas as pd
import platform

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

# Função para converter os valores de Bytes para Gigabytes
def byte_para_gb(byte):
    return byte / (1024 ** 3)

nomeMaquina = socket.gethostname()
memoria_total = psutil.virtual_memory().total
cpu_versao = platform.processor()

tempo = int(input("Digite o intevalo de tempo que você quer entre os cadastros: "))

fkEmpresa = input("Digite a o código de sua empresa: ")

# Loop para capturar os dados e cadastrar no Banco de Dados
while run:
    print('=======================')
    print("Pressione Ctrl+C para interromper o script")
    
    # Obtém quanto a CPU está em porcentagem
    cpu = psutil.cpu_percent() 
    # Obtém quanto a Memória está em porcentagem
    memoria = psutil.virtual_memory() 
    # Converte os bytes para Gigabyte do memória usada
    memoria_usada = byte_para_gb(memoria.used) 
    # Formata o número para melhor gravação no banco
    memoria_usada_formatada = f'{memoria_usada:.1f}' 


    #Select para verificação da inserção do equipamento
    instrucaoVerEquipamento = "SELECT * FROM equipamento WHERE nomeEquipamento = %s" 
    mycursor.execute(instrucaoVerEquipamento, ([nomeMaquina]))

    #Função para utilizar o resultado do mycursor, se não da erro de unread result
    for row in mycursor:  
        print(f"Máquina selecionada: {row}")

    #Função para verificar (apartir do select de cima) se já existe um equipamento com esse nome para fazer inserção automática dele
    if mycursor.rowcount < 1: 
        sql = "INSERT INTO equipamento VALUES (default, %s, %s, %s, %s, %s)"
        values = (nomeMaquina,cpu_versao, memoria_total, sistemaOperacional, fkEmpresa)
        mycursor.execute(sql, values) 
        mydb.commit()

    instrucaoID = "SELECT idEquipamento FROM equipamento WHERE nomeEquipamento LIKE %s"
    valuesID = ([nomeMaquina])
    mycursor.execute(instrucaoID, valuesID)
    idEquipamento_tupla = mycursor.fetchone()

    #Seleção do id selecionado
    idEquipamento = idEquipamento_tupla[0]

    # Imprime as informações no terminal para visualização
    print(f"""A CPU está em {cpu} %
A memória está em {memoria.percent} %
Total de memória usada: {memoria_usada_formatada} GB""")

    # Faz as inserções no banco de dados passando os componentes
    sql = "INSERT INTO dados (idDado, cpuPercent, memoriaPercent, memoriaUsada, dtHora, fkEquipamento) VALUES (default, %s, %s, %s, default, %s)"
    val = (cpu,memoria.percent,memoria_usada_formatada, idEquipamento)

    mycursor.execute(sql,val)
    mydb.commit()

    sql = "SELECT * FROM dados"

    mycursor.execute(sql)
    dados_coletados = mycursor.fetchall()
    mydb.commit()

    print(dados_coletados)

    # Cria um DataFrame a partir da lista de dados
    df = pd.DataFrame(dados)

    caminho_arquivo = "~/dadosServidor.csv"

    # Salva o DataFrame em um arquivo CSV
    df.to_csv(caminho_arquivo, index=True, encoding='utf-8')

    print('Dados salvos com sucesso!')

    time.sleep(tempo)
    
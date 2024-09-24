# API do Captura dados - Sprint 2 - RunGuard

# Importação das bibliotecas
import psutil
import time
import mysql.connector
from socket import gethostname

# Criação da conexão do Banco de Dados
mydb = mysql.connector.connect(
  host="10.18.32.222",
  user="RunGuard",
  password="Senha123",
  database="runguard",
  port=3306 
)

mycursor = mydb.cursor()

run = True

# Função para converter os valores de Bytes para Gigabytes
def byte_para_gb(byte):
    return byte / (1024 ** 3)

nomeMaquina = gethostname()

tempo = int(input("Digite o intevalo de tempo que você quer entre os cadastros: "))

fkEmpresa = input("Digite a o código de sua empresa: ")

# Loop para capturar os dados e cadastrar no Banco de Dados
while run:
    print('=======================')
    print("Pressione Ctrl+C para interromper o script")
    
    cpu = psutil.cpu_percent() # Obtém quanto a CPU está em porcentagem
    memoria = psutil.virtual_memory() # Obtém quanto a Memória está em porcentagem
    memoria_usada = byte_para_gb(memoria.used) # Converte os bytes para Gigabyte do memória usada
    memoria_usada_formatada = f'{memoria_usada:.1f}' # Formata o número para melhor gravação no banco


    #Select para verificação da inserção do equipamento
    instrucaoVerEquipamento = "SELECT * FROM equipamento WHERE nome_equipamento = %s" 
    mycursor.execute(instrucaoVerEquipamento, ([nomeMaquina]))

    #Função para utilizar o resultado do mycursor, se não da erro de unread result
    for row in mycursor:  
        print(f"Máquina selecionada: {row}")

    #Função para verificar (apartir do select de cima) se já existe um equipamento com esse nome para fazer inserção automática dele
    if mycursor.rowcount < 1: 
        sql = "INSERT INTO equipamento VALUES (default, %s, %s)"
        values = (nomeMaquina, fkEmpresa)
        mycursor.execute(sql, values) 
        mydb.commit()

    instrucaoID = "SELECT idEquipamento FROM equipamento WHERE nome_equipamento LIKE %s"
    valuesID = ([nomeMaquina])
    mycursor.execute(instrucaoID, valuesID)
    idEquipamento_tupla = mycursor.fetchone()

    #Seleção do id selecionado
    idEquipamento = idEquipamento_tupla[0]

    # Imprime as informações no terminal para uma visualização
    print(f"""A CPU está em {cpu} %
A memória está em {memoria.percent} %
Total de memória usada: {memoria_usada_formatada} GB""")

    # Faz as inserções no banco de dados passando os componentes
    sql = "INSERT INTO dados (cpu_porcent, memoria_porcent,memoria_usada, fkEquipamento) VALUES (%s, %s, %s, %s)"
    val = (cpu,memoria.percent,memoria_usada_formatada, idEquipamento)

    # Executa a query e os valores
    mycursor.execute(sql,val)

    mydb.commit()

    time.sleep(tempo)
    
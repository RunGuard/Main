# API do Captura dados - Sprint 1 - RunGuard

# Importação das bibliotecas
import psutil
import time
import mysql.connector

# Criação da conexão do Banco de Dados
mydb = mysql.connector.connect(
  host="10.18.32.37",
  user="martinez",
  password="SPTech#2024",
  database="runguard",
  port=3306 
)

mycursor = mydb.cursor()

run = True

# Função para converter os valores de Bytes para Gigabytes
def byte_para_gb(byte):
    return byte / (1024 ** 3)

tempo = int(input("Digite o intevalo de tempo que você quer entre os cadastros: "))

# Loop para capturar os dados e cadastrar no Banco de Dados
while run:
    print('=======================')
    
    # 
    cpu = psutil.cpu_percent() # Obtém quanto a CPU está em porcentagem
    memoria = psutil.virtual_memory() # Obtém quanto a Memória está em porcentagem
    
    memoria_usada = byte_para_gb(memoria.used) # Converte os bytes para Gigabyte do memória usada

    memoria_usada_formatada = f'{memoria_usada:.1f}' # Formata o número para melhor a gravação no banco

    # Imprime as informações no terminal para uma visualização
    print(f'A CPU está em {cpu} %')
    print(f'A memória está em {memoria.percent} %')
    print(f'Total de memória usada: {memoria.used} GB')

    # Faz as inserções no banco de dados passando os componentes
    sql = "INSERT INTO dados (cpu_porcent, memoria_porcent,memoria_usada, fkEquipamento) VALUES (%s, %s, %s, 4)"

    # Captura os valores
    val = (cpu,memoria.percent,memoria_usada_formatada)

    # Executa a query e os valores
    mycursor.execute(sql,val)

    mydb.commit()

    time.sleep(tempo)
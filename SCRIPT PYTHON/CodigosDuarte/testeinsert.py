# API de captura de dados de CPU, RAM e Latência de Rede - Guilherme Duarte

# Importação das bibliotecas
import psutil
import time
import mysql.connector
import random  # Para simular dados diferentes
from ping3 import ping  # Importando a biblioteca ping3

# Criação da conexão do Banco de Dados
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Guizao150405#",  # Altere para sua senha
    database="runguard",
    port=3306
)

mycursor = mydb.cursor()

# IDs dos equipamentos que estão mocados no banco
equipamentos_ids = [1, 2, 3, 4]

# Intervalo de tempo entre as inserções
tempo = int(input("Digite o intervalo de tempo que você quer entre os cadastros (em segundos): "))

# Função para capturar a latência usando ping3
def captura_latencia():
    try:
        # Realiza o ping e retorna o tempo de resposta
        latencia = ping("8.8.8.8")  # Endereço do servidor (Google DNS)
        if latencia is None:
            raise Exception("Falha ao obter latência")
        
        # Converte para milissegundos e trunca para duas casas decimais
        latencia_ms = latencia * 1000
        latencia_truncada = float(f"{latencia_ms:.2f}")
        return latencia_truncada
    except Exception as e:
        print(f"Erro ao capturar latência: {e}")
        return None

# Loop para capturar os dados e cadastrar no Banco de Dados
try:
    while True:
        print('========================')
        print("Pressione Ctrl+C para interromper o script")

        # Simulação dos dados para cada equipamento
        for id_equipamento in equipamentos_ids:
            # Simulando porcentagens de uso de CPU e RAM
            cpu = round(random.uniform(10, 100), 2)  # CPU entre 10% e 100%
            memoria = round(random.uniform(10, 90), 2)  # RAM entre 10% e 90%
            latencia_rede = captura_latencia()  # Captura a latência de rede

            if latencia_rede is None:
                latencia_rede = 0  # Caso a latência não tenha sido capturada, insere 0

            # Imprime os dados simulados
            print(f"""Equipamento ID {id_equipamento}:
    CPU: {cpu} %
    Memória: {memoria} %
    Latência de Rede: {latencia_rede} ms""")

            # Faz as inserções no banco de dados passando os componentes
            sql = "INSERT INTO dado (idDado, cpuPercent, memoriaPercent, latencia_rede, dtHora, fkEquipamento) VALUES (default, %s, %s, %s, default, %s)"
            val = (cpu, memoria, latencia_rede, id_equipamento)
            mycursor.execute(sql, val)
            mydb.commit()

        print("Dados salvos com sucesso! Aguardando o próximo intervalo...")
        time.sleep(tempo)

except KeyboardInterrupt:
    print("\nSimulação interrompida pelo usuário.")
finally:
    mycursor.close()
    mydb.close()
    print("Conexão com o banco de dados encerrada.")

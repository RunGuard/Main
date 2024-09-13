# Desafio Extremo - Murilo Cardoso Martinez RA: 04241037

"""
    Orientação Geral:
    - O código que você cadastra é 1 ou 2. O código 1, é do Técnico de Infraestrutura que irá
    conseguir ver os dados da máquina escolhida em tempo real. E o código 2, é do Analista de Dados
    que irá conseguir ver as métricas de uma máquina escolhida ou de todas as máquina (de um modo geral).
"""

# Importação das bibliotecas
import time
import mysql.connector
import os
from getpass import getpass

# Conexão com o Banco de Dados
mydb = mysql.connector.connect(
    host="localhost",
    user="martinez",
    password="SPTech#2024",
    database="runguard"
)

mycursor = mydb.cursor()

# Função principal do Sistema
def menu():
    os.system('cls')

    menu_run = True

    while menu_run:
        print("Bem-vindo ao Sistema de Monitoramento - RunGuard!")
        print("Escolha uma opção:")
        print("1. Registrar-se")
        print("2. Entrar")
        print("3. Sair")

        reposta = input("Escolha uma opção: ")

        if reposta == "1":
            registrar()
            os.system('cls')
        elif reposta == "2":
            entrar()
            os.system('cls')
        elif reposta == '3':
            print("Saindo do Sistema...")
            menu_run = False
        else:
            print("Opção Inválida. Tente novamente")
            os.system('cls')

# Função de Cadastrar o Usuário
def registrar():
    os.system('cls')

    print("Registre-se no Sistema")
    email = input("Digite seu email: ")
    senha = getpass("Digite a sua senha: ")
    codigo = input("Digite o código de acesso (1 ou 2): ")

    # Validação se o código digitado é um código válido
    if codigo not in ["1", "2"]:
        print("Código inválido!")
        time.sleep(4)
        return


    mycursor.execute("INSERT INTO usuario (email_usuario, senha_usuario, codigo) VALUES (%s,%s,%s)", (email,senha,codigo))

    mydb.commit()

    print("Usuário cadastro com sucesso")
    
# Função para Entrar no Sistema
def entrar():
    os.system('cls')

    print("Entrar no sistema\n")
    email_recebido = input("Digite seu email: ")
    senha_recebida = getpass("Digite a sua senha: ")

    mycursor.execute("SELECT codigo FROM usuario WHERE email_usuario = %s AND senha_usuario = %s", (email_recebido,senha_recebida))
    resultado = mycursor.fetchone()

    if resultado:
        codigo = resultado[0]

        if codigo == 1:
            monitoramento_realTime()
            os.system('cls')
        elif codigo == 2:
            monitoramento_metricas()
            os.system('cls')
    else:
        print("Credencias inválidas")
        time.sleep(4)
        return
    
# Função para o Monitoramento em Tempo Real do Técnico de Infraestrutura
def monitoramento_realTime():
    os.system('cls')

    print("Moniramento em Tempo Real\n")

    maquina = input("Escolha uma máquina (M1, M2, M3, M4): ")

    if maquina.lower() == 'sair':
        os.system('cls')
        return

    if maquina not in ["M1","M2","M3","M4"]:
        print("Máquina não existe no sistema!")
        time.sleep(4)
        return monitoramento_realTime()
    
    componente = input("Escolha um componente para monitorar (cpu ou memoria): ")

    if componente not in ["cpu", "memoria"]:
        print("Componente não existente no sistema!")
        time.sleep(4)
        return monitoramento_realTime()
    

    print("Escolha a métrica\n a)porcentagem\n b)Bytes")
    metrica  = input("Escolha a opção: ")
    
    if metrica not in ["a", "b"]:
        print("Métrica não existente no sistema!")
        time.sleep(4)
        return monitoramento_realTime()

    tempo = int(input("Digite o intervalo entre as leituras: "))
    
    mycursor.execute("SELECT idEquipamento FROM equipamento WHERE nome_equipamento = %s", [maquina])
    equipamento_id_resultado = mycursor.fetchone()

    equipamento_id = equipamento_id_resultado[0]

    print(f"Começando o monitoramento da máquina {maquina} com o componente: {componente}")

    try:
        while True:
            if componente == 'cpu':
                if metrica == 'b':
                    print("Métrica não existente para a CPU")
                    time.sleep(4)
                    return monitoramento_realTime()
                else:
                    mycursor.execute(f"SELECT cpu_porcent FROM dados WHERE fkEquipamento = {equipamento_id} ORDER BY idDados DESC")
                    cpu_resultado_select = mycursor.fetchall()
                    print(f'O valor da CPU está em: {cpu_resultado_select[0][0]}%\n')
            elif componente == 'memoria':

                if metrica == 'a':
                    mycursor.execute(f"SELECT memoria_porcent FROM dados WHERE fkEquipamento = {equipamento_id} ORDER BY idDados DESC")
                    memoria_resultado_select_porcent = mycursor.fetchall()
                    print(f'O valor da Memória está em: {memoria_resultado_select_porcent[0][0]}%\n')
                else:
                    mycursor.execute(f"SELECT memoria_usada FROM dados WHERE fkEquipamento = {equipamento_id} ORDER BY idDados DESC")
                    memoria_resultado_select_usada = mycursor.fetchall()
                    print(f'O valor da Memória está em: {memoria_resultado_select_usada[0][0]} Bytes\n')

            mydb.commit()

            time.sleep(tempo)
    except:
        KeyboardInterrupt
        monitoramento_realTime()
        os.system('cls')


# Função de Monitoramento das Métricas para o Analista de Dados
def monitoramento_metricas():
    os.system('cls')

    run = True

    print("Análise das Métricas\n")

    while run:
        os.system('cls')
        
        print("Escolha uma opção:\n a)média por máquina\n b)média total")
        respota_metrica = input("Digite a opção: ")

        if respota_metrica not in ['a', 'b']:
            print("Escolha uma opção válida")
            time.sleep(4)
            return monitoramento_metricas()
        
        if respota_metrica == 'a':
            maquina = input("Escolha uma máquina para analisar (M1, M2, M3, M4): ")

            if maquina not in ["M1","M2","M3","M4"]:
                print("Máquina não existente no sistema!")
                time.sleep(4)
                return monitoramento_metricas()
            
            mycursor.execute("SELECT idEquipamento FROM equipamento WHERE nome_equipamento = %s", [maquina])
            equipamento_id_resultado = mycursor.fetchone()

            equipamento_id = equipamento_id_resultado[0]

            mycursor.execute("select round(avg(cpu_porcent),1), round(avg(memoria_porcent),1), round(avg(memoria_usada),1) from dados where fkEquipamento = %s",[equipamento_id])
            dados_id_resultado = mycursor.fetchone()

            cpu_porcent = dados_id_resultado[0]
            memoria_porcent = dados_id_resultado[1]
            memoria_usada = dados_id_resultado[2]

            print(f"\nDados da Métrica da Máquina {maquina}")
            print(f'Média de Utilização da CPU: {cpu_porcent}%')
            print(f'Média de Utilização da Memória em %: {memoria_porcent}')
            print(f'Média de Utilização da Memória em Bytes: {memoria_usada}')

            pergunta = input("\nVocê deseja analisar mais métricas? (s/n): ")

            if pergunta == 'n':
                os.system('cls')
                return
        else:
            mycursor.execute("select fkEquipamento,round(avg(cpu_porcent),1), round(avg(memoria_porcent),1), round(avg(memoria_usada),1) from dados group by fkEquipamento")
            dados_id_resultado = mycursor.fetchall()

            cpu_somada = 0
            memoria_porcent_somada = 0
            memoria_usada_somada = 0

            print("\n=========================================================================")

            print("\nDados da Métrica:")

            # Utilizei um for para conseguir pegar os dados de cada máquina e exibir elas depois
            for i in dados_id_resultado:
                maquina_id = i[0]
                cpu_porcent = i[1]
                memoria_porcent = i[2]
                memoria_usada = i[3]

                cpu_somada += cpu_porcent
                memoria_porcent_somada += memoria_porcent
                memoria_usada_somada += memoria_usada

                print(f'\nMáquina: {maquina_id}')
                print(f'Média de Utilização da CPU: {cpu_porcent}%')
                print(f'Média de Utilização da Memória em %: {memoria_porcent}')
                print(f'Média de Utilização da Memória em Bytes: {memoria_usada}')

            print("\n=========================================================================")

            print("\nTotal de todas as Máquina")
            print(f'Média Total da CPU: {(cpu_somada / len(dados_id_resultado)):.2f}')
            print(f'Média Total da Memória em %: {(memoria_porcent_somada / len(dados_id_resultado)):.2f}')
            print(f'Média Total da Memória em Byte: {(memoria_usada_somada / len(dados_id_resultado)):.2f}')

            pergunta = input("Você deseja analisar mais métricas? (s/n): ")

            if pergunta == 'n':
                os.system('cls')
                return

menu()
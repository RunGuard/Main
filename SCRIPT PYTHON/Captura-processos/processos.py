import subprocess
import csv
import platform

# Verificar o sistema operacional
sistemaOperacional = platform.system()

# Verifica se o sistema é Windows ou Linux
if sistemaOperacional == 'Windows':
    # Comando para Windows
    result = subprocess.run(['tasklist'], capture_output=True, text=True)

    # Separar as linhas da saída, ignorando o cabeçalho
    lines = result.stdout.splitlines()[3:]

    # Lista de processos de sistema para Windows
    processos_sistema = [
        'System', 'Registry', 'smss.exe', 'csrss.exe', 'winlogon.exe', 
        'services.exe', 'lsass.exe', 'svchost.exe', 'wininit.exe', 'spoolsv.exe', 
        'explorer.exe', 'taskhostw.exe', 'RuntimeBroker.exe', 'SearchIndexer.exe'
    ]

elif sistemaOperacional == 'Linux':
    # Comando para Linux
    result = subprocess.run(['ps', 'aux'], capture_output=True, text=True)

    # Separar as linhas da saída, ignorando o cabeçalho
    lines = result.stdout.splitlines()[1:]

    # Lista de processos de sistema para Linux
    processos_sistema = [
        'systemd', 'kthreadd', 'ksoftirqd', 'rcu_sched', 'sshd', 'bash',
        'dbus-daemon', 'NetworkManager', 'gnome-shell', 'Xorg'
    ]

# Verificar o resultado da execução do comando
if result.returncode == 0:
    print("Comando executado com sucesso")
else:
    print("Erro ao executar o comando")
    exit(1)

# Abrir o arquivo CSV para escrita
with open('tasks3.csv', 'w', newline='', encoding='utf-8') as csvfile:
    
    csv_writer = csv.writer(csvfile)

    # Cabeçalho para o arquivo CSV
    csv_writer.writerow(['Nome_da_Imagem', 'PID', 'Uso_de_CPU', 'Uso_de_MEM'])

    # Processar a saída para Windows e Linux
    for line in lines:
        if sistemaOperacional == 'Windows':
            # Dividir as colunas no Windows
            columns = line.split(maxsplit=4)
            
            # Verifica se o processo não está na lista de processos do sistema e se usa memória
            if not any(proc in columns[0] for proc in processos_sistema):
                if 'K' in columns[-1] and columns[-1] != '0 K':
                    csv_writer.writerow(columns[:4])  # Salvando as 4 primeiras colunas relevantes

        elif sistemaOperacional == 'Linux':
            # Dividir as colunas no Linux
            columns = line.split(maxsplit=10)
            
            # Verifica se o processo não está na lista de processos do sistema e se o uso de CPU ou MEM é maior que 0
            cpu_usage = float(columns[2])  # Coluna de uso de CPU
            mem_usage = float(columns[3])  # Coluna de uso de MEM
            if not any(proc in columns[-1] for proc in processos_sistema):
                if cpu_usage > 0.0 or mem_usage > 0.0:
                    csv_writer.writerow([columns[10], columns[1], columns[2], columns[3]])  # Nome, PID, CPU, MEM

processo_desejado = ["RiotClientServices.exe","chrome.exe"]

processo_encontrado = {processo: False for processo in processo_desejado}

for line in lines:
            # Dividir a linha em colunas e tratar os espaços em branco
            columns = line.split(maxsplit=4)  # Dividir em no máximo 5 partes: Nome, PID, Sessão, # Sessão, Uso de Memória

            if len(columns) == 5:

                # Verificar se o nome do processo corresponde ao processo desejado
                for processo in processo_desejado:
                    if processo.lower() in columns[0].lower():
                        processo_encontrado[processo] = True

for processo, processo_encontrado in processo_encontrado.items():
            if processo_encontrado:
                print(f"O processo '{processo}' está em execução.")
            else:
                print(f"O processo '{processo}' não foi encontrado.")

print("Arquivo CSV com processos relevantes gerado com sucesso!")
import psutil
import time

# Função para coletar dados de CPU por processo com agregação
def coleta_cpu_dados(intervalo=1, duracao=10):
    processos = {}

    # Coleta dados durante o período especificado
    for _ in range(duracao):
        for process in psutil.process_iter(['pid', 'name']):
            try:
                # Coleta o uso de CPU
                cpu_percent = process.cpu_percent(interval=None)
                
                # Agrega dados ao longo do tempo
                if cpu_percent > 0:
                    pid = process.info['pid']
                    if pid not in processos:
                        processos[pid] = {'name': process.info['name'], 'cpu_percent': 0}
                    processos[pid]['cpu_percent'] += cpu_percent

            except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
                pass

        time.sleep(intervalo)

    return processos

# Coleta dados de CPU por 10 segundos com intervalos de 1 segundo
processos_dados = coleta_cpu_dados()
for pid, info in processos_dados.items():
    print(f"PID: {pid}, Processo: {info['name']}, Uso de CPU Agregado: {info['cpu_percent']}%")



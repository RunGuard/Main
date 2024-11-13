import psutil
import time
import numpy as np
import mysql.connector
from datetime import datetime, timedelta

def conectar_banco():
    return mysql.connector.connect(
        host="localhost",        
        user="root",       
        password="43589543Lu", 
        database="runguard"
    )

inicio_uptime = datetime.now()
duracao_downtime = timedelta(0)  
ultima_verificacao_downtime = inicio_uptime

historico_uso_cpu = []
historico_uso_memoria = []

def capturar_uso_cpu():
    uso_cpu = psutil.cpu_percent(interval=1)
    historico_uso_cpu.append(uso_cpu)
    desvio_padrao_cpu = np.std(historico_uso_cpu) if len(historico_uso_cpu) > 1 else 0
    return uso_cpu, desvio_padrao_cpu

def capturar_uso_memoria():
    uso_memoria = psutil.virtual_memory().percent
    historico_uso_memoria.append(uso_memoria)
    desvio_padrao_memoria = np.std(historico_uso_memoria) if len(historico_uso_memoria) > 1 else 0
    return uso_memoria, desvio_padrao_memoria

def capturar_uso_io():
    io_disco = psutil.disk_io_counters()
    uso_io = {
        'bytes_lidos': round(io_disco.read_bytes / (1024**2), 2),  # Converte para MB
        'bytes_escritos': round(io_disco.write_bytes / (1024**2), 2),  # Converte para MB
        'io_total': round((io_disco.read_bytes + io_disco.write_bytes) / (1024**2), 2)  # Total em MB
    }
    return uso_io

def verificar_downtime(simular_downtime=False):
    global inicio_uptime, duracao_downtime, ultima_verificacao_downtime
    hora_atual = datetime.now()
    
    if simular_downtime:
        uso_cpu = 0 
        uso_memoria = 0  
    else:
        uso_cpu, _ = capturar_uso_cpu()
        uso_memoria, _ = capturar_uso_memoria()

    if uso_cpu == 0 and uso_memoria == 0:
        duracao_downtime += hora_atual - ultima_verificacao_downtime
    else:
        inicio_uptime = hora_atual
    
    ultima_verificacao_downtime = hora_atual
    return duracao_downtime.total_seconds() / 60
 

def calcular_indice_estabilidade(desvio_padrao_cpu, desvio_padrao_memoria):
    indice_estabilidade = max(0, 100 - (desvio_padrao_cpu + desvio_padrao_memoria))
    return indice_estabilidade

def calcular_eficiencia_io(uso_io, uso_cpu):
    eficiencia_io = min(100, (uso_io['io_total'] / uso_cpu) * 10) if uso_cpu > 0 else 0
    return eficiencia_io

def calcular_taxa_recuperacao(downtime):
    taxa_recuperacao = max(0, 100 - downtime)
    return taxa_recuperacao

def inserir_dados(uso_cpu, desvio_padrao_cpu, uso_memoria, desvio_padrao_memoria, uso_io, downtime, indice_estabilidade, eficiencia_io, taxa_recuperacao, fkEquipamento):
    conexao = conectar_banco()
    cursor = conexao.cursor()
    sql = """
        INSERT INTO dado (
            cpuPercent, memoriaPercent, memoriaUsada, bytes_recebidos, bytes_enviados,
            pacotes_recebidos, pacotes_enviados, erros_envio, erros_recebidos,
            pacotes_descartados_env, pacotes_descartados_rec, desvio_padrao_cpu,
            desvio_padrao_memoria, taxa_io_disco, downtime, indice_estabilidade,
            eficiencia_io_cpu, taxa_recuperacao, fkEquipamento
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """
    valores = (
        round(uso_cpu, 2), round(uso_memoria, 2), round(psutil.virtual_memory().used / (1024**2), 2),
        uso_io['bytes_lidos'], uso_io['bytes_escritos'], 0, 0, 0, 0, 0, 0,
        round(desvio_padrao_cpu, 2), round(desvio_padrao_memoria, 2), uso_io['io_total'],
        round(downtime, 2), round(indice_estabilidade, 2), round(eficiencia_io, 2), round(taxa_recuperacao, 2),
        fkEquipamento
    )
    cursor.execute(sql, valores)
    conexao.commit()
    cursor.close()
    conexao.close()

def main():
    fkEquipamento = 1 
    while True:
        uso_cpu, desvio_padrao_cpu = capturar_uso_cpu()
        uso_memoria, desvio_padrao_memoria = capturar_uso_memoria()
        uso_io = capturar_uso_io()
        downtime = verificar_downtime()
        
        indice_estabilidade = calcular_indice_estabilidade(desvio_padrao_cpu, desvio_padrao_memoria)
        eficiencia_io = calcular_eficiencia_io(uso_io, uso_cpu)
        taxa_recuperacao = calcular_taxa_recuperacao(downtime)

        print(f"Uso de CPU: {uso_cpu:.2f}% | Desvio Padrão de CPU: {desvio_padrao_cpu:.2f}%")
        print(f"Uso de Memória RAM: {uso_memoria:.2f}% | Desvio Padrão de Memória RAM: {desvio_padrao_memoria:.2f}%")
        print(f"I/O do Disco - Bytes Lidos: {uso_io['bytes_lidos']} MB | Bytes Escritos: {uso_io['bytes_escritos']} MB")
        print(f"Downtime: {downtime:.2f} min")
        print("\nKPIs:")
        print(f"Índice de Estabilidade do Servidor: {indice_estabilidade:.2f}%")
        print(f"Índice de Eficiência de I/O de CPU: {eficiencia_io:.2f}%")
        print(f"Taxa de Recuperação Pós-Downtime: {taxa_recuperacao:.2f}%")
        print("-" * 50)


        inserir_dados(
            uso_cpu, desvio_padrao_cpu, uso_memoria, desvio_padrao_memoria, uso_io,
            downtime, indice_estabilidade, eficiencia_io, taxa_recuperacao, fkEquipamento
        )
        

        time.sleep(10)

# Executa a função principal
if __name__ == "__main__":
    main()

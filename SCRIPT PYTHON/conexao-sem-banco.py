# API do Captura dados - Sprint 1 - RunGuard

# Importação das bibliotecas
import psutil
import time

run = True

# Loop para capturar os dados e cadastrar no Banco de Dados
while run:
    print('=======================')
    
    # 
    cpu = psutil.cpu_percent() # Obtém quanto a CPU está em porcentagem
    memoria = psutil.virtual_memory() # Obtém quanto a Memória está em porcentagem

    # Imprime as informações no terminal para uma visualização
    print(f'A CPU está em {cpu} %')
    print(f'A memória está em {memoria.percent} %')
    print(f'Total de memória usada: {memoria.used} Bytes')

    time.sleep(3)
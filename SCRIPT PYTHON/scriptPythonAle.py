import psutil
import time
import mysql.connector
import platform
import socket
import speedtest

# Função para converter bytes em gigabytes
def byte_para_gb(byte):
    return byte / (1024 ** 3)

# Formatação de bytes
def formatar_bytes(bytes_valor):
    if bytes_valor >= 1_000_000_000:
        return f"{bytes_valor / 1_000_000_000:.2f} GB"
    elif bytes_valor >= 1_000_000:
        return f"{bytes_valor / 1_000_000:.2f} MB"
    elif bytes_valor >= 1_000:
        return f"{bytes_valor / 1_000:.2f} KB"
    return f"{bytes_valor:.2f} B"

# Formatação de pacotes
def formatar_pacotes(pacotes):
    if pacotes >= 1_000_000:
        return f"{pacotes / 1_000_000:.2f}M"
    elif pacotes >= 1_000:
        return f"{pacotes / 1_000:.2f}K"
    return str(pacotes)

# Captura de ping usando speedtest
def get_ping():
    try:
        st = speedtest.Speedtest()
        st.get_best_server()
        return st.results.ping
    except Exception as e:
        print(f"Erro ao capturar o ping: {e}")
        return None

# Limite máximo para valores double
MAX_DOUBLE = 1.79e308

# Configuração de banco de dados
try:
    mydb = mysql.connector.connect(
        host="127.0.0.1",
        user="root",
        password="Mysql123.",
        database="runguard",
        port=3306,
    )
    mycursor = mydb.cursor()
except Exception as e:
    print(f"Erro ao conectar ao banco de dados: {e}")
    exit()

nomeMaquina = socket.gethostname()
memoria_total = psutil.virtual_memory().total
cpu_versao = platform.processor()
sistemaOperacional = platform.system()

tempo = int(input("Digite o intervalo de tempo em segundos: "))
fkEmpresa = input("Digite o código de sua empresa: ")

while True:
    try:
        cpu = psutil.cpu_percent()
        memoria = psutil.virtual_memory()
        net_io = psutil.net_io_counters()

        ping = get_ping() or 0  # Define ping como 0 em caso de erro
        memoria_usada = byte_para_gb(memoria.used)

        # Limitação de valores para se manterem dentro do intervalo do tipo DOUBLE
        bytes_recv = min(net_io.bytes_recv, MAX_DOUBLE)
        bytes_sent = min(net_io.bytes_sent, MAX_DOUBLE)

        # Gravação no banco
        mycursor.execute(
            "SELECT idEquipamento FROM equipamento WHERE nomeEquipamento = %s",
            (nomeMaquina,),
        )
        result = mycursor.fetchone()
        if not result:
            mycursor.execute(
                "INSERT INTO equipamento VALUES (default, %s, %s, %s, %s, %s)",
                (nomeMaquina, cpu_versao, memoria_total, sistemaOperacional, fkEmpresa),
            )
            mydb.commit()
            mycursor.execute(
                "SELECT idEquipamento FROM equipamento WHERE nomeEquipamento = %s",
                (nomeMaquina,),
            )
            result = mycursor.fetchone()

        idEquipamento = result[0]

        mycursor.execute(
            "INSERT INTO dado (idDado, cpuPercent, memoriaPercent, memoriaUsada, "
            "bytes_recebidos, bytes_enviados, pacotes_recebidos, pacotes_enviados, ping, "
            "dtHora, fkEquipamento) VALUES "
            "(default, %s, %s, %s, %s, %s, %s, %s, %s, default, %s)",
            (
                cpu,
                memoria.percent,
                memoria_usada,
                bytes_recv,
                bytes_sent,
                net_io.packets_recv,
                net_io.packets_sent,
                ping,
                idEquipamento,
            ),
        )
        mydb.commit()

        print(f"Dados inseridos para {nomeMaquina}: CPU {cpu}%, Memória {memoria.percent}%, Bytes enviados {bytes_sent},Bytes Recebidos { bytes_recv}, Pacotes enviado {net_io.packets_sent}, Pacotes recebidos {net_io.packets_recv}, ping {ping} ")
        time.sleep(tempo)
    except KeyboardInterrupt:
        print("Monitoramento interrompido.")
        break
    except Exception as e:
        print(f"Erro inesperado: {e}")

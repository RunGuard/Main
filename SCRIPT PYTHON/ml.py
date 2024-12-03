import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import pandas as pd
import PySimpleGUI as sg
import mysql.connector
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
from datetime import datetime


def importar_arquivo():
    """Função para importar arquivo CSV e obter as variáveis dependente e independente."""
    variavel_dependente = sg.popup_get_text("Digite o nome da coluna da variável DEPENDENTE")
    variavel_independente = sg.popup_get_text("Digite o nome da coluna da variável INDEPENDENTE")
    arquivo = sg.popup_get_file("Selecione o arquivo (Formato CSV)")
    try:
        df = pd.read_csv(arquivo)
        x = df[variavel_dependente].values.reshape(-1, 1)
        y = df[variavel_independente].values
        return x, y, "Importação"
    except Exception as e:
        sg.popup_error(f"Erro ao importar arquivo: {e}")
        return None, None, None


def usar_banco_dados(cursor):
    """Função para consultar o banco de dados e obter as variáveis x e y."""
    query = "SELECT cpuPercent as cpu, memoriaPercent as memoria, time(dtHora) as hora FROM dado;"
    cursor.execute(query)
    listacpu, listahora = [], []

    for row in cursor:
        listacpu.append(row[0])
        # Converter o horário em fração de um dia
        listahora.append(row[2].seconds / 60 / 24)

    x = np.array(listahora).reshape(-1, 1)
    y = listacpu
    return x, y, "Banco de Dados"


def criar_grafico(x, y, modelo):
    """Função para criar e salvar o gráfico."""
    plt.scatter(x, y, color='blue')
    plt.plot(x, modelo.predict(x), color='red')
    plt.title('Regressão Linear Simples RunGuard')
    plt.xlabel("Variável Independente")
    plt.ylabel("Variável Dependente")
    plt.savefig("grafico.png", format="png", dpi=300)
    plt.show()
    plt.close()


def gerar_pdf(modelo, r2_score, caminho):
    """Função para gerar o PDF com os resultados."""
    pdf = canvas.Canvas("RunGuard_Machine_Learning.pdf", pagesize=A4)
    pdf.setTitle("Relatório para análise")

    # Header
    posicaox, posicaoy, width, height = 50, 700, 500, 100
    data_atual = datetime.now().strftime("%d/%m/%Y")
    pdf.rect(posicaox, posicaoy, width, height, stroke=1, fill=1)
    pdf.setFillColorRGB(1, 1, 1)
    pdf.setFont("Helvetica-Bold", 24)
    pdf.drawCentredString(posicaox + width / 2, posicaoy + height / 2, "RunGuard")
    pdf.setFont("Helvetica-Bold", 16)
    pdf.drawCentredString(posicaox + width / 2, posicaoy + height - 160 / 2, f"Relatório gerado no dia {data_atual}")

    # Informações da página
    pdf.setFillColorRGB(0, 0, 0)
    pdf.setFont("Helvetica", 12)
    pdf.drawCentredString(297, 600, "Dados consumidos através de: " + caminho)
    pdf.drawString(80, 550, f"Interceptação (α): {round(modelo.intercept_)}")
    pdf.drawString(400, 550, f"Coeficiente (β): {round(modelo.coef_[0], 2)}")
    pdf.drawCentredString(297, 500, f"R²: {round(r2_score * 100)}%")

    # Gráfico
    pdf.drawImage("grafico.png", 100, 150, 400, 300)
    pdf.setFont("Helvetica", 10)
    pdf.drawString(150, 140, "Gráfico gerado pela aplicação RunGuard Machine Learning")

    pdf.showPage()
    pdf.save()
    print("PDF criado com sucesso.")

layout = [
    [sg.Text('Importar arquivo ou usar o banco de dados?')],
    [sg.Radio("Importar", 1, key="IMPORTAR")],
    [sg.Radio("Banco de dados", 1, key="BANCO")],
    [sg.Button("Confirmar")]
]
window = sg.Window("RunGuard Machine Learning", layout)

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Ubatuba0815",
    database="runguard",
    port=3306
)
mycursor = mydb.cursor()

while True:
    event, values = window.read()
    if event == sg.WINDOW_CLOSED:
        break

    if event == "Confirmar":
        if values["IMPORTAR"]:
            x, y, caminho = importar_arquivo()
        elif values["BANCO"]:
            x, y, caminho = usar_banco_dados(mycursor)
        else:
            sg.popup_error("Selecione uma opção!")
            continue

        if x is None or y is None:
            continue

        X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.65, random_state=7)
        modelo = LinearRegression()
        modelo.fit(X_train, y_train)
        r2_score = modelo.score(X_test, y_test)


        criar_grafico(x, y, modelo)
        gerar_pdf(modelo, r2_score, caminho)
        break

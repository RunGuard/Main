# Codigo para a atribuição de um chamado para um usuario no JIRA
import requests
from requests.auth import HTTPBasicAuth
import json

url = "https://runguard.atlassian.net/rest/api/3/issue/{chave}/assignee" #automatizar
chave = "RUNGUARD-4" #automatizar

idAtribuido = "712020:17e8a9a4-1b95-40e3-82d3-fd9b5f65be1d" #automatizar

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

payload = json.dumps({
    "accountId": idAtribuido
})

response = requests.put(
    url.format(issue_id_or_key=chave),
    headers=headers,
    auth=auth,
    data=payload
)

if response.status_code == 204:
    print("Issue atribuído com sucesso.")
else:
    print(f"Falha ao atribuir issue. Status: {response.status_code}, Detalhes: {response.text}")

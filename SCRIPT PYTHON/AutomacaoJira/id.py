# Codigo para abertura de chamados no JIRA
import requests
from requests.auth import HTTPBasicAuth

url = "https://runguard.atlassian.net/rest/api/3/user/search"

query_params = {
    "query": "ilys.maroto@sptech.school" #automatizar
}

headers = {
    "Accept": "application/json"
}

response = requests.get(
    url,
    headers=headers,
    auth=auth,
    params=query_params
)

if response.status_code == 200:
    users = response.json()
    if users:
        print(f"ID de usuário: {users[0]['accountId']}")
    else:
        print("Usuário não encontrado.")
else:
    print(f"Falha ao buscar usuário. Status: {response.status_code}, Detalhes: {response.text}")
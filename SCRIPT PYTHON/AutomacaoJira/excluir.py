# codigo para excluir um chamado no JIRA
import requests
from requests.auth import HTTPBasicAuth

url = "https://runguard.atlassian.net/rest/api/3/issue/RUNGUARD-1" #automatizar
chave = "RUNGUARD-1" #automatizar

headers = {
    "Accept": "application/json"
}

response = requests.delete(
    url.format(issue_id_or_key=chave),
    headers=headers,
    auth=auth
)

if response.status_code == 204:
    print("Issue excluído com sucesso.")
else:
    print(f"Falha ao excluir issue. Status: {response.status_code}, Detalhes: {response.text}")

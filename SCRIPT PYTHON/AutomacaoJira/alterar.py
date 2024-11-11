# codigo para alterar chamados abertos no JIRA
import requests
from requests.auth import HTTPBasicAuth
import json

# Configurações
url = "https://runguard.atlassian.net/rest/api/3/issue/RUNGUARD-3" #automatizar
chave = "RUNGUARD-3" #automatizar

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

payload = json.dumps( { #automatizar
  "update": {
    "summary": [
      {
        "set": "Tentando summ"
      }
    ]
  }
} )

response = requests.put(
    url.format(issue_id_or_key=chave),
    data=payload,
    headers=headers,
    auth=auth
)

if response.status_code == 204:
    print("Issue alterado com sucesso.")
else:
    print(f"Falha ao alterar issue. Status: {response.status_code}, Detalhes: {response.text}")

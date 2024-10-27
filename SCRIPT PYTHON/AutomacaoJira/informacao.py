#codigo para pegar as informações do chamado
import requests
from requests.auth import HTTPBasicAuth
import json

url = "https://runguard.atlassian.net/rest/api/3/issue/RUNGUARD-3" #automatizar
chave = "RUNGUARD-3" #automatizar

headers = {
  "Accept": "application/json"
}

response = requests.request(
   "GET",
   url,
   headers=headers,
   auth=auth
)

print(json.dumps(json.loads(response.text), sort_keys=True, indent=4, separators=(",", ": ")))
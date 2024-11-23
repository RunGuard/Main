# Codigo para abertura de chamados no JIRA
import requests
from requests.auth import HTTPBasicAuth
import json

url= "https://runguard.atlassian.net/rest/api/3/issue"

headers = {
    "Accept": "application/json",
    "Content-Type": "application/json"
}

payload = json.dumps({ #automatizar 
    "fields":{
        "summary": "Teste",
        "project": {"key":"RUNGUARD"},
        "issuetype": {"name":"Solicitação por e-mail"}
    }
})

response = requests.request(
    "POST",
    url,
    data=payload,
    headers=headers,
    auth=auth
)

print(json.dumps(json.loads(response.text), sort_keys=True,indent=4,separators=(",",": ")))
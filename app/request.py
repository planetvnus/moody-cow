import requests
import json

url = "http://127.0.0.1:8000/orders_as_object"

headers = {
    "accept": "application/json",
    "Content-type": "application/json"
}

params = {
    "product" : "laptop",
    "units": "2"
}

response = requests.post(url, headers=headers, data=json.dumps(params))

print(response.json())
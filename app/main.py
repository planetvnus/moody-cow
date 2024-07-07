from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from utils import generate_description
import pdfplumber
import requests
from bs4 import BeautifulSoup
import re
import openai
from openai import OpenAI
import os
from exceptions.chatgpt import ChatGPTErr, ChatGPTFormatErr, ImageConvertionErr

#initialise fastapi
app = FastAPI()
openai_key = os.environ.get('OPEN_AI_API') or "api_key"
client = OpenAI(api_key=openai_key)

class ScrapeRequest(BaseModel):
    url: str

class Order(BaseModel):
    product: str
    units: int

class Product(BaseModel):
    name_of_product: str
    description: str

class OpenAIRequest(BaseModel):
    prompt: str
#endpoints
@app.get("/ok")
async def ok_endpoint():
    return {"message":"ok"}

@app.get("/hello")
async def hello_endpoint(name: str="sara"):
    return {"message": f"hello {name}"}

#query params
@app.post("/orders")
async def place_order(product: str, units: int):
    return {"message": f"you ordered {units} units of {product}"}

#request body (preferred over as query param)
@app.post("/orders_as_object")
async def place_order(order: Order):
    return {"message": f"you ordered {order.units} units of {order.product}"}

@app.post("/product")
async def generate_product_description(product: Product):
    description = generate_description(f"Product Name: {product.name_of_product}, Description: {product.description}")
    return {"message": f"product description: {description}"}

def find_materials(content: str):
    keywords = ["composition", "nylon", "cotton", "polyester", "silk", "wool", "elastane"]
    pattern = re.compile(r"((?:\d+%?\s?){0,2})(composition|nylon|cotton|polyester|silk|wool|elastane)", re.IGNORECASE)
    matches = pattern.findall(content)
    return matches

def call_chat_gpt_api(messages):
    try:
        openai.api_key = openai_key
        resp = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            max_tokens=256,
            messages=messages,
        )
        return resp["choices"][0]["message"]["content"]
    except Exception as err:
        raise ChatGPTErr() from err
    
def generate_description(prompt_values: OpenAIRequest):
    """
   generate chat for materials
    """
    messages = [
        {
            "role": "user",
            "content": "The webpage contains the following materials with their percentages, you need to interpret the supplied fabric details:" + prompt_values.prompt + ".",
        },
    
    ]
    descriptions = call_chat_gpt_api(messages)
    try:
        description_list = descriptions.split("//")
        return description_list
    except Exception as err:
        raise ChatGPTFormatErr() from err
# endpoint to scrape with 
@app.post("/scrape_and_prompt")
async def scrape_and_prompt(request: ScrapeRequest):
    print(f"Received URL: {request.url}")
    if not request.url:
        raise HTTPException(status_code=400, detail="Invalid URL: URL cannot be empty")
    try:
        response = requests.get(request.url)
        response.raise_for_status()
        
    except requests.RequestException as e:
        raise HTTPException(status_code=400, detail=str(e))
    
    soup = BeautifulSoup(response.content, 'html.parser')
    content = soup.get_text()
    print(content, "content")

    matches = find_materials(content)

    if matches:
        prompt = "The webpage contains the following materials with their percentages, you need to interpret the following fabric composition details:" + ", ".join(matches) + "."
    else:
        prompt = "The webpage does not contain the specified materials with percentages."

    try:
        ai_response = client.completions.create(
            prompt=prompt,
            model="gpt-3.5-turbo-instruct",
            max_tokens=100,
            timeout=5
        )
        print(ai_response)
        return {
            "matches": matches,
            "openai_response": ai_response.choices[0].text.strip()
        }
    except openai.APIError as e:
  #Handle API error here, e.g. retry or log
        print(f"OpenAI API returned an API Error: {e}")
        pass
    except openai.APIConnectionError as e:
        #Handle connection error here
        print(f"Failed to connect to OpenAI API: {e}")
        pass
    except openai.RateLimitError as e:
        #Handle rate limit error (we recommend using exponential backoff)
        print(f"OpenAI API request exceeded rate limit: {e}")
        pass
    except openai.Timeout as e:
        # Handle timeout error
        print(f"OpenAI API request timed out: {e}")
        pass

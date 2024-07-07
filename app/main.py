from fastapi import FastAPI
from pydantic import BaseModel
from utils import generate_description
import pdfplumber
import requests

#initialise fastapi
app = FastAPI()

class Order(BaseModel):
    product: str
    units: int

class Product(BaseModel):
    name_of_product: str
    description: str

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


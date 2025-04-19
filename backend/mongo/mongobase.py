import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from bson import json_util
import json
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()

class AtlasClient():

    def __init__(self, dbname):
        uri = "mongodb://localhost:27017"
        self.mongodb_client = MongoClient(uri)
        self.database = self.mongodb_client[dbname]

    def ping(self):
        self.mongodb_client.admin.command('ping')

    def get_collection(self, collection_name):
        collection = self.database[collection_name]
        return collection
    
    def find(self, collection_name, filter={}, page=1, per_page=5):
        collection = self.database[collection_name]
        skip = (page - 1) * per_page
        items = list(collection.find(filter=filter).skip(skip).limit(per_page))
        total = collection.count_documents(filter)
        return {
            "items": json.loads(json_util.dumps(items)),
            "total": total,
            "page": page,
            "per_page": per_page,
            "total_pages": (total + per_page - 1) // per_page
        }
   
    def find_one(self, collection_name, filter={}):
        collection = self.database[collection_name]
        item = collection.find_one(filter=filter)
        return item
   
    def insert_one(self, collection_name, data):
        collection = self.database[collection_name]
        result = collection.insert_one(data)
        return result
   
    def update_one(self, collection_name, filter, data):
        collection = self.database[collection_name]
        result = collection.update_one(filter, data)
        return result

client = AtlasClient(dbname="mydatabase")

@app.get("/api/fetch")
def start(page: int = 1, per_page: int = 5):
    try:
        transactions = client.find(
            collection_name="transactions",
            page=page,
            per_page=per_page
        )
        return JSONResponse(content=transactions)
    except Exception as e:
        print(f"Error fetching transactions: {e}")
        return JSONResponse(
            status_code=500,
            content={"message": f"Error fetching transactions: {str(e)}"}
        )
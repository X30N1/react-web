import os
from dotenv import load_dotenv
from pymongo.mongo_client import MongoClient
from bson import json_util
import json

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

    def create_indexes(self):
        # Create unique index on email field
        self.database["users"].create_index("email", unique=True)
        
        # Create index for user_id in transactions
        self.database["transactions"].create_index("user_id")
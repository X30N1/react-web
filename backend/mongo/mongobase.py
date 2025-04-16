import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

class AtlasClient ():

   def __init__ (self, dbname):
       uri = f"mongodb+srv://<{os.getenv("user")}>:<{os.getenv("pass")}>@cluster0.yxqykpq.mongodb.net/?appName=Cluster0"
       self.mongodb_client = MongoClient(uri)
       self.database = self.mongodb_client[dbname]

   def ping (self):
       self.mongodb_client.admin.command('ping')

   def get_collection (self, collection_name):
       collection = self.database[collection_name]
       return collection

   def find (self, collection_name, filter = {}, limit=0):
       collection = self.database[collection_name]
       items = list(collection.find(filter=filter, limit=limit))
       return items
   
   def find_one (self, collection_name, filter = {}):
       collection = self.database[collection_name]
       item = collection.find_one(filter=filter)
       return item
   
   def insert_one (self, collection_name, data):
       collection = self.database[collection_name]
       result = collection.insert_one(data)
       return result
   
   def update_one (self, collection_name, filter, data):
       collection = self.database[collection_name]
       result = collection.update_one(filter, data)
       return result
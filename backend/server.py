
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from mongo.mongobase import AtlasClient

load_dotenv()
app = FastAPI()
db = "transactions"
client = AtlasClient(dbname=db)
# Ping the database to check if it's reachable
try:
    client.ping()
except Exception as e:
    print(f"Error pinging the database: {e}")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/fetch")
def start():
    return client.find(collection_name="transactions")


@app.post("/api/insert")
def insert(data: dict):
    client.insert_one(collection_name="transactions", data=data)
    return {"message": "Data inserted successfully"}
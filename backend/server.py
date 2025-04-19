from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from bson import json_util
from dotenv import load_dotenv
from mongo.mongobase import AtlasClient

load_dotenv()
app = FastAPI()
db = "transactions"
client = AtlasClient(dbname=db)

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
def start(page: int = 1, per_page: int = 15):
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

@app.post("/api/insert")
def insert(data: dict):
    client.insert_one(collection_name="transactions", data=data)
    return {"message": "Data inserted successfully"}
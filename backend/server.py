from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from bson import ObjectId
from models import User, Transaction
from mongo.mongobase import AtlasClient

# JWT Configuration
SECRET_KEY = "fajny-sekret"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()
client = AtlasClient(dbname="transactions")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = client.find_one("users", {"_id": ObjectId(user_id)})
    if user is None:
        raise credentials_exception
    return user

# API Endpoints
@app.post("/api/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    user = client.find_one("users", {"email": form_data.username})
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(
            status_code=400,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(
        data={"sub": str(user["_id"])}
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/api/register")
async def register(user: User):
    if client.find_one("users", {"email": user.email}):
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )
    
    user_dict = user.dict()
    user_dict["password"] = get_password_hash(user_dict["password"])
    
    try:
        result = client.insert_one("users", user_dict)
        return {"message": "User registered successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Registration failed: {str(e)}"
        )

@app.get("/api/fetch")
async def fetch_transactions(
    current_user: dict = Depends(get_current_user),
    page: int = 1,
    per_page: int = 5
):
    try:
        transactions = client.find(
            collection_name="transactions",
            filter={"user_id": str(current_user["_id"])},
            page=page,
            per_page=per_page
        )
        return transactions
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error fetching transactions: {str(e)}"
        )

@app.post("/api/insert")
async def insert_transaction(
    transaction: Transaction,
    current_user: dict = Depends(get_current_user)
):
    transaction_dict = transaction.dict()
    transaction_dict["user_id"] = str(current_user["_id"])
    
    try:
        result = client.insert_one("transactions", transaction_dict)
        return {"message": "Transaction added successfully"}
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error adding transaction: {str(e)}"
        )
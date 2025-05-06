from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class User(BaseModel):
    email: EmailStr
    password: str
    name: Optional[str] = None
    created_at: datetime = datetime.now()

class Transaction(BaseModel):
    name: str
    amount: float
    type: str
    category: str
    date: str
    time: str
    user_id: Optional[str] = None
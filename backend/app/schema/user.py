from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.util.constants import UserRole, DEFAULT_USER_ROLE

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str
    role: Optional[UserRole] = DEFAULT_USER_ROLE

class UserResponse(UserBase):
    id: int
    role: str
    
    class Config:
        from_attributes = True

class LoginResponse(BaseModel):
    user: UserResponse
    authenticated: bool = True
    timestamp: datetime
    message: str = "Login successful"
    
    class Config:
        from_attributes = True 
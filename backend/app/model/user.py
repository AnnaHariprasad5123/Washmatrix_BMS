from sqlalchemy import Column, Integer, String
from app.config.database import Base
from app.util.constants import UserRole, USERS_TABLE

class User(Base):
    __tablename__ = USERS_TABLE
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(String, default=UserRole.USER.value, nullable=False) 
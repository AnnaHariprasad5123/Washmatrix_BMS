from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException, status
from app.model.user import User
from app.schema.user import UserCreate, UserResponse
from app.util.password import hash_password, verify_password
from app.config.logger import logger
from app.exception.user import (
    UserAlreadyExistsException,
    UserCreationFailedException
)
from typing import Optional

class UserService:

    @staticmethod
    def create_user(db: Session, user_data: UserCreate) -> UserResponse:
        logger.info(f"Creating new user: {user_data.username}")
        
        existing_user = db.query(User).filter(User.username == user_data.username).first()
        if existing_user:
            raise UserAlreadyExistsException("username", user_data.username)
        
        existing_email = db.query(User).filter(User.email == user_data.email).first()
        if existing_email:
            raise UserAlreadyExistsException("email", user_data.email)
        
        hashed_password = hash_password(user_data.password)
        
        db_user = User(
            username=user_data.username,
            email=user_data.email,
            password_hash=hashed_password,
            role=user_data.role.value
        )
        
        try:
            db.add(db_user)
            db.commit()
            db.refresh(db_user)
            logger.info(f"User created successfully: {user_data.username}")
            return UserResponse.model_validate(db_user)
        except IntegrityError as e:
            db.rollback()
            raise UserCreationFailedException(str(e))
    
    @staticmethod
    def authenticate_user(db: Session, username: str, password: str) -> Optional[User]:
        logger.info(f"Authenticating user: {username}")
        
        user = db.query(User).filter(User.username == username).first()
        if not user:
            logger.warning(f"User not found: {username}")
            return None
        
        if not verify_password(password, user.password_hash):
            logger.warning(f"Invalid password for user: {username}")
            return None
        
        logger.info(f"User authenticated successfully: {username}")
        return user 
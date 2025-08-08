from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
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

    def __init__(self, db: Session):
        self.db = db
        self.logger = logger

    def create_user(self, user_data: UserCreate) -> UserResponse:
        self.logger.info(f"Creating new user: {user_data.username}")
        
        existing_user = self.db.query(User).filter(User.username == user_data.username).first()
        if existing_user:
            raise UserAlreadyExistsException("username", user_data.username)
        
        existing_email = self.db.query(User).filter(User.email == user_data.email).first()
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
            self.db.add(db_user)
            self.db.commit()
            self.db.refresh(db_user)
            self.logger.info(f"User created successfully: {user_data.username}")
            return UserResponse.model_validate(db_user)
        except IntegrityError as e:
            self.db.rollback()
            raise UserCreationFailedException(str(e))
    
    def authenticate_user(self, username: str, password: str) -> Optional[User]:
        self.logger.info(f"Authenticating user: {username}")
        
        user = self.db.query(User).filter(User.username == username).first()
        if not user:
            self.logger.warning(f"User not found: {username}")
            return None
        
        if not verify_password(password, user.password_hash):
            self.logger.warning(f"Invalid password for user: {username}")
            return None
        
        self.logger.info(f"User authenticated successfully: {username}")
        return user 
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPBasicCredentials
from sqlalchemy.orm import Session
from datetime import datetime
from app.config.database import get_db
from app.exception.user import InvalidCredentialsException
from app.schema.user import UserCreate, UserResponse, LoginResponse
from app.service.user import UserService
from app.util.constants import USERS_PREFIX, USERS_TAGS
from app.config.logger import logger


user_router = APIRouter(prefix=USERS_PREFIX, tags=USERS_TAGS)

@user_router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    logger.info(f"Signup request for user: {user_data.username}")
    return UserService.create_user(db, user_data)

# @user_router.post("/login", response_model=LoginResponse, status_code=status.HTTP_200_OK)
# def login(credentials: HTTPBasicCredentials = Depends(), db: Session = Depends(get_db)):
#     logger.info(f"Login request for user: {credentials.username}")
    
#     user = UserService.authenticate_user(db, credentials.username, credentials.password)
#     if not user:
#         logger.warning(f"Login failed for user: {credentials.username}")
#         raise InvalidCredentialsException()
    
#     logger.info(f"Login successful for user: {credentials.username}")
    
#     return LoginResponse(
#         user=UserResponse.model_validate(user),
#        timestamp = datetime.utcnow()
#     ) 
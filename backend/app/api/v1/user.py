from fastapi import APIRouter, Depends, status
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

def get_user_service(db: Session = Depends(get_db)) -> UserService:
    return UserService(db)

@user_router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(
    user_data: UserCreate, 
    user_service: UserService = Depends(get_user_service)
):
    logger.info(f"Signup request for user: {user_data.username}")
    return user_service.create_user(user_data)

# @user_router.post("/login", response_model=LoginResponse, status_code=status.HTTP_200_OK)
# def login(
#     credentials: HTTPBasicCredentials = Depends(), 
#     user_service: UserService = Depends(get_user_service)
# ):
#     logger.info(f"Login request for user: {credentials.username}")
    
#     user = user_service.authenticate_user(credentials.username, credentials.password)
#     if not user:
#         logger.warning(f"Login failed for user: {credentials.username}")
#         raise InvalidCredentialsException()
    
#     logger.info(f"Login successful for user: {credentials.username}")
    
#     return LoginResponse(
#         user=UserResponse.model_validate(user),
#         timestamp=datetime.utcnow()
#     ) 
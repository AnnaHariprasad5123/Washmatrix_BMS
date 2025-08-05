import base64
from fastapi import Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from app.exception.book import ForbiddenBookAccessException, UnauthorizedBookAccessException
from app.exception.user import InvalidCredentialsException
from app.exception.base import BaseAppException
from app.util.constants import UserRole, PUBLIC_PATHS
from app.config.logger import logger
from app.config.database import get_db
from app.service.user import UserService


def verify_user_authentication(username: str, password: str, db: Session) -> UserRole:
    logger.info(f"Verifying credentials for user: {username}")
    
    user = UserService.authenticate_user(db, username, password)
    if not user:
        logger.warning(f"Authentication failed: User '{username}' not found or invalid password")
        raise InvalidCredentialsException()
    
    logger.info(f"Authentication successful for user '{username}' with role: {user.role}")
    return UserRole(user.role)


def check_role_access(user_role: UserRole, method: str, path: str) -> bool:
    logger.info(f"Checking access for {user_role.value} role: {method} {path}")
    
    if user_role == UserRole.ADMIN:
        logger.info(f"Admin access granted for {method} {path}")
        return True
    
    if user_role == UserRole.USER:
        if method != "GET":
            logger.warning(f"Access denied: User role attempted {method} operation on {path}")
            raise ForbiddenBookAccessException()
        
        if not path.startswith("/v1/books"):
            logger.warning(f"Access denied: User role attempted to access {path}")
            raise ForbiddenBookAccessException()
        
        logger.info(f"User access granted for {method} {path}")
        return True
    

async def http_basic_auth_middleware(request: Request, call_next):
    
    logger.info(f"Processing request: {request.method} {request.url.path}")
    
    if request.url.path in PUBLIC_PATHS:
        logger.info(f"Public path accessed: {request.url.path}")
        response = await call_next(request)
        return response
    
    try:
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Basic "):
            logger.warning(f"Authentication failed: Missing or invalid Authorization header for {request.method} {request.url.path}")
            raise UnauthorizedBookAccessException()
        
        encoded_credentials = auth_header.split(" ")[1]
        decoded_credentials = base64.b64decode(encoded_credentials).decode("utf-8")
        username, password = decoded_credentials.split(":")
        
        db:Session = next(get_db())
        user_role = verify_user_authentication(username, password, db)
        
        check_role_access(user_role, request.method, request.url.path)
        
        response = await call_next(request)
        return response
        
    except BaseAppException as e:
        logger.warning(f"{e.__class__.__name__} raised: {e.message}")
        return JSONResponse(
            status_code=e.status_code,
            content={
                "error": e.message,
                "timestamp": e.headers.get("timestamp", ""),
                "path": str(request.url.path)
            },
            headers=e.headers
        )
    except Exception as e:
        logger.error(f"Authentication error for {request.method} {request.url.path}: {str(e)}")
        raise InvalidCredentialsException() 
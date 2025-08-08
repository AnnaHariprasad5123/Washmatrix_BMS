from fastapi import HTTPException
from app.config.logger import logger
from datetime import datetime, timezone


class BaseAppException(HTTPException):
    
    def __init__(self, message: str, status_code: int = 500, headers: dict = None):
        self.message = message
        self.status_code = status_code
        self.headers = headers or {}
        
        if "timestamp" not in self.headers:
            self.headers["timestamp"] = datetime.now(timezone.utc).isoformat()
        
        logger.warning(f"{self.__class__.__name__} raised: {message}")
        
        super().__init__(
            status_code=status_code,
            detail=message,
            headers=self.headers
        ) 
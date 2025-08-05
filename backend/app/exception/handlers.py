from fastapi import Request, status
from fastapi.responses import JSONResponse
from app.config.logger import logger
from app.exception.base import BaseAppException


async def global_exception_handler(request: Request, exc: Exception):
    
    if isinstance(exc, BaseAppException):
        logger.error("Application error: %s", exc.message)
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "error": exc.message,
                "timestamp": exc.headers.get("timestamp", ""),
                "path": str(request.url.path)
            },
            headers=exc.headers
        )
    else:
        logger.error(f"Unhandled exception for {request.method} {request.url.path}: {str(exc)}")
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "error": "Internal server error",
                "detail": "An unexpected error occurred",
                "path": str(request.url.path)
            }
        ) 
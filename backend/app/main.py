import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.book import book_router
from app.api.v1.user import user_router
from app.config.database import engine, Base
from app.config.settings import settings
from app.config.logger import logger
from app.middleware.http_basic_auth import http_basic_auth_middleware
from app.util.constants import API_V1_PREFIX, APP_TITLE
from app.middleware.logging import LoggingMiddleware
from app.exception.handlers import global_exception_handler

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=APP_TITLE,
    debug=settings.debug
)

logger.info(f"Starting {APP_TITLE} application")

app.add_exception_handler(Exception, global_exception_handler)

logger.info("Exception handlers registered successfully")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

logger.info("CORS middleware configured successfully")


app.add_middleware(LoggingMiddleware)

app.middleware('http')(http_basic_auth_middleware)

logger.info("HTTP Basic Auth middleware configured successfully")

app.include_router(
    prefix=API_V1_PREFIX, 
    router=book_router
)

app.include_router(
    prefix=API_V1_PREFIX, 
    router=user_router
)

logger.info("Book and User routers included successfully")

@app.get("/")
def root():
    logger.info("Root endpoint accessed")
    return {"message": f"Welcome to {APP_TITLE} API"}

@app.get("/health")
def health_check():
    logger.info("Health check endpoint accessed")
    return {"status": "healthy"}

def main():
    logger.info(f"Starting server on {settings.host}:{settings.port}")
    uvicorn.run(
       "app.main:app",
        host=settings.host,
        port=settings.port,
        reload=settings.reload,
    )

if __name__ == '__main__':
    main()
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from app.config.settings import settings
from app.config.logger import logger

DATABASE_URL = settings.database_url

logger.info(f"Initializing database connection...")

engine = create_engine(DATABASE_URL, connect_args={'check_same_thread':False}  if DATABASE_URL.startswith("sqlite") else {})

logger.info("Database engine created successfully")

sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

logger.info("Database session factory created successfully")

Base = declarative_base()

def get_db():
    try:
        logger.debug("Creating new database session")
        db = sessionLocal()
        yield db
    finally:
        logger.debug("Closing database session")
        db.close()

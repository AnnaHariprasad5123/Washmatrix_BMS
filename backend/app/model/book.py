from app.config.database import Base
from sqlalchemy import Integer, String, Column, Text
from app.util.constants import BOOKS_TABLE

class Book(Base):
    __tablename__ = BOOKS_TABLE
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    author = Column(String, nullable=False)
    description =Column(Text, nullable=True)
    year_published = Column(Integer, nullable=False)

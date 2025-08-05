from pydantic import BaseModel, Field
from typing import Optional

class BookBase(BaseModel):
    title:str = Field(..., description="Title of the book")
    author: str = Field(..., description="Book author name")
    description: Optional[str] = Field(None, description="Description about the book")
    year_published: int = Field(..., description="Book published year")

class CreateBook(BookBase):
    pass

class UpdateBook(BaseModel):
    title: Optional[str] = None
    author: Optional[str] = None
    description: Optional[str] = None
    year_published: Optional[int] = None

class Book(BookBase):
    id: int

    class Config:
        from_attributes = True
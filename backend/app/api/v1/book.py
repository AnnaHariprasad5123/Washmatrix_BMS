from fastapi import APIRouter, Depends
from app.service.book import BookService
from app.config.database import get_db
from app.config.logger import logger
from sqlalchemy.orm import Session
from typing import List
from app.schema.book import Book, CreateBook, UpdateBook
from app.util.constants import BOOKS_PREFIX, BOOKS_TAGS

book_router = APIRouter(
    prefix=BOOKS_PREFIX,
    tags=BOOKS_TAGS
)

@book_router.get("/", response_model=List[Book])
def get_all_books(skip:int = 0, limit:int = 100, db: Session = Depends(get_db)):
    logger.info(f"Fetching all books with skip={skip} and limit={limit}")
    try:
        books = BookService.get_all_books(db, skip=skip, limit=limit)
        logger.info(f"Successfully retrieved {len(books)} books")
        return books
    except Exception as e:
        logger.error(f"Failed to fetch books: {str(e)}")
        raise

@book_router.get("/{book_id}",response_model=Book)
def get_book(book_id:int, db:Session=Depends(get_db)):
    logger.info(f"Fetching book with ID: {book_id}")
    try:
        book = BookService.get_book(db, book_id=book_id)
        logger.info(f"Successfully retrieved book with ID: {book_id}")
        return book
    except Exception as e:
        logger.error(f"Failed to fetch book with ID {book_id}: {str(e)}")
        raise

@book_router.post("/", response_model=Book)
def create_book(
    book_data: CreateBook,
    db: Session = Depends(get_db)):
    logger.info(f"Creating new book: {book_data.title}")
    try:
        new_book = BookService.create_book(db, book_data)
        logger.info(f"Successfully created book with ID: {new_book.id}")
        return new_book
    except Exception as e:
        logger.error(f"Failed to create book: {str(e)}")
        raise

@book_router.put("/{book_id}", response_model=Book)
def update_book(
    book_id: int,
    book_data: UpdateBook,
    db: Session = Depends(get_db)
):
    logger.info(f"Updating book with ID: {book_id}")
    try:
        updated_book = BookService.update_book(db, book_id, book_data)
        logger.info(f"Successfully updated book with ID: {book_id}")
        return updated_book
    except Exception as e:
        logger.error(f"Failed to update book with ID {book_id}: {str(e)}")
        raise

@book_router.delete("/{book_id}")
def delete_book(
    book_id: int,
    db: Session = Depends(get_db)
):
    logger.info(f"Deleting book with ID: {book_id}")
    try:
        result = BookService.delete_book(db, book_id)
        logger.info(f"Successfully deleted book with ID: {book_id}")
        return result
    except Exception as e:
        logger.error(f"Failed to delete book with ID {book_id}: {str(e)}")
        raise
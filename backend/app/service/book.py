from app.model.book import Book
from sqlalchemy.orm import Session
from app.schema.book import CreateBook, UpdateBook
from app.exception.book import BookNotFoundException
from app.config.logger import logger

class BookService:
    
    @staticmethod
    def get_all_books(db: Session, skip: int = 0, limit: int = 100):
        logger.info(f"Querying database for books with skip={skip} and limit={limit}")
        books = db.query(Book).offset(skip).limit(limit).all()
        logger.info(f"Found {len(books)} books in database")
        return books
    
    @staticmethod
    def get_book(db: Session, book_id: int):
        logger.info(f"Querying database for book with ID: {book_id}")
        book = db.query(Book).filter(Book.id == book_id).first()
        if not book:
            logger.warning(f"Book with ID {book_id} not found in database")
            raise BookNotFoundException(book_id)
        logger.info(f"Found book with ID {book_id} in database")
        return book

    @staticmethod
    def create_book(db: Session, book_data: CreateBook):
        logger.info(f"Creating new book in database: {book_data.title}")
        new_book = Book(**book_data.model_dump())
        db.add(new_book)
        db.commit()
        db.refresh(new_book)
        logger.info(f"Successfully created book with ID {new_book.id} in database")
        return new_book

    @staticmethod
    def update_book(db: Session, book_id: int, book_data: UpdateBook):
        logger.info(f"Updating book with ID {book_id} in database")
        book = BookService.get_book(db, book_id=book_id)
        update_fields = book_data.model_dump(exclude_unset=True)
        logger.info(f"Updating fields: {list(update_fields.keys())}")
        
        for field, value in update_fields.items():
            setattr(book, field, value)
        
        db.commit()
        db.refresh(book)
        logger.info(f"Successfully updated book with ID {book_id} in database")
        return book
    
    @staticmethod
    def delete_book(db: Session, book_id: int):
        logger.info(f"Deleting book with ID {book_id} from database")
        book = BookService.get_book(db, book_id=book_id)
        db.delete(book)
        db.commit()
        logger.info(f"Successfully deleted book with ID {book_id} from database")
        return {'detail': f'Book with id {book_id} is deleted'}
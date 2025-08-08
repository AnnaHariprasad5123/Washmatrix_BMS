from app.model.book import Book
from sqlalchemy.orm import Session
from app.schema.book import CreateBook, UpdateBook
from app.exception.book import BookNotFoundException
from app.config.logger import logger

class BookService:
    
    def __init__(self, db: Session):
        self.db = db
        self.logger = logger
    
    def get_all_books(self, skip: int = 0, limit: int = 100):
        """Get all books with pagination."""
        self.logger.info(f"Querying database for books with skip={skip} and limit={limit}")
        books = self.db.query(Book).offset(skip).limit(limit).all()
        self.logger.info(f"Found {len(books)} books in database")
        return books
    
    def get_book(self, book_id: int):
        """Get a single book by ID."""
        self.logger.info(f"Querying database for book with ID: {book_id}")
        book = self.db.query(Book).filter(Book.id == book_id).first()
        if not book:
            self.logger.warning(f"Book with ID {book_id} not found in database")
            raise BookNotFoundException(book_id)
        self.logger.info(f"Found book with ID {book_id} in database")
        return book

    def create_book(self, book_data: CreateBook):
        """Create a new book."""
        self.logger.info(f"Creating new book in database: {book_data.title}")
        new_book = Book(**book_data.model_dump())
        self.db.add(new_book)
        self.db.commit()
        self.db.refresh(new_book)
        self.logger.info(f"Successfully created book with ID {new_book.id} in database")
        return new_book

    def update_book(self, book_id: int, book_data: UpdateBook):
        """Update an existing book."""
        self.logger.info(f"Updating book with ID {book_id} in database")
        book = self.get_book(book_id)  # Now using self.get_book instead of BookService.get_book
        update_fields = book_data.model_dump(exclude_unset=True)
        self.logger.info(f"Updating fields: {list(update_fields.keys())}")
        
        for field, value in update_fields.items():
            setattr(book, field, value)
        
        self.db.commit()
        self.db.refresh(book)
        self.logger.info(f"Successfully updated book with ID {book_id} in database")
        return book
    
    def delete_book(self, book_id: int):
        """Delete a book by ID."""
        self.logger.info(f"Deleting book with ID {book_id} from database")
        book = self.get_book(book_id)  # Now using self.get_book instead of BookService.get_book
        self.db.delete(book)
        self.db.commit()
        self.logger.info(f"Successfully deleted book with ID {book_id} from database")
        return {'detail': f'Book with id {book_id} is deleted'}
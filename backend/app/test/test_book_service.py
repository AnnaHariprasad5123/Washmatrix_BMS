import pytest
from sqlalchemy.orm import Session
from app.service.book import BookService
from app.schema.book import CreateBook, UpdateBook
from app.exception.book import BookNotFoundException

def test_create_book(db_session):
    book_data = CreateBook(
        title="Test Book",
        author="Test Author",
        description="A test book description",
        year_published=2023
    )
    
    book = BookService.create_book(db_session, book_data)
    
    assert book.id is not None
    assert book.title == "Test Book"
    assert book.author == "Test Author"
    assert book.description == "A test book description"
    assert book.year_published == 2023

def test_get_book(db_session):
    book_data = CreateBook(
        title="Test Book",
        author="Test Author",
        description="A test book description",
        year_published=2023
    )
    
    created_book = BookService.create_book(db_session, book_data)
    retrieved_book = BookService.get_book(db_session, created_book.id)
    
    assert retrieved_book.id == created_book.id
    assert retrieved_book.title == created_book.title
    assert retrieved_book.author == created_book.author

def test_get_book_not_found(db_session):
    with pytest.raises(BookNotFoundException):
        BookService.get_book(db_session, 999)

def test_get_all_books(db_session):
    book1_data = CreateBook(
        title="Book 1",
        author="Author 1",
        description="Description 1",
        year_published=2021
    )
    
    book2_data = CreateBook(
        title="Book 2",
        author="Author 2",
        description="Description 2",
        year_published=2022
    )
    
    BookService.create_book(db_session, book1_data)
    BookService.create_book(db_session, book2_data)
    
    books = BookService.get_all_books(db_session)
    
    assert len(books) == 2
    assert books[0].title == "Book 1"
    assert books[1].title == "Book 2"

def test_get_all_books_with_pagination(db_session):
    for i in range(5):
        book_data = CreateBook(
            title=f"Book {i}",
            author=f"Author {i}",
            description=f"Description {i}",
            year_published=2020 + i
        )
        BookService.create_book(db_session, book_data)
    
    books = BookService.get_all_books(db_session, skip=2, limit=2)
    
    assert len(books) == 2
    assert books[0].title == "Book 2"
    assert books[1].title == "Book 3"

def test_update_book(db_session):
    book_data = CreateBook(
        title="Original Title",
        author="Original Author",
        description="Original Description",
        year_published=2020
    )
    
    created_book = BookService.create_book(db_session, book_data)
    
    update_data = UpdateBook(title="Updated Title", year_published=2023)
    updated_book = BookService.update_book(db_session, created_book.id, update_data)
    
    assert updated_book.title == "Updated Title"
    assert updated_book.author == "Original Author"
    assert updated_book.year_published == 2023
    assert updated_book.description == "Original Description"

def test_update_book_partial(db_session):
    book_data = CreateBook(
        title="Original Title",
        author="Original Author",
        description="Original Description",
        year_published=2020
    )
    
    created_book = BookService.create_book(db_session, book_data)
    
    update_data = UpdateBook(title="Updated Title")
    updated_book = BookService.update_book(db_session, created_book.id, update_data)
    
    assert updated_book.title == "Updated Title"
    assert updated_book.author == "Original Author"
    assert updated_book.description == "Original Description"
    assert updated_book.year_published == 2020

def test_update_book_not_found(db_session):
    update_data = UpdateBook(title="Updated Title")
    
    with pytest.raises(BookNotFoundException):
        BookService.update_book(db_session, 999, update_data)

def test_delete_book(db_session):
    book_data = CreateBook(
        title="Test Book",
        author="Test Author",
        description="Test Description",
        year_published=2023
    )
    
    created_book = BookService.create_book(db_session, book_data)
    result = BookService.delete_book(db_session, created_book.id)
    
    assert result['detail'] == f'Book with id {created_book.id} is deleted'
    
    with pytest.raises(BookNotFoundException):
        BookService.get_book(db_session, created_book.id)

def test_delete_book_not_found(db_session):
    with pytest.raises(BookNotFoundException):
        BookService.delete_book(db_session, 999)

def test_create_multiple_books_and_retrieve(db_session):
    books_data = [
        CreateBook(title="Book 1", author="Author 1", description="Desc 1", year_published=2021),
        CreateBook(title="Book 2", author="Author 2", description="Desc 2", year_published=2022),
        CreateBook(title="Book 3", author="Author 3", description="Desc 3", year_published=2023)
    ]
    
    created_books = []
    for book_data in books_data:
        book = BookService.create_book(db_session, book_data)
        created_books.append(book)
    
    all_books = BookService.get_all_books(db_session)
    assert len(all_books) == 3
    
    for i, book in enumerate(created_books):
        retrieved_book = BookService.get_book(db_session, book.id)
        assert retrieved_book.title == f"Book {i+1}"
        assert retrieved_book.author == f"Author {i+1}"

def test_update_book_all_fields(db_session):
    book_data = CreateBook(
        title="Original Title",
        author="Original Author",
        description="Original Description",
        year_published=2020
    )
    
    created_book = BookService.create_book(db_session, book_data)
    
    update_data = UpdateBook(
        title="Updated Title",
        author="Updated Author",
        description="Updated Description",
        year_published=2023
    )
    
    updated_book = BookService.update_book(db_session, created_book.id, update_data)
    
    assert updated_book.title == "Updated Title"
    assert updated_book.author == "Updated Author"
    assert updated_book.description == "Updated Description"
    assert updated_book.year_published == 2023

def test_get_all_books_empty(db_session):
    books = BookService.get_all_books(db_session)
    
    assert len(books) == 0
    assert isinstance(books, list)

import pytest
from app.schema.book import CreateBook, UpdateBook
from app.exception.book import BookNotFoundException

def test_create_book(book_service):
    book_data = CreateBook(
        title="Test Book",
        author="Test Author",
        description="A test book description",
        year_published=2023
    )
    
    book = book_service.create_book(book_data)
    
    assert book.id is not None
    assert book.title == "Test Book"
    assert book.author == "Test Author"
    assert book.description == "A test book description"
    assert book.year_published == 2023

def test_get_book(book_service):
    book_data = CreateBook(
        title="Test Book",
        author="Test Author",
        description="A test book description",
        year_published=2023
    )
    
    created_book = book_service.create_book(book_data)
    retrieved_book = book_service.get_book(created_book.id)
    
    assert retrieved_book.id == created_book.id
    assert retrieved_book.title == created_book.title
    assert retrieved_book.author == created_book.author

def test_get_book_not_found(book_service):
    with pytest.raises(BookNotFoundException):
        book_service.get_book(999)

def test_get_all_books(book_service):
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
    
    book_service.create_book(book1_data)
    book_service.create_book(book2_data)
    
    books = book_service.get_all_books()
    
    assert len(books) == 2
    assert books[0].title == "Book 1"
    assert books[1].title == "Book 2"

def test_get_all_books_with_pagination(book_service):
    for i in range(5):
        book_data = CreateBook(
            title=f"Book {i}",
            author=f"Author {i}",
            description=f"Description {i}",
            year_published=2020 + i
        )
        book_service.create_book(book_data)
    
    books = book_service.get_all_books(skip=2, limit=2)
    
    assert len(books) == 2
    assert books[0].title == "Book 2"
    assert books[1].title == "Book 3"

def test_update_book(book_service):
    book_data = CreateBook(
        title="Original Title",
        author="Original Author",
        description="Original Description",
        year_published=2020
    )
    
    created_book = book_service.create_book(book_data)
    
    update_data = UpdateBook(title="Updated Title", year_published=2023)
    updated_book = book_service.update_book(created_book.id, update_data)
    
    assert updated_book.title == "Updated Title"
    assert updated_book.author == "Original Author"
    assert updated_book.year_published == 2023
    assert updated_book.description == "Original Description"

def test_update_book_partial(book_service):
    book_data = CreateBook(
        title="Original Title",
        author="Original Author",
        description="Original Description",
        year_published=2020
    )
    
    created_book = book_service.create_book(book_data)
    
    update_data = UpdateBook(title="Updated Title")
    updated_book = book_service.update_book(created_book.id, update_data)
    
    assert updated_book.title == "Updated Title"
    assert updated_book.author == "Original Author"
    assert updated_book.description == "Original Description"
    assert updated_book.year_published == 2020

def test_update_book_not_found(book_service):
    update_data = UpdateBook(title="Updated Title")
    
    with pytest.raises(BookNotFoundException):
        book_service.update_book(999, update_data)

def test_delete_book(book_service):
    book_data = CreateBook(
        title="Test Book",
        author="Test Author",
        description="Test Description",
        year_published=2023
    )
    
    created_book = book_service.create_book(book_data)
    result = book_service.delete_book(created_book.id)
    
    assert result['detail'] == f'Book with id {created_book.id} is deleted'
    
    with pytest.raises(BookNotFoundException):
        book_service.get_book(created_book.id)

def test_delete_book_not_found(book_service):
    with pytest.raises(BookNotFoundException):
        book_service.delete_book(999)

def test_create_multiple_books_and_retrieve(book_service):
    books_data = [
        CreateBook(title="Book 1", author="Author 1", description="Desc 1", year_published=2021),
        CreateBook(title="Book 2", author="Author 2", description="Desc 2", year_published=2022),
        CreateBook(title="Book 3", author="Author 3", description="Desc 3", year_published=2023)
    ]
    
    created_books = []
    for book_data in books_data:
        book = book_service.create_book(book_data)
        created_books.append(book)
    
    all_books = book_service.get_all_books()
    assert len(all_books) == 3
    
    for i, book in enumerate(created_books):
        retrieved_book = book_service.get_book(book.id)
        assert retrieved_book.title == f"Book {i+1}"
        assert retrieved_book.author == f"Author {i+1}"

def test_update_book_all_fields(book_service):
    book_data = CreateBook(
        title="Original Title",
        author="Original Author",
        description="Original Description",
        year_published=2020
    )
    
    created_book = book_service.create_book(book_data)
    
    update_data = UpdateBook(
        title="Updated Title",
        author="Updated Author",
        description="Updated Description",
        year_published=2023
    )
    
    updated_book = book_service.update_book(created_book.id, update_data)
    
    assert updated_book.title == "Updated Title"
    assert updated_book.author == "Updated Author"
    assert updated_book.description == "Updated Description"
    assert updated_book.year_published == 2023

def test_get_all_books_empty(book_service):
    books = book_service.get_all_books()
    
    assert len(books) == 0
    assert isinstance(books, list)

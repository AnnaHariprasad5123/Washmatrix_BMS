from enum import Enum

class UserRole(Enum):
    ADMIN = "admin"
    USER = "user"

USERS_TABLE = "users"
BOOKS_TABLE = "book"

API_V1_PREFIX = "/v1"
USERS_PREFIX = "/users"
BOOKS_PREFIX = "/books"
USERS_TAGS = ["users"]
BOOKS_TAGS = ["Book"]

PUBLIC_PATHS = [
    '/', 
    '/docs', 
    '/openapi.json', 
    '/redoc',
    '/health',
    f'{API_V1_PREFIX}{USERS_PREFIX}/signup',
    f'{API_V1_PREFIX}{USERS_PREFIX}/login'
] 

UNAUTHORIZED_ACCESS_ERROR_MESSAGE = "You are not authorized to access this book."
FORBIDDEN_ACCESS_ERROR_MESSAGE = "You do not have permission to perform this action on this book."
BOOK_NOT_FOUND_MESSAGE = "Book with id {book_id} is not found."

USER_ALREADY_EXISTS_MESSAGE = "User with {field} '{value}' already registered"
INVALID_CREDENTIALS_MESSAGE = "Incorrect username or password"
USER_CREATION_FAILED_MESSAGE = "User creation failed"

APP_TITLE = "Book Management System"
DEFAULT_USER_ROLE = UserRole.USER
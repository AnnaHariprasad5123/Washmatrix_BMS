from enum import Enum

# User Roles
class UserRole(Enum):
    ADMIN = "admin"
    USER = "user"

# Database Table Names
USERS_TABLE = "users"
BOOKS_TABLE = "book"

# API Routes and Prefixes
API_V1_PREFIX = "/v1"
USERS_PREFIX = "/users"
BOOKS_PREFIX = "/books"
USERS_TAGS = ["users"]
BOOKS_TAGS = ["Book"]

# Public API Paths (no authentication required)
PUBLIC_PATHS = [
    '/', 
    '/docs', 
    '/openapi.json', 
    '/redoc',
    '/health',
    f'{API_V1_PREFIX}{USERS_PREFIX}/signup',
    f'{API_V1_PREFIX}{USERS_PREFIX}/login'
] 

# Book-specific Error Messages
UNAUTHORIZED_ACCESS_ERROR_MESSAGE = "You are not authorized to access this book."
FORBIDDEN_ACCESS_ERROR_MESSAGE = "You do not have permission to perform this action on this book."
BOOK_NOT_FOUND_MESSAGE = "Book with id {book_id} is not found."

# User-specific Error Messages
USER_ALREADY_EXISTS_MESSAGE = "User with {field} '{value}' already registered"
INVALID_CREDENTIALS_MESSAGE = "Incorrect username or password"
USER_CREATION_FAILED_MESSAGE = "User creation failed"

# Application Settings
APP_TITLE = "Book Management System"
DEFAULT_USER_ROLE = UserRole.USER
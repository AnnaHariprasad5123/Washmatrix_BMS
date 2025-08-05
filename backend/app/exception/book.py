from fastapi import status
from app.exception.base import BaseAppException
from app.util.constants import UNAUTHORIZED_ACCESS_ERROR_MESSAGE, FORBIDDEN_ACCESS_ERROR_MESSAGE, BOOK_NOT_FOUND_MESSAGE

class BookNotFoundException(BaseAppException):
    def __init__(self, book_id: int):
        message = BOOK_NOT_FOUND_MESSAGE.format(book_id=book_id)
        super().__init__(message, status.HTTP_404_NOT_FOUND)

class UnauthorizedBookAccessException(BaseAppException):
    def __init__(self):
        headers = {"WWW-Authenticate": "Basic"}
        super().__init__(UNAUTHORIZED_ACCESS_ERROR_MESSAGE, status.HTTP_401_UNAUTHORIZED, headers)

class ForbiddenBookAccessException(BaseAppException):
    def __init__(self):
        super().__init__(FORBIDDEN_ACCESS_ERROR_MESSAGE, status.HTTP_403_FORBIDDEN)
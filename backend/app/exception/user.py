from fastapi import status
from app.exception.base import BaseAppException
from app.util.constants import (
    USER_ALREADY_EXISTS_MESSAGE,
    INVALID_CREDENTIALS_MESSAGE,
    USER_CREATION_FAILED_MESSAGE
)

class UserAlreadyExistsException(BaseAppException):
    def __init__(self, field: str, value: str):
        message = USER_ALREADY_EXISTS_MESSAGE.format(field=field, value=value)
        headers = {"WWW-Authenticate": "Basic"}
        super().__init__(message, status.HTTP_409_CONFLICT, headers)

class InvalidCredentialsException(BaseAppException):
    def __init__(self):
        headers = {"WWW-Authenticate": "Basic"}
        super().__init__(INVALID_CREDENTIALS_MESSAGE, status.HTTP_401_UNAUTHORIZED, headers)

class UserCreationFailedException(BaseAppException):
    def __init__(self, error: str):
        super().__init__(USER_CREATION_FAILED_MESSAGE, status.HTTP_500_INTERNAL_SERVER_ERROR) 
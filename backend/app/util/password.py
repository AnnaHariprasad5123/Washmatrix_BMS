import hashlib
import secrets

def hash_password(password: str) -> str:
    """Hash a password using SHA-256 with salt"""
    salt = secrets.token_hex(16)
    hash_obj = hashlib.sha256()
    hash_obj.update((password + salt).encode('utf-8'))
    return f"{salt}${hash_obj.hexdigest()}"

def verify_password(password: str, hashed_password: str) -> bool:
    """Verify a password against its hash"""
    try:
        salt, hash_value = hashed_password.split('$')
        hash_obj = hashlib.sha256()
        hash_obj.update((password + salt).encode('utf-8'))
        return hash_obj.hexdigest() == hash_value
    except ValueError:
        return False 
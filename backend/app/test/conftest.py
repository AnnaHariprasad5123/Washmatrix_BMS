import pytest
import base64
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.main import app
from app.config.database import get_db
from app.config.database import Base

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(autouse=True)
def test_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

@pytest.fixture
def db_session():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

@pytest.fixture
def test_user():
    user_data = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "testpass123",
        "role": "user"
    }
    response = client.post("/v1/users/signup", json=user_data)
    assert response.status_code == 201, "Failed to create test user"
    user_response = response.json()
    return {
        "user": user_response,
        "password": user_data["password"]
    }

@pytest.fixture
def auth_headers(test_user):
    credentials = f"{test_user['user']['username']}:{test_user['password']}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    return {"Authorization": f"Basic {encoded_credentials}"}

@pytest.fixture
def admin_user():
    user_data = {
        "username": "adminuser",
        "email": "admin@example.com",
        "password": "adminpass123",
        "role": "admin"
    }
    response = client.post("/v1/users/signup", json=user_data)
    assert response.status_code == 201, "Failed to create admin user"
    user_response = response.json()
    return {
        "user": user_response,
        "password": user_data["password"]
    }

@pytest.fixture
def admin_headers(admin_user):
    credentials = f"{admin_user['user']['username']}:{admin_user['password']}"
    encoded_credentials = base64.b64encode(credentials.encode()).decode()
    return {"Authorization": f"Basic {encoded_credentials}"}

@pytest.fixture
def sample_book():
    return {
        "title": "Test Book",
        "author": "Test Author",
        "description": "A test book description",
        "year_published": 2023
    } 
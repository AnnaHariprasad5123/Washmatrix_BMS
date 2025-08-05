from app.test.conftest import client

def test_create_book(admin_headers, sample_book):
    response = client.post("/v1/books/", json=sample_book, headers=admin_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == sample_book["title"]
    assert data["author"] == sample_book["author"]
    assert data["description"] == sample_book["description"]
    assert data["year_published"] == sample_book["year_published"]
    assert "id" in data

def test_get_all_books(auth_headers, sample_book, admin_headers):
    client.post("/v1/books/", json=sample_book, headers=admin_headers)
    response = client.get("/v1/books/", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0

def test_get_book(auth_headers, sample_book, admin_headers):
    create_response = client.post("/v1/books/", json=sample_book, headers=admin_headers)
    book_id = create_response.json()["id"]
    response = client.get(f"/v1/books/{book_id}", headers=auth_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == book_id
    assert data["title"] == sample_book["title"]

def test_get_book_not_found(auth_headers):
    response = client.get("/v1/books/999", headers=auth_headers)
    assert response.status_code == 404

def test_update_book(admin_headers, sample_book):
    create_response = client.post("/v1/books/", json=sample_book, headers=admin_headers)
    book_id = create_response.json()["id"]
    update_data = {"title": "Updated Book Title"}
    response = client.put(f"/v1/books/{book_id}", json=update_data, headers=admin_headers)
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "Updated Book Title"
    assert data["author"] == sample_book["author"]

def test_update_book_not_found(admin_headers):
    update_data = {"title": "Updated Book Title"}
    response = client.put("/v1/books/999", json=update_data, headers=admin_headers)
    assert response.status_code == 404

def test_delete_book(admin_headers, sample_book):
    create_response = client.post("/v1/books/", json=sample_book, headers=admin_headers)
    book_id = create_response.json()["id"]
    response = client.delete(f"/v1/books/{book_id}", headers=admin_headers)
    assert response.status_code == 200
    data = response.json()
    assert "detail" in data
    assert f"Book with id {book_id} is deleted" in data["detail"]

def test_delete_book_not_found(admin_headers):
    response = client.delete("/v1/books/999", headers=admin_headers)
    assert response.status_code == 404

def test_create_book_unauthorized(sample_book):
    response = client.post("/v1/books/", json=sample_book)
    assert response.status_code == 401

def test_get_books_unauthorized():
    response = client.get("/v1/books/")
    assert response.status_code == 401

def test_get_book_unauthorized():
    response = client.get("/v1/books/1")
    assert response.status_code == 401

def test_update_book_unauthorized(sample_book):
    response = client.put("/v1/books/1", json=sample_book)
    assert response.status_code == 401

def test_delete_book_unauthorized():
    response = client.delete("/v1/books/1")
    assert response.status_code == 401

def test_user_cannot_create_book(auth_headers, sample_book):
    response = client.post("/v1/books/", json=sample_book, headers=auth_headers)
    assert response.status_code == 403

def test_user_cannot_update_book(auth_headers, sample_book, admin_headers):
    create_response = client.post("/v1/books/", json=sample_book, headers=admin_headers)
    book_id = create_response.json()["id"]
    update_data = {"title": "Updated Book Title"}
    response = client.put(f"/v1/books/{book_id}", json=update_data, headers=auth_headers)
    assert response.status_code == 403

def test_user_cannot_delete_book(auth_headers, sample_book, admin_headers):
    create_response = client.post("/v1/books/", json=sample_book, headers=admin_headers)
    book_id = create_response.json()["id"]
    response = client.delete(f"/v1/books/{book_id}", headers=auth_headers)
    print("Status Code:", response.status_code)
    print("Response Body:", response.text)
    assert response.status_code == 403
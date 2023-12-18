# Library API Documentation

## Authentication

### User Login

- **Endpoint:** `/auth/login`
- **Description:** Authenticate user and generate JWT token.
- **Request:**
  - Method: POST
  - Headers:
    - Content-Type: application/json
  - Body:
    - email (string)
    - password (string)
- **Response:**
  - Success: 200 OK
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - Error: 401 Unauthorized

## Users

### Get All Users

- **Endpoint:** `/api/users`
- **Description:** Get a list of all users.
- **Request:**
  - Method: GET
  - Headers:
    - Authorization: Bearer {token}
- **Response:**
  - Success: 200 OK
    ```json
    [
      {
        "userId": 1,
        "username": "john_doe",
        "email": "john.doe@example.com",
        "role": "user"
      },
      {
        "userId": 2,
        "username": "jane_doe",
        "email": "jane.doe@example.com",
        "role": "admin"
      }
    ]
    ```
  - Error: 401 Unauthorized

### Create New User

- **Endpoint:** `/api/users`
- **Description:** Create a new user.
- **Request:**
  - Method: POST
  - Headers:
    - Authorization: Bearer {token}
    - Content-Type: application/json
  - Body:
    - username (string)
    - email (string)
    - password (string)
- **Response:**
  - Success: 201 Created
    ```json
    {
      "userId": 3,
      "username": "bob_smith",
      "email": "bob.smith@example.com",
      "role": "user"
    }
    ```
  - Error: 400 Bad Request

## Books

### Get All Books

- **Endpoint:** `/api/books`
- **Description:** Get a list of all books.
- **Request:**
  - Method: GET
  - Headers:
    - Authorization: Bearer {token}
- **Response:**
  - Success: 200 OK
    ```json
    [
      {
        "bookId": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "genre": "Fiction",
        "publicationYear": 1925,
        "availableCopies": 5
      },
      {
        "bookId": 2,
        "title": "To Kill a Mockingbird",
        "author": "Harper Lee",
        "genre": "Classics",
        "publicationYear": 1960,
        "availableCopies": 3
      }
    ]
    ```
  - Error: 401 Unauthorized

### Create New Book

- **Endpoint:** `/api/books`
- **Description:** Create a new book.
- **Request:**
  - Method: POST
  - Headers:
    - Authorization: Bearer {token}
    - Content-Type: application/json
  - Body:
    - title (string)
    - author (string)
    - genre (string)
    - publicationYear (integer)
- **Response:**
  - Success: 201 Created
    ```json
    {
      "bookId": 3,
      "title": "1984",
      "author": "George Orwell",
      "genre": "Dystopian",
      "publicationYear": 1949,
      "availableCopies": 2
    }
    ```
  - Error: 400 Bad Request

## Loans

### Get All Loans

- **Endpoint:** `/api/loans`
- **Description:** Get a list of all loans.
- **Request:**
  - Method: GET
  - Headers:
    - Authorization: Bearer {token}
- **Response:**
  - Success: 200 OK
    ```json
    [
      {
        "loanId": 1,
        "userId": 1,
        "bookId": 1,
        "createdAt": "2023-12-18T12:00:00Z",
        "updatedAt": "2023-12-18T12:00:00Z"
      },
      {
        "loanId": 2,
        "userId": 2,
        "bookId": 2,
        "createdAt": "2023-12-18T13:00:00Z",
        "updatedAt": "2023-12-18T13:00:00Z"
      }
    ]
    ```
  - Error: 401 Unauthorized

### Create New Loan

- **Endpoint:** `/api/loans`
- **Description:** Create a new loan.
- **Request:**
  - Method: POST
  - Headers:
    - Authorization: Bearer {token}
    - Content-Type: application/json
  - Body:
    - userId (integer)
    - bookId (integer)
- **Response:**
  - Success: 201 Created
    ```json
    {
      "loanId": 3,
      "userId": 3,
      "bookId": 3,
      "createdAt": "2023-12-18T14:00:00Z",
      "updatedAt": "2023-12-18T14:00:00Z"
    }
    ```
  - Error: 400 Bad Request

...


# Book API Spec

## Get All Books

Endpoint : GET /api/books

Response Body Success:

```json
{
    "data": [
        {
            "code": "JK-45",
            "title": "Harry Potter",
            "author": "J.K Rowling",
            "stock": 1
        },
        {
            "code": "SHR-1",
            "title": "A Study in Scarlet",
            "author": "Arthur Conan Doyle",
            "stock": 1
        },
        {
            "code": "TW-11",
            "title": "Twilight",
            "author": "Stephenie Meyer",
            "stock": 1
        },
        {
            "code": "HOB-83",
            "title": "The Hobbit, or There and Back Again",
            "author": "J.R.R. Tolkien",
            "stock": 1
        },
        {
            "code": "NRN-7",
            "title": "The Lion, the Witch and the Wardrobe",
            "author": "C.S. Lewis",
            "stock": 1
        }
    ]
}
```

Response Body Error :

```json
{
    "errors": "Books is not found"
}
```

## Borrow Book

Endpoint : POST /api/books/:bookCode/borrowings/:memberCode

Request Body :

```json
{
    "borrowDate": "2024-09-13"
}
```

Response Body Success :

```json
{
    "data": {
        "id": 23,
        "memberCode": "M002",
        "bookCode": "SHR-1",
        "borrowDate": "2024-09-13T00:00:00.000Z"
    }
}
```

Response Body Error :

```json
{
    "errors": "Member is not found"
}
```

```json
{
    "errors": "Member is under penalty"
}
```

```json
{
    "errors": "Book is not found"
}
```

```json
{
    "errors": "Book is out of stock"
}
```

```json
{
    "errors": "Member has already borrowed 2 books"
}
```

```json
{
    "errors": "Member has already borrowed this book and has not returned it"
}
```

## Return Borrow Book

Endpoint : PATCH /api/books/:bookCode/borrowings/:memberCode

Request Body :

```json
{
    "returnDate": "2024-09-20"
}
```

Response Body Success :

```json
{
    "data": {
        "id": 23,
        "memberCode": "M002",
        "bookCode": "SHR-1",
        "borrowDate": "2024-09-20T00:00:00.000Z"
    }
}
```

Response Body Error :

```json
{
    "errors": "Borrowing record not found"
}
```

```json
{
    "errors": "Borrowing date cannot be later than return date"
}
```

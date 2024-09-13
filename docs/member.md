# Member API Spec

## Get All Members

Endpoint : GET /api/members

<!-- Headers :

-   Authorization : token -->

Response Body Success:

```json
{
    "data": [
        {
            "code": "M001",
            "name": "Angga",
            "penalty": false,
            "borrowedBooks": 1
        },
        {
            "code": "M002",
            "name": "Ferry",
            "penalty": false,
            "borrowedBooks": 0
        },
        {
            "code": "M003",
            "name": "Putri",
            "penalty": false,
            "borrowedBooks": 0
        }
    ]
}
```

Response Body Error :

```json
{
    "errors": "Members is not found"
}
```

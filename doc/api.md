# API

| Endpoint                        | Method | Description                                      |
|---------------------------------|--------|--------------------------------------------------|
| `/link`                         | PUT    | Links a partial credit card to a customer.       |
| `/match`                        | GET    | Retrieves matching customers based on card details. |

## `/link`

**Method:** PUT

**Description:**  
This endpoint is used to link a partial credit card to a customer. It expects a request body containing the partial credit card information and customer details.

**Request Body:**
```json
{
  "partialCreditCard": {
    "trailingDigits": "string",
    "leadingDigits?": "string",
    "cardType?": "string",
    "startDate?": "string",
    "expiryDate?": "string"
  },
  "customer": {
    "email": "string",
    "firstName": "string"
  }
}
```

**Response:**

- Status Code: 200 OK - If the linking process is successful.

## `/match`

**Method:** GET

**Description:**  
This endpoint is used to retrieve matching customers based on partial credit card details. It expects trailing digits as a query parameter.

**Query Parameters:**  

- `trailingDigits` (required)
- `leadingDigits?`
- `cardType?`
- `startDate?`
- `expiryDate?`

**Response:**

- Status Code: 200 OK - If the request is successful.
- Response Body: An array of matching customer objects. Each customer object has the following properties:
    - `email` (string): The email address of the customer.
    - `firstName` (string): The first name of the customer.
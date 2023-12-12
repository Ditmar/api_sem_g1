# API api/register
# API api/login
# API api/refresh-token
#
## User Authentication API
The User Authentication API provides endpoints for user registration and authentication. Enables secure user account creation, login, token-based authentication to protect sensitive resources, and token refresh.

### Endpoints
1. `POST api/register`
2. `POST api/login`
3. `POST api/refresh-token`


### Endpoint: POST /register
Register a New User
This endpoint only supports the values of name, email and password.
- Request:
{
  "name": "John",
  "email": "john@example.com",
  "password": "securePassword123"
}
- Response:
{
    "response": {
        "acknowledged": true,
        "insertedId": "65634483f029b426103cee70"
    }
}
### Validations 'POST'
- name: username "string" with the following. values A-Za-z0-9áéíóúÁÉÍÓÚñÑ line data _.,
- email: unique for each user "string" with the following: "john@example.com"
- password: user password with the following: 8 characters, among them there must be a numerical value or a literal value

### Endpoint: POST /login
User Login
This endpoint only supports the values of email and password.
- Request:
{
  "email": "john@example.com",
  "password": "securePassword123"
}
- Response:
{
    "message": "logueo exitoso",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjM0NDgzZjAyOWI0MjYxMDNjZWU3MCIsImlhdCI6MTcwMTAwNTkzOCwiZXhwIjoxNzAxMDkyMzM4fQ.hZ_GMd21LPr5XzeX8Ml9OZjRQOUOSN5sOkwOp56ptaM"
}
### Validations 'POST'
- email: of type "string" with the following: "john@example.com"
- password: user password

### Endpoint: POST /refresh-token
refreshes the token once it expires.
- Request:
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjM0NDgzZjAyOWI0MjYxMDNjZWU3MCIsImlhdCI6MTcwMTAwNTkzOCwiZXhwIjoxNzAxMDkyMzM4fQ.hZ_GMd21LPr5XzeX8Ml9OZjRQOUOSN5sOkwOp56ptaM"
}
- Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NjM0NDgzZjAyOWI0MjYxMDNjZWU3MCIsImlhdCI6MTcwMTAwNjQ1MywiZXhwIjoxNzAxMDkyODUzfQ.-AwemhPnmOpl2jhb54Os22vIIpYNqIbXGWO2NJrI_dI"
}

### Validations
- refreshToken: The token is validated if it was signed by the system or not, if it has been altered in the course of its use.
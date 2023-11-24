# Mongoose-assignment

## How to run this application locally

Step 1: Create a env file like this in root directory

```
NODE_ENV = development
PORT = 5000
DATABASE_URL = your database url
BCRYPT_SALT_ROUNDS = 10
```

Step 2: Install all required dependencies

```
npm install
```

Step 3: Start your development server

```
npm run start:dev
```

Now your application is ready to run

## How to use this application

### User Management:

### 1. Create a new user

- Endpoint: **POST /api/users**
- Request Body:

```json
{
  "userId": 1,
  "username": "john_doe",
  "password": "123456",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "age": 30,
  "email": "john.doe@example.com",
  "isActive": true,
  "hobbies": ["reading", "traveling"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }
}
```

- You will back this response

```json
{
  "success": true,
  "message": "User created successfully!",
  "data": {
    "userId": 1,
    "username": "john_doe",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "age": 30,
    "email": "john.doe@example.com",
    "isActive": true,
    "hobbies": ["reading", "traveling"],
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "country": "USA"
    }
  }
}
```

### 2. Retrieve a list of all users

- Endpoint: **GET /api/users**
- Response: List of user objects. Each object contain `username`, `fullName`, `age`, `email`, `address` .

```json
{
  "success": true,
  "message": "Users fetched successfully!",
  "data": [
    {
      "username": "john_doe",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "age": 30,
      "email": "john.doe@example.com",
      "address": {
        "street": "123 Main St",
        "city": "Anytown",
        "country": "USA"
      }
    }
    // more objects...
  ]
}
```

### 3. Retrieve a specific user by ID

- Endpoint: **GET /api/users/:userId**

- Response: You got all the information from user object without password

```json
{
  "success": true,
  "message": "User fetched successfully!",
  "data": {
    "userId": 1,
    "username": "john_doe",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "age": 30,
    "email": "john.doe@example.com",
    "isActive": true,
    "hobbies": ["reading", "traveling"],
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "country": "USA"
    }
  }
}
```

### 4. Update user information

- Endpoint: **PUT /api/users/:userId**

- Request Body: Updated user data (similar structure as in user creation).

```json
{
  "userId": 1,
  "username": "john_doe",
  "password": "123456",
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "age": 30,
  "email": "john.doe@example.com",
  "isActive": true,
  "hobbies": ["reading", "traveling"],
  "address": {
    "street": "123 Main St",
    "city": "Anytown",
    "country": "USA"
  }
}
```

- Response: You will back this type of response without password

```json
{
  "success": true,
  "message": "User updated successfully!",
  "data": {
    "userId": 1,
    "username": "john_doe",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "age": 30,
    "email": "john.doe@example.com",
    "isActive": true,
    "hobbies": ["reading", "traveling"],
    "address": {
      "street": "123 Main St",
      "city": "Anytown",
      "country": "USA"
    }
  }
}
```

### 5. Delete a user

- Endpoint: **DELETE /api/users/:userId**

- Response: You will back this response

```json
{
  "success": true,
  "message": "User deleted successfully!",
  "data": null
}
```

## Order Management:

### 1. Add New Product in Order

If the 'orders' property already exists for a user, append a new product to it. Otherwise, create an 'orders' array within the user object and then add the order data.

- Endpoint: **PUT /api/users/:userId/orders**

- Request Body:

```json
{
  "productName": "string",
  "price": "number",
  "quantity": "number"
}
```

- Response:

```json
{
  "success": true,
  "message": "Order created successfully!",
  "data": null
}
```

### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**

- Response:

```json
{
  "success": true,
  "message": "Order fetched successfully!",
  "data": {
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
```

### 3. **Calculate Total Price of Orders for a Specific User**

- Endpoint: **GET /api/users/:userId/orders/total-price**
- Response:

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 454.32
  }
}
```

### 2. Retrieve all orders for a specific user

- Endpoint: **GET /api/users/:userId/orders**

- Response: List of order objects for the specified user or, If you can't find information about the user, show a clear message. Use either `instance` or `static` method to determine if the user exist or not. (Use the [format for error messages](#sample-error-response) that is given below.)

```json
{
  "success": true,
  "message": "Order fetched successfully!",
  "data": {
    "orders": [
      {
        "productName": "Product 1",
        "price": 23.56,
        "quantity": 2
      },
      {
        "productName": "Product 2",
        "price": 23.56,
        "quantity": 5
      }
    ]
  }
}
```

### 3. **Calculate Total Price of Orders for a Specific User**

- Endpoint: **GET /api/users/:userId/orders/total-price**
- Response:

```json
{
  "success": true,
  "message": "Total price calculated successfully!",
  "data": {
    "totalPrice": 454.32
  }
}
```

**If you are trying to find a user you will get this response if the user does not exist**

```json
{
  "success": false,
  "message": "User not found",
  "error": {
    "code": 404,
    "description": "User not found!"
  }
}
```

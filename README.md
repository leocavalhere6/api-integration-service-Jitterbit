# API Integration Service – Jitterbit

This project implements a simple **Order API** that receives orders and stores them in a **PostgreSQL database**.

The service exposes REST endpoints to create and retrieve orders, following a layered architecture:

Controller → Service → Repository

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Docker & Docker Compose
- Jest + Supertest (integration tests)

---

## Project Structure

```
src
 ├── controllers
 ├── services
 ├── repositories
 ├── routes
 ├── database
 └── middlewares

test
```

The application follows a layered architecture separating responsibilities between routing, business logic, and data persistence.

---

## Running the Project

### 1. Start the database

```bash
cp .env.develop .env
docker compose up -d
```

This will start a PostgreSQL container used by the application.

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the API

```bash
node server.js
```

The server will start at:

```
http://localhost:3000
```

---

## Running Tests

```bash
npm test
```

The tests use **Jest** and **Supertest** to validate API endpoints.

---

## Example Request

Create a new order:

```bash
curl -X POST http://localhost:3000/order \
-H "Content-Type: application/json" \
-d '{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.5299601+00:00",
  "items": [
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}'
```

Example response:

```json
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 1000
    }
  ]
}
```

---

## Health Check

You can verify the API is running:

```
GET /
```

Response:

```json
{
  "message": "Order API running"
}
```

# API Integration Service – Jitterbit

Backend service that exposes a REST API to manage orders and items, persisting data in a PostgreSQL database.

The application follows a layered architecture to separate responsibilities and keep the code maintainable.

Architecture:

Controller → Service → Repository

---

## Overview

This project implements an Order API that:

• Receives orders via REST endpoints
• Transforms incoming JSON into the internal model
• Persists data in PostgreSQL
• Secures endpoints with JWT authentication
• Provides interactive documentation via Swagger
• Includes automated integration tests

## Checklist de Avaliação – API de Pedidos

### Funcionalidade mínima

- [x] CRUD completo de pedidos implementado (`POST`, `GET`, `PUT`, `DELETE`)
- [x] Transformação de JSON de entrada para formato do banco
- [x] Persistência no PostgreSQL (`Order` e `Items`)

### Código e organização

- [x] Estrutura de pastas clara e modular
- [x] Código comentado e legível
- [x] Convenções de nomenclatura seguidas (camelCase e PascalCase)

### Tratamento de erros

- [x] Middleware global de erros (`errorHandler.js`)
- [x] Mensagens de erro compreensíveis
- [x] Status HTTP corretos (404, 500, 201, 200, 204)

### Testes

- [x] Testes de integração com Jest + Supertest
- [x] Todos os testes passando ✅

### Segurança e documentação

- [x] Autenticação JWT implementada
- [x] Swagger disponível em `/api-docs` para testar endpoints

### GitHub

- [x] Repositório público com commits claros e organizados

---

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Docker & Docker Compose
- Jest
- Supertest
- Swagger

---

## Quick Start (30 seconds)

Clone the repository and start the project locally:

```bash
git clone <repository-url>
cd api-integration-service-jitterbit
```

Start the database:

```bash
cp .env.develop .env
docker compose up -d
```

Install dependencies:

```bash
npm install
```

Run the API:

```bash
node server.js
```

The server will start at:

http://localhost:3000

Swagger documentation:

http://localhost:3000/api-docs

---

## Project Structure

```
api-integration-service-jitterbit
├── package-lock.json
├── package.json
├── server.js
├── src
│   ├── app.js
│   ├── config
│   │   ├── connection.js
│   │   └── swagger.js
│   ├── controllers
│   │   └── orderController.js
│   ├── errors
│   │   └── AppError.js
│   ├── middlewares
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── validateOrder.js
│   ├── models
│   │   └── orderModel.js
│   ├── repositories
│   │   └── orderRepository.js
│   ├── routes
│   │   ├── authRoutes.js
│   │   └── orderRoutes.js
│   ├── services
│   │   └── orderService.js
│   └── utils
│       └── orderMapper.js
└── test
    ├── app.test.js
    ├── auth.test.js
    ├── order.integration.test.js
    └── order.test.js
```

The structure separates routing, business logic, and data persistence into different layers.

---

## Running Tests

Run integration tests with:

```bash
npm test
```

Tests are implemented using Jest and Supertest.

---

## API Documentation

Interactive API documentation is available through Swagger.

After starting the server, open:

http://localhost:3000/api-docs

Swagger allows testing endpoints directly from the browser.

---

## Example Request

Create a new order:

```bash
curl -X POST http://localhost:3000/order \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <TOKEN>" \
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

You can verify if the API is running:

```
GET /
```

Response:

```json
{
  "message": "Order API running"
}
```

---

## Evaluation Checklist

### Minimum functionality

- CRUD for orders (`POST`, `GET`, `PUT`, `DELETE`)
- Input JSON transformation
- Persistence in PostgreSQL

### Code quality

- Modular folder structure
- Readable and documented code
- Naming conventions applied

### Error handling

- Global error handler middleware
- Meaningful error messages
- Proper HTTP status codes

### Tests

- Integration tests with Jest + Supertest
- All tests passing

### Security & documentation

- JWT authentication implemented
- Swagger documentation available

### Repository

- Clear and organized commits

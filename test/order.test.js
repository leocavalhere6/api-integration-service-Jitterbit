const request = require("supertest");
const app = require("../src/app");

let token;

beforeAll(async () => {
  const response = await request(app).post("/auth/login").send({
    username: "admin",
    password: "1234",
  });

  token = response.body.token;
});

describe("Orders API", () => {
  const orderPayload = {
    numeroPedido: `test-order-${Date.now()}`,
    valorTotal: 5000,
    dataCriacao: "2023-07-19T12:24:11.5299601+00:00",
    items: [
      {
        idItem: "2434",
        quantidadeItem: 2,
        valorItem: 1000,
      },
    ],
  };

  it("should create a new order", async () => {
    const response = await request(app)
      .post("/order")
      .set("Authorization", `Bearer ${token}`)
      .send(orderPayload);

    expect(response.statusCode).toBe(201);
  });

  it("should return 401 when token is missing", async () => {
    const response = await request(app).post("/order").send(orderPayload);

    expect(response.statusCode).toBe(401);
  });
});

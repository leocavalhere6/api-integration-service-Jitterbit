const request = require("supertest");
const app = require("../src/app");

let token;
let orderId;

describe("Full Orders API Integration", () => {
  const orderPayload = {
    numeroPedido: `order-${Date.now()}`,
    valorTotal: 10000,
    dataCriacao: "2023-07-19T12:24:11.5299601+00:00",
    items: [
      {
        idItem: "2434",
        quantidadeItem: 1,
        valorItem: 1000,
      },
    ],
  };

  /**
   * Authenticate before tests
   */
  beforeAll(async () => {
    const response = await request(app).post("/auth/login").send({
      username: "admin",
      password: "1234",
    });

    token = response.body.token;
  });

  /**
   * CREATE ORDER
   */
  it("should create a new order", async () => {
    const response = await request(app)
      .post("/order")
      .set("Authorization", `Bearer ${token}`)
      .send(orderPayload);

    expect(response.statusCode).toBe(201);

    orderId = orderPayload.numeroPedido;
  });

  /**
   * GET ORDER BY ID
   */
  it("should get order by id", async () => {
    const response = await request(app)
      .get(`/order/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.orderid || response.body.orderId).toBeDefined();
  });

  /**
   * LIST ORDERS
   */
  it("should list orders", async () => {
    const response = await request(app)
      .get("/order/list")
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  /**
   * UPDATE ORDER
   */
  it("should update an order", async () => {
    const updatedPayload = {
      numeroPedido: orderId,
      valorTotal: 20000,
      dataCriacao: "2023-07-19T12:24:11.5299601+00:00",
      items: [
        {
          idItem: "2434",
          quantidadeItem: 2,
          valorItem: 2000,
        },
      ],
    };

    const response = await request(app)
      .put(`/order/${orderId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedPayload);

    expect(response.statusCode).toBe(200);
  });

  /**
   * DELETE ORDER
   */
  it("should delete the order", async () => {
    const response = await request(app)
      .delete(`/order/${orderId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(204);
  });
});

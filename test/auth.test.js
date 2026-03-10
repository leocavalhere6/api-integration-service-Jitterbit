const request = require("supertest");
const app = require("../src/app");

describe("Authentication API", () => {
  it("should return a JWT token when credentials are valid", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "admin",
      password: "1234",
    });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return 401 for invalid credentials", async () => {
    const response = await request(app).post("/auth/login").send({
      username: "wrong",
      password: "wrong",
    });

    expect(response.statusCode).toBe(401);
  });
});

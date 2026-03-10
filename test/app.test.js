const request = require("supertest");
const app = require("../src/app");

describe("API Integration Service", () => {
  describe("Health Check", () => {
    it("should return 200 when calling root endpoint", async () => {
      const response = await request(app).get("/");

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe("Order API running");
    });

    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/unknown");

      expect(response.statusCode).toBe(404);
    });
  });
});

import request from "supertest";
import app from "../app.js";

describe("[APP] General Test", () => {
  test("should show error 404", async () => {
    const resp = await request(app).post("/api/v1/auth/login").send({
      email: "test@test.io",
      password: "q3123123",
    });
    expect(resp.statusCode).toEqual(404);
  });
  test("should show error 401", async () => {
    const resp = await request(app).post("/api/v1/auth/login").send({
      email: "henry@henry.com",
      password: "q3123123",
    });
    expect(resp.statusCode).toEqual(401);
  });
});

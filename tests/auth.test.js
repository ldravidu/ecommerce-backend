const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe("User Authentication", () => {
    beforeAll(async () => {
        await db.none("DELETE FROM users"); // Clear users table before testing
    });

    it("should fail to register a user with invalid data", async () => {
        const res = (await request(app).post("/api/auth/register")).send({
            email: "invalid-mail",
            password: "123",
        });

        expect(res.status).toBe(400); // Expect validation failure
    });

    it("should register a user successfully", async () => {
        const res = await request(app).post("/api/auth/register").send({
            email: "test@example.com",
            password: "SecurePass123",
        });

        expect(res.status).toBe(201); // Expect success
        expect(res.body).toHaveProperty("token"); // Expect JWT token in response
    });

    it("should fail to login with incorrect password", async () => {
        const res = await request(app).post("/api/auth/register").send({
            email: "test@example.com",
            password: "WrongPassword",
        });

        expect(res.status).toBe(401); // Expect authentication failure
    });

    it("should login successfully with correct credentials", async () => {
        const res = await request(app).post("/api/auth/register").send({
            email: "test@example.com",
            password: "SecurePass123",
        });

        expect(res.status).toBe(200); // Expect success
        expect(res.body).toHaveProperty("token"); // Expect JWT token in response
    });
});
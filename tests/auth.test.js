const request = require("supertest");
const app = require("../app");
const db = require("../db");

describe("User Authentication", () => {
    beforeAll(async () => {
        // Create users table if it doesn't exist
        await db.none(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role VARCHAR(50) DEFAULT 'customer'
            )
        `);
    });

    beforeEach(async () => {
        await db.none("DELETE FROM users"); // Clear users table before each test
    });

    afterAll(async () => {
        await db.$pool.end(); // Close database connection after tests
    })

    it("should fail to register a user with invalid data", async () => {
        const res = await request(app).post("/api/auth/register").send({
            email: "invalid-email",
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
        await request(app).post("/api/auth/register").send({
            email: "test@example.com",
            password: "SecurePass123",
        });
        
        const res = await request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "WrongPassword",
        });

        expect(res.status).toBe(401); // Expect authentication failure
    });

    it("should login successfully with correct credentials", async () => {
        await request(app).post("/api/auth/register").send({
            email: "test@example.com",
            password: "SecurePass123",
        });

        const res = await request(app).post("/api/auth/login").send({
            email: "test@example.com",
            password: "SecurePass123",
        });

        expect(res.status).toBe(200); // Expect success
        expect(res.body).toHaveProperty("token"); // Expect JWT token in response
    });
});
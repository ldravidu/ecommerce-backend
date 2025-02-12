require("dotenv").config();
const db = require("../db"); // Import database connection

describe("Database Connection", () => {
    afterAll(async () => {
        await db.$pool.end(); // Close the database connection pool
    });
    
    it("should connect to the database successfully", async () => {
        try {
            const result = await db.one("SELECT 1 AS value"); // Test query
            expect(result.value).toBe(1);
        } catch (error) {
            throw new Error("Database connection failed"); // Test should fail if it cannot connect to the database            
        }
    });
});
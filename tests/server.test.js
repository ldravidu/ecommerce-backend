const request = require("supertest"); // Import Supertest to test HTTP requests
const app = require("../server"); // Import Express framework

// Describe the test suite for the GET / endpoint
describe("GET /", () => {
    it("should return a welcome message", async() => {
        // Send a GET request to the root URL
        const res = await request(app).get("/");

        // Check if the response status code is 200 (OK)
        expect(res.statusCode).toEqual(200);

        // Check if the response body matches the expected text
        expect(res.text).toBe("E-commerce API is running!");
    });
});

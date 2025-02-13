const express = require("express");
const app = express();
require("dotenv").config(); // Load environment variables

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("E-commerce API is running!");
});

// Import authentication routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Export the app
module.exports = app;

// Start server
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
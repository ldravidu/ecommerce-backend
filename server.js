const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.send("E-commerce API is running!");
});

// Export the app
module.exports = app;

// Start server
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
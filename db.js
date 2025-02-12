// Load environment variables
require("dotenv").config();

const pgp = require("pg-promise")(); // Import pg-promise

// Define database connection configuration
const db = pgp({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

// Export the database instance for use in other files
module.exports = db;
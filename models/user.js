// User Model

const db = require("../db");
const bcrypt = require("bcryptjs");

class User {
    static async create(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        return db.one("INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id, email", [email, hashedPassword]);
    }

    static async findByEmail(email) {
        return db.oneOrNone("SELECT * FROM users WHERE email = $1", [email]);
    }
}

module.exports = User;
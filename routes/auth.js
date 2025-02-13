const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");

const router = express.Router();

// User registration
router.post(
    "/register",
    [
        body("email").isEmail().withMessage("Invalid email format"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }       

        const { email, password } = req.body;
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const newUser = await User.create(email, password);
        const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ token });
    }
);

// User login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findByEmail(email);
    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
});

module.exports = router;
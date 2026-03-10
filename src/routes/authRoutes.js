/**
 * Simple authentication route that generates a JWT token.
 */

const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const SECRET = "my-secret-key";

/**
 * POST /login
 */
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, SECRET, {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  return res.status(401).json({
    error: "Invalid credentials",
  });
});

module.exports = router;

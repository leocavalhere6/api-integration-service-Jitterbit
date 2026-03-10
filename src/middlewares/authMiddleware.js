/**
 * Simple JWT authentication middleware.
 */

const jwt = require("jsonwebtoken");

const SECRET = "my-secret-key";

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token not provided",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
};

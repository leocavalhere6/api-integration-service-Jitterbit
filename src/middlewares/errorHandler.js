/**
 * Global error handling middleware.
 * Responsible for returning consistent error responses.
 */

const AppError = require("../errors/AppError");

module.exports = (err, req, res, next) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
};

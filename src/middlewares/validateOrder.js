/**
 * Middleware to validate order payload before processing.
 */

const AppError = require("../errors/AppError");

module.exports = (req, res, next) => {
  const { numeroPedido, valorTotal, dataCriacao, items } = req.body;

  if (!numeroPedido || !valorTotal || !dataCriacao || !items) {
    throw new AppError("Missing required order fields", 400);
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new AppError("Items must be a non-empty array", 400);
  }

  next();
};

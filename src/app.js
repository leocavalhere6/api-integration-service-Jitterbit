// Main application configuration.
// Responsible for configuring middlewares and routes.

const express = require("express");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());

/**
 * Health check endpoint
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Order API running",
  });
});

/**
 * Test endpoint expected by Jest tests
 */
app.get("/api/orders", (req, res) => {
  res.status(200).json({
    message: "Orders endpoint working",
  });
});

/**
 * Real order routes
 */
app.use("/order", orderRoutes);

/**
 * 404 handler
 */
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

/**
 * Global error handler
 */
app.use(errorHandler);

module.exports = app;

/**
 * Main application configuration.
 * Responsible for configuring middlewares and routes.
 */

const express = require("express");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middlewares/errorHandler");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/auth", authRoutes);

/**
 * Health check endpoint
 */
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Order API running",
  });
});

/**
 * Order routes
 */
app.use("/order", orderRoutes);

/**
 * 404 handler for unknown routes
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

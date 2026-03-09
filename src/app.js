/**
 * Main application configuration.
 * Responsible for configuring middlewares and routes.
 */

const express = require("express");
const orderRoutes = require("./routes/orderRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

/**
 * Middleware responsible for parsing JSON request bodies.
 */
app.use(express.json());

/**
 * Application routes
 */
app.use("/order", orderRoutes);

/**
 * Global error handler middleware
 */
app.use(errorHandler);

module.exports = app;

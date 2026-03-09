/**
 * Order routes definition.
 * Maps HTTP endpoints to controller methods.
 */

const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/", orderController.createOrder);

router.get("/:id", orderController.getOrder);

router.get("/list/all", orderController.listOrders);

router.put("/:id", orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;

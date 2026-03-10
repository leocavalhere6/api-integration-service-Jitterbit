/**
 * Order routes definition.
 * Maps HTTP endpoints to controller methods.
 */

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Order created successfully
 */

const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");
const validateOrder = require("../middlewares/validateOrder");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware);

router.post("/", validateOrder, orderController.createOrder);

router.get("/list", orderController.listOrders);

router.get("/:id", orderController.getOrder);

router.put("/:id", validateOrder, orderController.updateOrder);

router.delete("/:id", orderController.deleteOrder);

module.exports = router;

/**
 * Order controller.
 * Responsible for handling HTTP requests and responses.
 */

const orderService = require("../services/orderService");

exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrder(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
};

exports.listOrders = async (req, res, next) => {
  try {
    const orders = await orderService.listOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const updated = await orderService.updateOrder(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

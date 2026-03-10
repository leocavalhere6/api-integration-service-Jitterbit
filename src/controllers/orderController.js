/**
 * Controller responsible for handling HTTP requests related to orders.
 */

const orderService = require("../services/orderService");

exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);

    res.status(201).json({
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    next(error);
  }
};

exports.getOrder = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id);

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
};

exports.listOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAllOrders();

    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);

    res.status(200).json({
      message: "Order updated successfully",
      data: order,
    });
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
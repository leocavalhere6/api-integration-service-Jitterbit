/**
 * Service responsible for business logic related to orders.
 */

const orderRepository = require("../repositories/orderRepository");
const mapExternalOrderToInternal = require("../utils/orderMapper");
const AppError = require("../errors/AppError");

exports.createOrder = async (orderPayload) => {
  const mappedOrder = mapExternalOrderToInternal(orderPayload);

  const existingOrder = await orderRepository.findById(mappedOrder.orderId);

  if (existingOrder) {
    throw new AppError("Order already exists", 409);
  }

  return orderRepository.createOrder(mappedOrder);
};

exports.getOrderById = async (orderId) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return order;
};

exports.getAllOrders = async () => {
  return orderRepository.findAllOrders();
};

exports.updateOrder = async (orderId, orderPayload) => {
  const mappedOrder = mapExternalOrderToInternal(orderPayload);

  const order = await orderRepository.findById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return orderRepository.updateOrder(orderId, mappedOrder);
};

exports.deleteOrder = async (orderId) => {
  const order = await orderRepository.findById(orderId);

  if (!order) {
    throw new AppError("Order not found", 404);
  }

  return orderRepository.deleteOrder(orderId);
};

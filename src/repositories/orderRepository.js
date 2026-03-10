//Repository responsible for data persistence.
//In this initial version we use in-memory storage.

const orders = [];

exports.create = async (order) => {
  orders.push(order);
  return order;
};

exports.findById = async (id) => {
  return orders.find((o) => o.orderId === id);
};

exports.findAll = async () => {
  return orders;
};

exports.update = async (id, updatedOrder) => {
  const index = orders.findIndex((o) => o.orderId === id);

  if (index === -1) {
    throw new Error("Order not found");
  }

  orders[index] = updatedOrder;

  return updatedOrder;
};

exports.remove = async (id) => {
  const index = orders.findIndex((o) => o.orderId === id);

  if (index === -1) {
    throw new Error("Order not found");
  }

  orders.splice(index, 1);
};

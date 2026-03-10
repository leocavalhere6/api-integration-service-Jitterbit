// Order domain model.
// Represents the structure of an order.

class Order {
  constructor(orderId, value, creationDate, items) {
    this.orderId = orderId;
    this.value = value;
    this.creationDate = creationDate;
    this.items = items;
  }
}

module.exports = Order;

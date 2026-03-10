/**
 * Order service layer.
 * Contains business logic and data transformation.
 */

const orderRepository = require("../repositories/orderRepository");

//Transform input JSON into database format.

function mapOrderData(input) {
  return {
    orderId: input.numeroPedido,
    value: input.valorTotal,
    creationDate: new Date(input.dataCriacao),
    items: input.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}

exports.createOrder = async (data) => {
  const mappedOrder = mapOrderData(data);
  return orderRepository.create(mappedOrder);
};

exports.getOrder = async (id) => {
  return orderRepository.findById(id);
};

exports.listOrders = async () => {
  return orderRepository.findAll();
};

exports.updateOrder = async (id, data) => {
  const mappedOrder = mapOrderData(data);
  return orderRepository.update(id, mappedOrder);
};

exports.deleteOrder = async (id) => {
  return orderRepository.remove(id);
};

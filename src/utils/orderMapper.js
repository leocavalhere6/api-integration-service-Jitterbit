/**
 * Maps external API payload fields to the internal database format.
 */

function mapExternalOrderToInternal(orderPayload) {
  return {
    orderId: orderPayload.numeroPedido,
    value: orderPayload.valorTotal,
    creationDate: new Date(orderPayload.dataCriacao),

    items: orderPayload.items.map((item) => ({
      productId: Number(item.idItem),
      quantity: item.quantidadeItem,
      price: item.valorItem,
    })),
  };
}

module.exports = mapExternalOrderToInternal;

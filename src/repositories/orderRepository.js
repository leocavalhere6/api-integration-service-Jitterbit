/**
 * Repository responsible for database operations related to orders.
 */

const db = require("../config/connection");

exports.createOrder = async (order) => {
  const client = await db.connect();

  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO "Order" (orderId, value, creationDate)
       VALUES ($1, $2, $3)`,
      [order.orderId, order.value, order.creationDate],
    );

    for (const item of order.items) {
      await client.query(
        `INSERT INTO Items (orderId, productId, quantity, price)
         VALUES ($1, $2, $3, $4)`,
        [order.orderId, item.productId, item.quantity, item.price],
      );
    }

    await client.query("COMMIT");

    return order;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

exports.findById = async (orderId) => {
  const orderResult = await db.query(`SELECT * FROM "Order" WHERE orderId=$1`, [
    orderId,
  ]);

  if (orderResult.rows.length === 0) return null;

  const itemsResult = await db.query(`SELECT * FROM Items WHERE orderId=$1`, [
    orderId,
  ]);

  return {
    ...orderResult.rows[0],
    items: itemsResult.rows,
  };
};

exports.findAllOrders = async () => {
  const result = await db.query(`SELECT * FROM "Order"`);
  return result.rows;
};

exports.updateOrder = async (orderId, order) => {
  await db.query(
    `UPDATE "Order"
     SET value=$1, creationDate=$2
     WHERE orderId=$3`,
    [order.value, order.creationDate, orderId],
  );

  return order;
};

exports.deleteOrder = async (orderId) => {
  await db.query(`DELETE FROM Items WHERE orderId=$1`, [orderId]);
  await db.query(`DELETE FROM "Order" WHERE orderId=$1`, [orderId]);
};

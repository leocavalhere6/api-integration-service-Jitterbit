const db = require("../database/connection");

exports.create = async (order) => {
  const { orderId, value, creationDate, items } = order;

  await db.query(
    `INSERT INTO "Order" (orderId, value, creationDate)
     VALUES ($1, $2, $3)`,
    [orderId, value, creationDate],
  );

  for (const item of items) {
    await db.query(
      `INSERT INTO Items (orderId, productId, quantity, price)
       VALUES ($1, $2, $3, $4)`,
      [orderId, item.productId, item.quantity, item.price],
    );
  }

  return order;
};

exports.findById = async (id) => {
  const order = await db.query(`SELECT * FROM "Order" WHERE orderId = $1`, [
    id,
  ]);

  if (order.rows.length === 0) return null;

  const items = await db.query(`SELECT * FROM Items WHERE orderId = $1`, [id]);

  return {
    ...order.rows[0],
    items: items.rows,
  };
};

exports.findAll = async () => {
  const result = await db.query(`SELECT * FROM "Order"`);
  return result.rows;
};

exports.update = async (id, order) => {
  const { value, creationDate } = order;

  await db.query(
    `UPDATE "Order"
     SET value=$1, creationDate=$2
     WHERE orderId=$3`,
    [value, creationDate, id],
  );

  return order;
};

exports.remove = async (id) => {
  await db.query(`DELETE FROM Items WHERE orderId=$1`, [id]);
  await db.query(`DELETE FROM "Order" WHERE orderId=$1`, [id]);
};

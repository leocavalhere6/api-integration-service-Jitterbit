CREATE TABLE IF NOT EXISTS "Order" (
  orderId VARCHAR PRIMARY KEY,
  value NUMERIC,
  creationDate TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Items (
  id SERIAL PRIMARY KEY,
  orderId VARCHAR,
  productId INTEGER,
  quantity INTEGER,
  price NUMERIC,
  FOREIGN KEY (orderId) REFERENCES "Order"(orderId)
);
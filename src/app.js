const express = require("express");
const app = express();
const productsRouter = require("./products/products.router");
const categoriesRouter = require("./categories/categories.router");
const suppliersRouter = require("./suppliers/suppliers.router");

app.use(express.json());

app.use("/api/ping", (_request, response, _next) => {
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
  response.json({ data: "pong!" });
});

app.use("/products", productsRouter);
app.use("/categories", categoriesRouter);
app.use("/suppliers", suppliersRouter);

// Not found handler
app.use((req, res, next) => {
  next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
  console.error(error);
  const { status = 500, message = "Something went wrong!" } = error;
  res.status(status).json({ error: message });
});

module.exports = app;

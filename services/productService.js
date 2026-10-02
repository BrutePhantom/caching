const productDatabase = require("../database/productDatabase");

async function getProducts() {
  return await productDatabase.getProducts();
}

async function getProductById(id) {
  return await productDatabase.getProductById(id);
}

async function createProduct(product) {
  return await productDatabase.createProduct(product);
}

async function updateProduct(id, product) {
  return await productDatabase.updateProduct(id, product);
}

async function deleteProduct(id) {
  return await productDatabase.deleteProduct(id);
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
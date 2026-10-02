const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

const {
  cacheMiddleware,
} = require("../middlewares/cacheMiddleware");

// GET all products
router.get(
  "/products",
  cacheMiddleware,
  productController.getProducts
);

// GET one product
router.get(
  "/products/:id",
  cacheMiddleware,
  productController.getProductById
);

// Create product
router.post(
  "/products",
  productController.createProduct
);

// Replace product
router.put(
  "/products/:id",
  productController.updateProduct
);

// Partially update product
router.patch(
  "/products/:id",
  productController.patchProduct
);

// Delete product
router.delete(
  "/products/:id",
  productController.deleteProduct
);

module.exports = router;
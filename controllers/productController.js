const productService = require("../services/productService");
const {
  setCache,
  clearCache,
} = require("../middlewares/cacheMiddleware");

async function getProducts(req, res) {
  try {
    const products = await productService.getProducts();

    // Store fresh data in cache
    setCache(req.originalUrl, products);

    res.json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get products",
    });
  }
}

async function getProductById(req, res) {
  try {
    const product = await productService.getProductById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Store fresh data in cache
    setCache(req.originalUrl, product);

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to get product",
    });
  }
}

async function createProduct(req, res) {
  try {
    const product = await productService.createProduct(req.body);

    // Data changed → invalidate cache
    clearCache();

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to create product",
    });
  }
}

async function updateProduct(req, res) {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Data changed → invalidate cache
    clearCache();

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
}

async function patchProduct(req, res) {
  try {
    const product = await productService.updateProduct(
      req.params.id,
      req.body
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Data changed → invalidate cache
    clearCache();

    res.json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to update product",
    });
  }
}

async function deleteProduct(req, res) {
  try {
    const product = await productService.deleteProduct(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Data changed → invalidate cache
    clearCache();

    res.json({
      message: "Product deleted successfully",
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete product",
    });
  }
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  patchProduct,
  deleteProduct,
};
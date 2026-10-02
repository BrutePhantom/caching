const fs = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "db.json");

async function getProducts() {
    const data = await fs.readFile(filePath, "utf-8");

    await new Promise((resolve) => {
        setTimeout(resolve, 1500);
    });

    return JSON.parse(data);
}

async function getProductById(id) {
    const products = await getProducts();

    return products.find((product) => product.id === Number(id));
}

async function createProduct(product) {
    const products = await getProducts();

    const newProduct = {
        id: products.length + 1,
        name: product.name,
        price: product.price
    };

    products.push(newProduct);

    await fs.writeFile(
        filePath,
        JSON.stringify(products, null, 2)
    );

    return newProduct;
}

async function updateProduct(id, data) {
    const products = await getProducts();

    const index = products.findIndex(
        (product) => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    products[index].name = data.name || products[index].name;
    products[index].price = data.price || products[index].price;

    await fs.writeFile(
        filePath,
        JSON.stringify(products, null, 2)
    );

    return products[index];
}

async function deleteProduct(id) {
    const products = await getProducts();

    const index = products.findIndex(
        (product) => product.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    const deletedProduct = products[index];

    products.splice(index, 1);

    await fs.writeFile(
        filePath,
        JSON.stringify(products, null, 2)
    );

    return deletedProduct;
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
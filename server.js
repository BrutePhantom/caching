const express = require("express");
const app = express();
const fs = require("fs/promises");
const path = require("path");
PORT = 3000;

const cache = {};

const pathToFile = path.join(__dirname, "db.json");

async function readFile() {
  try {
    let data = await fs.readFile(pathToFile, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

app.get("/products", async (req, res) => {
  try {
    let key = req.url;
    let value = cache[key];
    if (value) {
        res.set("X-Cache","HIT")
      return res.json(value);
    }
    let products = await readFileWithDelay();
    cache[key] = products;
    res.set("X-Cache","MISS")
    res.json(products);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    let { id } = req.params;
    id = Number(id);
    let products = await readFileWithDelay();
    let product = products.find((item) => {
      return item.id === id;
    });
    res.json(product);
  } catch (err) {
    res.status(500).send("server error");
  }
});

async function readFileWithDelay() {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(resolve, 1500);
    });
    let data = await readFile();
    return data;
  } catch (err) {
    console.log(err);
  }
}

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

const express = require("express");

const productRoutes = require("./routes/productRoutes");

const app = express();

const PORT = 3000;

// Middleware to read JSON request body
app.use(express.json());

// Routes
app.use("/", productRoutes);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get("/", (req, res) => {
  res.send("All products"); // Send a response to the client
});

router.get("/add-product", (req, res) => {
  // add.ejs in views folder in the project directory
  res.render("products/add", { title: "Add Product" });
});

router.post("/add-product", async (req, res) => {
  try {
    const { name, price, description, imageUrl, stock, category } = req.body;

    // Validate that all required fields are present
    if (!name || !price || !description || !imageUrl || !stock || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const product = new Product({
      name,
      price,
      description,
      imageUrl,
      stock,
      category,
    });

    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to add product", error: err });
  }
});

module.exports = router;

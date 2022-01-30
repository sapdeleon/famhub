const Product = require("../models/product");

//////////////////////// PRODUCTS SECTION ////////////////////////

Product.createIndexes(); // mongoDB unique ID

// read all items in the inventory
const getAllProducts = async (req, res) => {
  Product.find(
    {},
    { sku: 1, description: 1, type: 1, brand: 1, supplier: 1, date: 1 },
    (err, foundItems) => {
      if (!err) {
        res.render("products", { products: foundItems });
      } else {
        res.send(err);
      }
    }
  );
};

// create new item in the inventory
const createProduct = async (req, res) => {
  const newItem = new Product({
    sku: req.body.sku,
    description: req.body.description,
    type: req.body.type,
    brand: {
      color: req.body.color,
      size: req.body.size,
      name: req.body.brand,
    },
    supplier: req.body.supplier,
    date: new Date(),
  });
  newItem.save((err) => {
    if (!err) {
      res.redirect("products");
    } else {
      res.send(err);
    }
  });
};

// delete all articles
const deleteAllProducts = async (req, res) => {
  Product.deleteMany((err) => {
    if (!err) {
      res.send("Deleted All!");
    } else {
      res.send(err);
    }
  });
};

module.exports = { getAllProducts, createProduct, deleteAllProducts };

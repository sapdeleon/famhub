const Product = require("../models/product");
const Item = require("../models/item");

//////////////////////// ITEM INVENTORY SECTION ////////////////////////

Item.createIndexes();

// read all items in the inventory
const getAllItems = async (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (!err) {
      Product.find({}, (perr, foundProds) => {
        if (!perr) {
          res.render("items", { items: foundItems, products: foundProds });
        }
      });
    } else {
      res.send(err);
    }
  });
};

// create new item in the inventory
const createItem = async (req, res) => {
  const newItem = new Item({
    sku: req.body.sku,
    description: req.body.description,
    supplier: req.body.supplier,
    qty: req.body.qty,
    date: new Date(),
  });
  newItem.save((err) => {
    if (!err) {
      res.redirect("items");
    } else {
      res.send(err);
    }
  });
};

// delete all inventories
const deleteAllItems = async (req, res) => {
  Item.deleteMany((err) => {
    if (!err) {
      res.send("Deleted All!");
    } else {
      res.send(err);
    }
  });
};

module.exports = { getAllItems, createItem, deleteAllItems };

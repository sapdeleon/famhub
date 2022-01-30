const Product = require("../models/product");
const Item = require("../models/item");
const Sale = require("../models/sale");

//////////////////////// SALES SECTION ////////////////////////

// read all items in the sales collection
const getAllSales = async (req, res) => {
  Sale.find({}, (err, foundItems) => {
    if (!err) {
      Product.find({}, (perr, foundProds) => {
        if (!perr) {
          res.render("sales", { sales: foundItems, products: foundProds });
        }
      });
    } else {
      res.send(err);
    }
  });
};

// create new sale item in the sales collection
const createSale = async (req, res) => {
  const newItem = new Sale({
    sku: req.body.sku,
    description: req.body.description,
    cost: req.body.cost,
    qty: req.body.qty,
    total: req.body.cost * req.body.qty,
    date: new Date(),
  });

  newItem.save((err) => {
    if (!err) {
      Item.findOneAndUpdate(
        { sku: req.body.sku },
        { $inc: { qty: -req.body.qty } }
      ).exec();
      Item.findOneAndUpdate(
        { sku: req.body.sku },
        { $currentDate: { date: true } }
      ).exec();
      res.redirect("sales");
    } else {
      res.send(err);
    }
  });
};

// delete all sales
const deleteAllSales = async (req, res) => {
  Sale.deleteMany((err) => {
    if (!err) {
      res.send("Deleted All!");
    } else {
      res.send(err);
    }
  });
};

module.exports = { getAllSales, createSale, deleteAllSales };

//////////////////////// ITEM INVENTORY SECTION ////////////////////////
const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  sku: { type: String, index: true, unique: true, required: true },
  description: { type: String, required: true },
  supplier: { type: String, required: true },
  qty: { type: Number, required: true },
  date: { type: Date },
});

module.exports = mongoose.model("item", itemSchema, "items");

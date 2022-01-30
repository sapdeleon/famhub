const express = require("express");
const router = express.Router();

const {
  getAllSales,
  createSale,
  deleteAllSales,
} = require("../controllers/saleController");

router.route("/").get(getAllSales).post(createSale).delete(deleteAllSales);

module.exports = router;

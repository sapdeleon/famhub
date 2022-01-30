const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  deleteAllProducts,
} = require("../controllers/productController");

router
  .route("/")
  .get(getAllProducts)
  .post(createProduct)
  .delete(deleteAllProducts);

module.exports = router;

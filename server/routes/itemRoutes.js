const express = require("express");
const router = express.Router();

const {
  getAllItems,
  createItem,
  deleteAllItems,
} = require("../controllers/itemController");

router.route("/").get(getAllItems).post(createItem).delete(deleteAllItems);

module.exports = router;

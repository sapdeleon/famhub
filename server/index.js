//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const db = require("./config/dbconfig");
const products = require("./routes/productRoutes");
const items = require("./routes/itemRoutes");
const sales = require("./routes/saleRoutes");

const app = express();

// middleware
app.use(express.json());
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes
app.use("/products", products);
app.use("/items", items);
app.use("/sales", sales);

mongoose
  .connect(db.url, db.options)
  .then(() => console.log("> Successfully connected to DB"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.render("home");
});

//////////////////////// LOGIN SECTION ////////////////////////

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  if (email === "admin@famhub.com" && password === "famhub2020") {
    res.redirect("/items");
  } else {
    res.redirect("/login");
  }
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, () => {
  console.log("Server started on port 3000.");
});

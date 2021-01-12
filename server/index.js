//jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");
const db = require("./config/dbconfig");

mongoose.connect(db.url, db.options)
    .then(() => console.log('> Successfully connected to DB'))
    .catch(err => console.log(err))

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
        res.redirect("/login")
    }
})

//////////////////////// PRODUCTS SECTION ////////////////////////

const productSchema = new mongoose.Schema({
    sku: { type: String, index: true, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    brand: {
        color: { type: String, required: true },
        size: { type: String, required: true },
        name: { type: String, required: true }
    },
    supplier: { type: String, required: true },
    date: { type: Date }
});

const Product = mongoose.model("product", productSchema, "products");

Product.createIndexes(); // mongoDB unique ID

app.route("/products")
    // read all items in the inventory
    .get((req, res) => {
        Product.find({}, { sku: 1, description: 1, type: 1, brand: 1, supplier: 1, date: 1 }, (err, foundItems) => {
            if (!err) { res.render("products", { products: foundItems }); }
            else { res.send(err); }
        });
    })
    // create new item in the inventory
    .post((req, res) => {
        const newItem = new Product({
            sku: req.body.sku,
            description: req.body.description,
            type: req.body.type,
            brand: {
                color: req.body.color,
                size: req.body.size,
                name: req.body.brand
            },
            supplier: req.body.supplier,
            date: new Date()
        });
        newItem.save((err) => {
            if (!err) { res.redirect("products"); }
            else { res.send(err); }
        });
    })
    // delete all articles
    .delete((req, res) => {
        Product.deleteMany((err) => {
            if (!err) { res.send("Deleted All!"); }
            else { res.send(err); }
        });
    });

//////////////////////// ITEM INVENTORY SECTION ////////////////////////

const itemSchema = new mongoose.Schema({
    sku: { type: String, index: true, unique: true, required: true },
    description: { type: String, required: true },
    supplier: { type: String, required: true },
    qty: { type: Number, required: true },
    date: { type: Date }
});

const Item = mongoose.model("item", itemSchema, "items");

Item.createIndexes();

app.route("/items")
    // read all items in the inventory
    .get((req, res) => {
        Item.find({}, (err, foundItems) => {
            if (!err) {
                Product.find({}, (perr, foundProds) => {
                    if (!perr) {
                        res.render("items", { items: foundItems, products: foundProds });
                    }
                });
            }
            else { res.send(err); }
        });
    })
    // create new item in the inventory
    .post((req, res) => {
        const newItem = new Item({
            sku: req.body.sku,
            description: req.body.description,
            supplier: req.body.supplier,
            qty: req.body.qty,
            date: new Date()
        });
        newItem.save((err) => {
            if (!err) { res.redirect("items"); }
            else { res.send(err); }
        });
    })
    // delete all inventories
    .delete((req, res) => {
        Item.deleteMany((err) => {
            if (!err) { res.send("Deleted All!"); }
            else { res.send(err); }
        });
    });

//////////////////////// SALES SECTION ////////////////////////

const saleSchema = new mongoose.Schema({
    sku: { type: String, required: true },
    description: { type: String, required: true },
    cost: { type: Number, required: true },
    qty: { type: Number, required: true },
    total: { type: Number },
    date: { type: Date, default: Date.now }
});

const Sale = mongoose.model("sale", saleSchema, "sales");

app.route("/sales")
    // read all items in the sales collection
    .get((req, res) => {
        Sale.find({}, (err, foundItems) => {
            if (!err) {
                Product.find({}, (perr, foundProds) => {
                    if (!perr) {
                        res.render("sales", { sales: foundItems, products: foundProds });
                    }
                });
            }
            else { res.send(err); }
        });
    })
    // create new sale item in the sales collection
    .post((req, res) => {
        const newItem = new Sale({
            sku: req.body.sku,
            description: req.body.description,
            cost: req.body.cost,
            qty: req.body.qty,
            total: req.body.cost * req.body.qty,
            date: new Date()
        });

        newItem.save((err) => {
            if (!err) {
                Item.findOneAndUpdate({ sku: req.body.sku }, { $inc: { qty: -req.body.qty } }).exec();
                Item.findOneAndUpdate({ sku: req.body.sku }, { $currentDate: { date: true } }).exec();
                res.redirect("sales");
            }
            else { res.send(err); }
        });
    })
    // delete all sales
    .delete((req, res) => {
        Sale.deleteMany((err) => {
            if (!err) { res.send("Deleted All!"); }
            else { res.send(err); }
        });
    });

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () => {
    console.log("Server started on port 3000.");
});
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",      // replace with your MySQL password
  database: "ecommerce_db"
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL Connected...");
});

// Get all products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) res.status(500).send(err);
    else res.json(result);
  });
});

// Add a new product
app.post("/products", (req, res) => {
  const { name, price, stock } = req.body;
  db.query("INSERT INTO products (name, price, stock) VALUES (?, ?, ?)",
    [name, price, stock], (err, result) => {
      if (err) res.status(500).send(err);
      else res.json({ message: "Product added successfully" });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));

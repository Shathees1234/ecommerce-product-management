import React, { useState } from "react";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const addProduct = () => {
    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price, stock })
    })
      .then(res => res.json())
      .then(() => {
        setName("");
        setPrice("");
        setStock("");
        alert("Product added successfully!");
      });
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
      <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
      <button onClick={addProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;

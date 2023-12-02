// AddProduct.jsx
import React, { useState } from "react";

const AddProduct = ({ categories, onAddProduct }) => {
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.category) {
      onAddProduct(newProduct);
      setNewProduct({ name: "", price: "", category: "" });
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <br />
      <input
        type="number"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <br />
      <select
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <br />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

export default AddProduct;

// AddProduct.jsx
import React, { useState } from "react";

// AddProduct component to add a new product
const AddProduct = ({ categories, onAddProduct }) => {
  // State to track the new product inputs
  const [newProduct, setNewProduct] = useState({ name: "", price: "", category: "" });

  // Function to handle adding a new product
  const handleAddProduct = () => {
    // Check if name, price, and category are provided
    if (newProduct.name && newProduct.price && newProduct.category) {
      // Call the onAddProduct prop to pass the new product
      onAddProduct(newProduct);
      // Reset the newProduct state after adding
      setNewProduct({ name: "", price: "", category: "" });
    }
  };

  // Render the component UI
  return (
    <div>
      <h2>Add Product</h2>
      {/* Input for product name */}
      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <br />
      {/* Input for product price */}
      <input
        type="number"
        placeholder="Product Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <br />
      {/* Dropdown for selecting product category */}
      <select
        value={newProduct.category}
        onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
      >
        <option value="">Select Category</option>
        {/* Map through categories and create options */}
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <br />
      {/* Button to trigger adding the product */}
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
};

// Export the AddProduct component
export default AddProduct;

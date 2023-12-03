// GenerateBill.jsx
import React, { useState } from "react";

// GenerateBill component for adding bill items
export default function GenerateBill({
  products,
  billItems,
  setBillItems,
  categories,
  onGenerateBill,
}) {
  // State for selected category, product, and quantity
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  // Filter products based on the selected category
  const filteredProducts = products.filter(
    (product) => product.category === selectedCategory
  );

  // Function to handle generating a new bill item
  const handleGenerateBill = () => {
    console.log("Generating Bill...");

    // Check if both selected product and quantity are provided
    if (selectedProduct && quantity) {
      // Find the selected product's information
      const selectedProductInfo = products.find(
        (product) => product.name === selectedProduct
      );

      console.log("Selected Product Info:", selectedProductInfo);

      // If the selected product is found
      if (selectedProductInfo) {
        // Check if the item already exists in the bill
        const existingItemIndex = billItems.findIndex(
          (item) =>
            item.product === selectedProduct &&
            item.category === selectedProductInfo.category
        );

        if (existingItemIndex !== -1) {
          // If the item exists, update the quantity
          const updatedBillItems = [...billItems];
          updatedBillItems[existingItemIndex].quantity += parseInt(quantity, 10);
          setBillItems(updatedBillItems);
        } else {
          // If the item doesn't exist, create a new bill item
          const newItem = {
            category: selectedProductInfo.category,
            product: selectedProduct,
            quantity: parseInt(quantity, 10),
            price: selectedProductInfo.price,
            gst: selectedProductInfo.category
              ? categories.find(
                  (category) =>
                    category.name === selectedProductInfo.category
                ).gst
              : 0,
          };

          console.log("New Bill Item:", newItem);

          // Call the callback to update the bill items in the parent component
          onGenerateBill(newItem);
        }

        // Reset the selected category, product, and quantity
        setSelectedCategory("");
        setSelectedProduct("");
        setQuantity("");
      } else {
        console.error("Selected product not found");
      }
    }
  };

  // Render the component UI
  return (
    <div>
      <h2>Generate Bill</h2>
      {/* Dropdown for selecting a category */}
      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedProduct(""); // Reset selected product when changing category
        }}
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category.name} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <br />
      {/* Dropdown for selecting a product based on the selected category */}
      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        disabled={!selectedCategory} // Disable if no category is selected
      >
        <option value="">Select Product</option>
        {filteredProducts.map((product) => (
          <option key={product.name} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
      <br />
      {/* Input for entering quantity */}
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />
      {/* Button to trigger generating a new bill item */}
      <button onClick={handleGenerateBill}>Add Bill Item</button>
      {/* Button to reload the page (Start a new bill) */}
      <button onClick={() => window.location.reload()}>New bill</button>
    </div>
  );
}

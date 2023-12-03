// GenerateBill.jsx
import React, { useState } from "react";


export default function GenerateBill({
  products,
  billItems,
  setBillItems,
  categories,
  onGenerateBill,
}) {
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleGenerateBill = () => {
    console.log("Generating Bill...");

    if (selectedProduct && quantity) {
      const selectedProductInfo = products.find(
        (product) => product.name === selectedProduct
      );

      console.log("Selected Product Info:", selectedProductInfo);

      if (selectedProductInfo) {
        const newItem = {
          category: selectedProductInfo.category,
          product: selectedProduct,
          quantity: parseInt(quantity, 10),
          price: selectedProductInfo.price,
          gst: selectedProductInfo.category
            ? categories.find(
                (category) => category.name === selectedProductInfo.category
              ).gst
            : 0,
        };

        console.log("New Bill Item:", newItem);

        // Call the callback to update the bill items in the parent component
        onGenerateBill(newItem);

        setQuantity("");
      } else {
        console.error("Selected product not found");
      }
    }
  };

  return (
    <div >
      <h2>Generate Bill</h2>
      <select
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
      >
        <option value="">Select Product</option>
        {products.map((product) => (
          <option key={product.name} value={product.name}>
            {product.name}
          </option>
        ))}
      </select>
      <br />
      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br />
      <button onClick={handleGenerateBill}>Add Bill Item</button>
      <button onClick={()=> window.location.reload()}>New bill</button>


      
    </div>
  );
}
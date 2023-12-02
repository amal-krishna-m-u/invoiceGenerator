// App.jsx
import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import GenerateBill from "./GenerateBill";
import ManageItems from "./ManageItems";
import "./style.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [billItems, setBillItems] = useState([]);

  useEffect(() => {
    // Load categories and products from local storage
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setCategories(storedCategories);
    setProducts(storedProducts);
  }, []);

  const saveCategoriesToLocalStorage = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  const saveProductsToLocalStorage = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  const saveBillItemsToLocalStorage = (newBillItems) => {
    setBillItems(newBillItems);
  };

  const handleAddCategory = (newCategory) => {
    saveCategoriesToLocalStorage([...categories, { ...newCategory, gst: parseFloat(newCategory.gst) / 100 }]);
  };

  const handleAddProduct = (newProduct) => {
    saveProductsToLocalStorage([...products, { ...newProduct, price: parseFloat(newProduct.price) }]);
  };

  const handleGenerateBill = (newBillItem) => {
    saveBillItemsToLocalStorage([...billItems, newBillItem]);
  };

  const handleDeleteItem = (itemToDelete) => {
    const updatedItems = billItems.filter((item) => item !== itemToDelete);
    saveBillItemsToLocalStorage(updatedItems);
  };

  return (
    <div className="container">
      <h1>GST Billing System</h1>

      <AddCategory onAddCategory={handleAddCategory} />
      <AddProduct categories={categories} onAddProduct={handleAddProduct} />
      <GenerateBill
        products={products}
        billItems={billItems}
        setBillItems={setBillItems}
        categories={categories}
        onGenerateBill={handleGenerateBill}
      />
      <ManageItems items={billItems} onDeleteItem={handleDeleteItem} />
    </div>
  );
};

export default App;

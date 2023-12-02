// App.jsx
import React, { useState, useEffect } from "react";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import GenerateBill from "./GenerateBill";
import ManageItems from "./ManageItems";
import DeleteItem from "./DeleteItem"; // Import the DeleteItem component
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
    // Implement your logic to delete a bill item
    console.log("Deleting bill item:", itemToDelete);
    // Update the state accordingly
    setBillItems((prevItems) =>
      prevItems.filter((item) => item !== itemToDelete)
    );
  };

  const handleDeleteCategory = (categoryToDelete) => {
    // Implement your logic to delete a category
    console.log("Deleting category:", categoryToDelete);
    // Update the state accordingly
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToDelete)
    );
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
      <DeleteItem
        items={billItems}
        categories={categories}
        onDeleteItem={handleDeleteItem}
        onDeleteCategory={handleDeleteCategory}
      />
    </div>
  );
};

export default App;

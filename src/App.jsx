// App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "./Home";
import AddCategory from "./AddCategory";
import AddProduct from "./AddProduct";
import GenerateBill from "./GenerateBill";
import ManageItems from "./ManageItems";
import DeleteItem from "./DeleteItem";
import "./style.css";

// Navigation component
const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/add-category" className="nav-link">
                Add Category
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/add-product" className="nav-link">
                Add Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/generate-bill" className="nav-link">
                Generate Bill
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delete-items" className="nav-link">
                Delete Items
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// App component
const App = () => {
  // State for categories, products, and bill items
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [billItems, setBillItems] = useState([]);

  // useEffect to load categories and products from local storage on component mount
  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    setCategories(storedCategories);
    setProducts(storedProducts);
  }, []);

  // Function to save categories to local storage and update state
  const saveCategoriesToLocalStorage = (newCategories) => {
    setCategories(newCategories);
    localStorage.setItem("categories", JSON.stringify(newCategories));
  };

  // Function to save products to local storage and update state
  const saveProductsToLocalStorage = (newProducts) => {
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  // Function to save bill items to state
  const saveBillItemsToLocalStorage = (newBillItems) => {
    setBillItems(newBillItems);
  };

  // Function to handle adding a new category
  const handleAddCategory = (newCategory) => {
    saveCategoriesToLocalStorage([...categories, { ...newCategory, gst: parseFloat(newCategory.gst) / 100 }]);
  };

  // Function to handle adding a new product
  const handleAddProduct = (newProduct) => {
    saveProductsToLocalStorage([...products, { ...newProduct, price: parseFloat(newProduct.price) }]);
  };

  // Function to handle generating a new bill item
  const handleGenerateBill = (newBillItem) => {
    saveBillItemsToLocalStorage([...billItems, newBillItem]);
  };

  // Function to handle deleting a bill item
  const handleDeleteItem = (itemToDelete) => {
    setBillItems((prevItems) =>
      prevItems.filter((item) => item !== itemToDelete)
    );
  };

  // Function to handle deleting a category
  const handleDeleteCategory = (categoryToDelete) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category !== categoryToDelete)
    );
  };

  return (
    <Router>
      <div className="container">
        <h1>GST Billing System</h1>

        {/* Render the Navigation component */}
        <Navigation />

        {/* Define routes using react-router-dom */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-category" element={<AddCategory onAddCategory={handleAddCategory} />} />
          <Route path="/add-product" element={<AddProduct categories={categories} onAddProduct={handleAddProduct} />} />
          <Route
            path="/generate-bill"
            element={
              <>
                {/* Render the GenerateBill component with ManageItems */}
                <GenerateBill products={products} billItems={billItems} setBillItems={setBillItems} categories={categories} onGenerateBill={handleGenerateBill} />
                <ManageItems items={billItems} onDeleteItem={handleDeleteItem} />
              </>
            }
          />

          {/* Render the DeleteItem component with bill items and categories */}
          <Route
            path="/delete-items"
            element={<DeleteItem items={billItems} categories={categories} onDeleteItem={handleDeleteItem} onDeleteCategory={handleDeleteCategory} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// Home.jsx
import React from 'react';

const Home = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome to GST Billing System</h2>
      <div className="card p-4">
        <p className="lead">
          The GST Billing System is designed to simplify the management of Goods and Services Tax for various product categories. The system provides essential features to set GST rates, create products, record sales, and generate accurate bills with tax calculations.
        </p>

        <h3 className="mt-4">Key Features:</h3>
        <ul>
          <li>Set various GST rates for different product categories.</li>
          <li>Create and manage product categories and products.</li>
          <li>Record sales with automatic tax rate calculations.</li>
          <li>Generate detailed bills with taxes calculated based on product categories.</li>
        </ul>

        <h3 className="mt-4">How to Use:</h3>
        <p>
          Explore the system by navigating through different screens:
          <ol>
            <li>Create product categories</li>
            <li>Capture GST rates for various product categories</li>
            <li>Create products in different categories</li>
            <li>Record a sale and generate a final bill</li>
          </ol>
        </p>

        <h3 className="mt-4">Explore the Code:</h3>
        <p>
          View the source code on GitHub: <a href="https://github.com/amal-krishna-m-u/invoiceGenerator.git" target="_blank" rel="noopener noreferrer">GST Billing System Repository</a>
        </p>
      </div>
    </div>
  );
};

export default Home;

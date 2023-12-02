import { useState } from "react";
import "./style.css";

/**
 * Main component representing the GST Billing System.
 */
export default function App() {
    
  // State variables for managing categories, products, and billing
  const [newCategory, setNewCategory] = useState({
    name: "",
    gst: "",
  });

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState("");
  const [billItems, setBillItems] = useState([]);
  const [gstTotal, setGstTotal] = useState(0);
  const [totalWithoutGst, setTotalWithoutGst] = useState(0);
  const [grantTotal, setGrantTotal] = useState(0);

  /**
   * Function to add a new category.
   */
  const handleAddCategory = () => {
    const { name, gst } = newCategory;
    if (name && gst) {
      setCategories((prevCategories) => [
        ...prevCategories,
        { name, gst: parseFloat(gst) / 100 },
      ]);
      setNewCategory({ name: "", gst: "" });
    }
  };

  /**
   * Function to add a new product.
   */
  const handleAddProduct = () => {
    const { name, price, category } = newProduct;
    if (name && price && category) {
      setProducts((prevProducts) => [
        ...prevProducts,
        { name, price: parseFloat(price), category },
      ]);
      setNewProduct({ name: "", price: "", category: "" });
    }
  };

  /**
   * Function to generate a bill item.
   */
  const handleGenerateBill = () => {
    if (selectedProduct && quantity) {
      const selectedProductInfo = products.find(
        (product) => product.name === selectedProduct
      );
  
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
  
      setBillItems((prevItems) => [...prevItems, newItem]);
      setQuantity("");
    }
  };
  

  /**
   * Function to handle printing the bill.
   */
  const handlePrintBill = () => {
    console.log("Printing Bill", { billItems, gstTotal, totalWithoutGst, grantTotal });
    window.print();
  };

  /**
   * Function to calculate totals.
   */
  const calculateTotals = () => {
    let totalWithoutGst = 0;
    let gstTotal = 0;

    billItems.forEach((item) => {
      const itemPrice = item.price * item.quantity;
      const itemGst = itemPrice * item.gst;

      totalWithoutGst += itemPrice;
      gstTotal += itemGst;
    });

    const grantTotal = totalWithoutGst + gstTotal;

    setTotalWithoutGst(totalWithoutGst);
    setGstTotal(gstTotal);
    setGrantTotal(grantTotal);
  };

  return (
    <div className="container">
      <h1>GST Billing System</h1>

      {/* Add Category Section */}
      <div className="dashboard-section">
        <h2>Add Category</h2>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.name}
          onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
        />
        <br />
        <input
          type="text"
          placeholder="Category GST (%)"
          value={newCategory.gst}
          onChange={(e) => setNewCategory({ ...newCategory, gst: e.target.value })}
        />
        <br />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {/* Add Product Section */}
      <div className="dashboard-section">
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

      {/* Generate Bill Section */}
      <div className="dashboard-section">
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
        <button onClick={handleGenerateBill}>Generate Bill</button>
      </div>

      {/* Bill Items Section */}
      <div className="bill-section">
        <h2>Bill Items</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price per Item</th>
              <th>Total GST</th>
              <th>Total Price</th>
            </tr>
          </thead>
          <tbody>
            {billItems.map((item, index) => (
              <tr key={index}>
                <td>{item.product}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>Rs{item.price.toFixed(2)}</td>
                <td>Rs{(item.price * item.gst * item.quantity).toFixed(2)}</td>
                <td>Rs{(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="5">Grant Total</td>
              <td>Rs{grantTotal.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Print Section */}
      <div className="print-section">
        <button onClick={handlePrintBill}>Print Bill</button>
        <button onClick={calculateTotals }>Grant total</button>
      </div>
    </div>
  );
}

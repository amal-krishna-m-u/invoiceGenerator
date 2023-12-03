// ManageItems.jsx
import React from "react";

// ManageItems component for displaying and managing bill items
const ManageItems = ({ items }) => {
  // Function to print the invoice
  function printdiv(elem) {
    var header_str = '<html><head><title>' + document.title + '</title></head><body>';
    var footer_str = '</body></html>';
    var new_str = document.getElementById(elem).innerHTML;
    var old_str = document.body.innerHTML;
    document.body.innerHTML = header_str + new_str + footer_str;
    window.print();
    document.body.innerHTML = old_str;
    return false;
  }

  // Calculate totals
  let totalWithoutGst = 0;
  let gstTotal = 0;

  items.forEach((item) => {
    const itemPrice = item.price * item.quantity;
    const itemGst = itemPrice * item.gst;

    totalWithoutGst += itemPrice;
    gstTotal += itemGst;
  });

  const grantTotal = totalWithoutGst + gstTotal;

  // Render the component UI
  return (
    <div>
      {/* The div with id "printArea" will be used for printing */}
      <div id="printArea">
        <h2 className="invoice">Invoice</h2>
        <div className="table-responsive">
          <table className="table d-sm-table table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Price per Product</th>
                <th>GST</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through bill items and render each row */}
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.product}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td>Rs {item.price.toFixed(2)}</td>
                  <td>Rs {(item.price * item.gst * item.quantity).toFixed(2)}</td>
                  <td>Rs {(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="6"></td>
              </tr>
              <tr>
                <td colSpan="5">Total without GST</td>
                <td>Rs {totalWithoutGst.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan="5">Total GST</td>
                <td>Rs {gstTotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td className="table-active" colSpan="5">Grand Total</td>
                <td>Rs {grantTotal.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        <br />
        {/* Button to trigger printing the invoice */}
        <button onClick={() => printdiv("printArea")}>PRINT</button>
      </div>
    </div>
  );
};

// Export the ManageItems component
export default ManageItems;

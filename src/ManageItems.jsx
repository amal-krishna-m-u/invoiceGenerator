// ManageItems.jsx
import React from "react";




const ManageItems = ({ items, onDeleteItem }) => {
//   function handelPrint(){
// window.print();
//   };


function printdiv(elem) {
  var header_str = '<html><head><title>' + document.title  + '</title></head><body>';
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

  return (
    <div >
<div id="printArea"> 
      <h2 className="invoice">Invoice</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price per Product</th>
            <th>Total GST</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
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
            <td colSpan="5">Grant Total</td>
            <td>Rs {grantTotal.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      </div>
      <br />

      <button onClick={ () => printdiv("printArea")} >PRINT</button>


    </div>
  );
};

export default ManageItems;

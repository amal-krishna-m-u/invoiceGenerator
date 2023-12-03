// AddCategory.jsx
import React, { useState } from "react";

// Functional component for adding a new category
const AddCategory = ({ onAddCategory }) => {
  // State to track the new category inputs
  const [newCategory, setNewCategory] = useState({ name: "", gst: "" });

  // Function to handle adding a new category
  const handleAddCategory = () => {
    // Check if both name and gst are provided
    if (newCategory.name && newCategory.gst) {
      // Call the onAddCategory prop to pass the new category
      onAddCategory(newCategory);
      // Reset the newCategory state after adding
      setNewCategory({ name: "", gst: "" });
    }
  };

  // Render the component UI
  return (
    <div>
      <h2>Add Category</h2>
      {/* Input for category name */}
      <input
        type="text"
        placeholder="Category Name"
        value={newCategory.name}
        onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
      />
      <br />
      {/* Input for category GST */}
      <input
        type="text"
        placeholder="Category GST (%)"
        value={newCategory.gst}
        onChange={(e) => setNewCategory({ ...newCategory, gst: e.target.value })}
      />
      <br />
      {/* Button to trigger adding the category */}
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

// Export the AddCategory component
export default AddCategory;

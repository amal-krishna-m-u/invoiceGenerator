// AddCategory.jsx
import React, { useState } from "react";

const AddCategory = ({ onAddCategory }) => {
  const [newCategory, setNewCategory] = useState({ name: "", gst: "" });

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.gst) {
      onAddCategory(newCategory);
      setNewCategory({ name: "", gst: "" });
    }
  };

  return (
    <div>
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
  );
};

export default AddCategory;

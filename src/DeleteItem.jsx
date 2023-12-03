// DeleteItem.jsx
import React, { useState, useEffect } from "react";

// DeleteItem component for deleting items or categories
const DeleteItem = ({ items, categories, onDeleteItem, onDeleteCategory }) => {
  // State for search term, search results, and suggestions
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  // useEffect to update search results when items or categories change
  useEffect(() => {
    handleSearch();
  }, [items, categories]);

  // Function to handle search based on the current search term
  const handleSearch = () => {
    // Filter items and categories based on the search term
    const filteredItems = items.filter(
      (item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCategories = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Set the search results
    setSearchResults([...filteredItems, ...filteredCategories]);
  };

  // Function to handle item or category deletion
  const handleDelete = (itemToDelete) => {
    // Determine if the item to delete is a category or an item
    if (itemToDelete.category) {
      onDeleteItem(itemToDelete);
    } else {
      onDeleteCategory(itemToDelete);
    }

    // Update local storage after deleting the item or category
    // Assuming that you store the bill items and categories in local storage
    const updatedItems = items.filter((item) => item !== itemToDelete);
    const updatedCategories = categories.filter(
      (category) => category !== itemToDelete
    );

    localStorage.setItem("billItems", JSON.stringify(updatedItems));
    localStorage.setItem("categories", JSON.stringify(updatedCategories));
  };

  // Function to handle input change and suggest items or categories
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);

    // Implement your logic to suggest items or categories based on the current input value
    // For simplicity, this example suggests items with a name or category that starts with the input value
    const inputSuggestions = [
      ...items.filter((item) =>
        item.product.toLowerCase().startsWith(inputValue.toLowerCase())
      ),
      ...categories.filter((category) =>
        category.name.toLowerCase().startsWith(inputValue.toLowerCase())
      ),
    ];

    setSuggestions(inputSuggestions);
  };

  // Function to handle suggestion click and update the search results
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.product || suggestion.name);
    setSearchResults([suggestion]);
  };

  // Render the component UI
  return (
    <div>
      <h2>Delete Category</h2>
      {/* Input for searching category */}
      <input
        type="text"
        placeholder="Search category"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <br />
      {/* Button to trigger search */}
      <button onClick={handleSearch}>Search</button>

      {/* Display search results */}
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            {/* Display item details and delete button */}
            {result.product && (
              <>
                Item: {result.product} - Category: {result.category}{" "}
                <button onClick={() => handleDelete(result)}>Delete</button>
              </>
            )}
            {/* Display category details and delete button */}
            {result.name && (
              <>
                Category: {result.name}{" "}
                <button onClick={() => handleDelete(result)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Display search suggestions (commented out for simplicity) */}
      {/* <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
            { suggestion.name}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

// Export the DeleteItem component
export default DeleteItem;

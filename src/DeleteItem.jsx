
import React, { useState, useEffect } from "react";

const DeleteItem = ({ items, categories, onDeleteItem, onDeleteCategory }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Update search results whenever items or categories change
    handleSearch();
  }, [items, categories]);

  const handleSearch = () => {
    const filteredItems = items.filter(
      (item) =>
        item.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredCategories = categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults([...filteredItems, ...filteredCategories]);
  };

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

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.product || suggestion.name);
    setSearchResults([suggestion]);
  };

  return (
    <div>
      <h2>Delete Category</h2>
      <input
        type="text"
        placeholder="Search category"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <br />
      <button onClick={handleSearch}>Search</button>


      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            {result.product && (
              <>
                Item: {result.product} - Category: {result.category}{" "}
                <button onClick={() => handleDelete(result)}>Delete</button>
              </>
            )}
            {result.name && (
              <>
                Category: {result.name}{" "}
                <button onClick={() => handleDelete(result)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Display search suggestions */}
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

export default DeleteItem;

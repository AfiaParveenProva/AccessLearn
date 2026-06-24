import React from "react";

const Filter = ({ onCategoryChange }) => {
  return (
    <div className="filter-container">
      <label>Filter by Category:</label>
      <select onChange={(e) => onCategoryChange(e.target.value)}>
        <option value="All">All</option>
        <option value="Math">Math</option>
        <option value="History">History</option>
        <option value="Science">Science</option>
        <option value="IT">IT</option>
      </select>
    </div>
  );
};

export default Filter;

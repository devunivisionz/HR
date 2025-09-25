import React from "react";
import { Search } from "lucide-react";
import "./SearchInput.css";

const SearchInput = ({ placeholder = "Search", value, onChange }) => {
  return (
    <div className="search-input-container">
      {/* <Search size={20} className="search-icon" /> */}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="search-input"
      />
    </div>
  );
};

export default SearchInput;

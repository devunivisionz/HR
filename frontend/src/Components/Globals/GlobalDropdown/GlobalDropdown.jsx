import React from "react";
import "./GlobalDropdown.css";
import { ChevronDown } from "lucide-react";

const GlobalDropdown = ({
  dropdownFor,
  dropdownList,
  changeHandler,
  label,
}) => {
  return (
    <div className="custom-dropdown" style={{ position: "relative" }}>
      <select
        value={dropdownFor || ""}
        onChange={(e) => changeHandler(e.target.value)}
      >
        <option value="" disabled hidden>
          {label}
        </option>
        {dropdownList?.map((ele, index) => (
          <option key={index} value={ele}>
            {ele}
          </option>
        ))}
      </select>

      <ChevronDown className="dropdown-icon" />
    </div>
  );
};

export default GlobalDropdown;

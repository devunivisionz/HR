import React from "react";
import GlobalDropdown from "../../../../Components/Globals/GlobalDropdown/GlobalDropdown";
import "../../Candidates/FilterSection/FilterSection.css";
import SearchInput from "../../../../Components/Globals/GlobalSearchField/GlobalSearchField";

const FilterSection = ({ changeHandler, dropdownFor, handleSearchChange }) => {
  const dropdownList = ["Present", "Absent", "Medical Leave", "Work from Home"];
  return (
    <div className="filter-section">
      <div className="left-side">
        <GlobalDropdown
          changeHandler={changeHandler}
          label={"Status"}
          dropdownFor={dropdownFor}
          dropdownList={dropdownList}
        />
      </div>
      <div className="right-side">
        <SearchInput onChange={handleSearchChange} />
      </div>
    </div>
  );
};

export default FilterSection;

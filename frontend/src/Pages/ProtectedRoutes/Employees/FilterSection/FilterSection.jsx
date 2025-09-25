import React from "react";
import GlobalDropdown from "../../../../Components/Globals/GlobalDropdown/GlobalDropdown";
import SearchInput from "../../../../Components/Globals/GlobalSearchField/GlobalSearchField";
import "../../Candidates/FilterSection/FilterSection.css";

const FilterSection = ({
  statusFilterChange,
  dropdownList,
  positionValue,
  handleSearchChange,
}) => {
  return (
    <div className="filter-section">
      <div className="left-side">
        <GlobalDropdown
          dropdownFor={positionValue}
          changeHandler={statusFilterChange}
          dropdownList={dropdownList}
          label={"Position"}
        />
      </div>
      <div className="right-side">
        <SearchInput
          //   value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search"
        />
      </div>
    </div>
  );
};

export default FilterSection;

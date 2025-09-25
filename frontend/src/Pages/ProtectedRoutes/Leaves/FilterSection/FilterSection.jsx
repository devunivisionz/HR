import React from "react";
import GlobalDropdown from "../../../../Components/Globals/GlobalDropdown/GlobalDropdown";
import SearchInput from "../../../../Components/Globals/GlobalSearchField/GlobalSearchField";
import GlobalButton from "../../../../Components/Globals/GlobalButton/GlobalButton";
import "../../Candidates/FilterSection/FilterSection.css";

const FilterSection = ({
  addLeaveHandler,
  changeHandler,
  handleSearchChange,
}) => {
  const dropdownList = ["approved", "rejected", "pending"];
  return (
    <div className="filter-section">
      <div className="left-side">
        <GlobalDropdown
          label={"Status"}
          dropdownList={dropdownList}
          changeHandler={changeHandler}
        />
      </div>
      <div className="right-side">
        <SearchInput onChange={handleSearchChange} />
        <GlobalButton buttonFor={"Leave"} clickHandler={addLeaveHandler} />
      </div>
    </div>
  );
};

export default FilterSection;

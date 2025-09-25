import React from "react";
import GlobalDropdown from "../../../../Components/Globals/GlobalDropdown/GlobalDropdown";
import GlobalButton from "../../../../Components/Globals/GlobalButton/GlobalButton";
import "./FilterSection.css";
import SearchInput from "../../../../Components/Globals/GlobalSearchField/GlobalSearchField";
import { useState } from "react";
import GlobalModal from "../../../../Components/Globals/GlobalModal/GlobalModal";
import { useDispatch, useSelector } from "react-redux";
import { addCandidateAction } from "../../../../Redux/Candidate/action";

const dropdownListForPosition = [
  "Full Time Designer",
  "Human Resource",
  "Senior Developer",
];
const field = [
  { label: "Name", name: "name", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone Number", name: "phone", type: "text" },
  { label: "Position", name: "position", type: "dropdown" },
  { label: "Experience", name: "experience", type: "text" },
  { label: "Resume", name: "resume", type: "file" },
];
const FilterSection = ({
  openAddEmployeeModal,
  positionFilterChange,
  statusFilterChange,
  setOpenAddEmployeeModal,
  dropdownList,
  statusValue,
  positionValue,
  candidatePositionList,
  handleSearchChange, // ADD THIS
}) => {
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    dispatch(addCandidateAction(data));
  };
  const createCandidateReducer = useSelector(
    (state) => state?.createCandidateReducer
  );
  return (
    <>
      <GlobalModal
        termsAndConditionsCheck={true}
        loading={createCandidateReducer?.loading}
        onSubmit={onSubmit}
        fields={field}
        dropdownList={candidatePositionList}
        show={openAddEmployeeModal}
        close={() => setOpenAddEmployeeModal(false)}
        modalFor={"Add Candidate"}
      />
      <div className="filter-section">
        <div className="left-side">
          <GlobalDropdown
            label={"Status"}
            dropdownFor={statusValue}
            changeHandler={statusFilterChange}
            dropdownList={dropdownList}
          />
          <GlobalDropdown
            label={"Position"}
            changeHandler={positionFilterChange}
            dropdownFor={positionValue}
            dropdownList={dropdownListForPosition}
          />
        </div>
        <div className="right-side">
          <SearchInput onChange={handleSearchChange} placeholder="Search" />

          <GlobalButton
            clickHandler={() => setOpenAddEmployeeModal(true)}
            buttonFor={"Candidate"}
          />
        </div>
      </div>
    </>
  );
};

export default FilterSection;

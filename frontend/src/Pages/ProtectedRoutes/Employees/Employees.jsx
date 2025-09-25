import React from "react";
import GlobalList from "../../../Components/Globals/GlobalList/GlobalList";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteEmployeeAction,
  deleteEmployeeActionReset,
  getEmployeeAction,
  updateEmployeeAction,
  updateEmployeeActionReset,
} from "../../../Redux/Employee/action";
import { useState } from "react";
import FilterSection from "./FilterSection/FilterSection";
import GlobalModal from "../../../Components/Globals/GlobalModal/GlobalModal";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../Components/Toaster/ToasterServices";
import { useCallback } from "react";
import { debounce } from "lodash";
import DeleteConfirmation from "../Candidates/ConfirmationModal/DeleteConfirmation";

const Employees = () => {
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [apiCall, setApiCall] = useState(false);
  const getEmployeeReducer = useSelector((state) => state?.getEmployeeReducer);
  const employeesList = getEmployeeReducer?.data;
  useEffect(() => {
    dispatch(getEmployeeAction({ department, position, status, search }));
  }, [department, position, status, search, apiCall]);
  const updateEmployeeReducer = useSelector(
    (state) => state?.updateEmployeeReducer
  );
  useEffect(() => {
    const updateEmployee = updateEmployeeReducer?.data;
    if (!updateEmployee) return;

    if (updateEmployee?.status === 200) {
      showSuccessToast("Successfully Updated Employee");
      setOpenEditEmployeeModal(false);
      setApiCall((prev) => !prev);
    } else if (updateEmployee?.error) {
      showErrorToast(updateEmployee.error);
    }
    dispatch(updateEmployeeActionReset());
  }, [updateEmployeeReducer?.data]);
  const deleteEmployeeReducer = useSelector(
    (state) => state?.deleteEmployeeReducer
  );
  useEffect(() => {
    const deleteEmployee = deleteEmployeeReducer?.data;
    if (deleteEmployee) {
      if (deleteEmployee?.status == 200) {
        showSuccessToast("Successfully Deleted Employee");
        setOpenDeleteConfirmModal(false);
        setApiCall((prev) => !prev);
      } else {
        showErrorToast();
      }
      dispatch(deleteEmployeeActionReset());
    }
  }, [deleteEmployeeReducer]);
  const headers = [
    { id: "profile", label: "Profile" },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone Number" },
    { id: "position", label: "Position" },
    { id: "department", label: "Department" },
    { id: "joiningDate", label: "Date of Joining" },
  ];
  const actionOptions = ["Edit", "Delete"];
  const formattedEmployees = employeesList?.data?.employees?.map((emp) => ({
    ...emp,
    joiningDate: new Date(emp.joiningDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));
  const field = [
    { label: "Full Name", name: "name", type: "text" },
    { label: "Email Address", name: "email", type: "email" },
    { label: "Phone Number", name: "phone", type: "text" },
    { label: "Department", name: "department", type: "text" },
    { label: "Position", name: "position", type: "dropdown" },
    { label: "Date of Joining", name: "joiningDate", type: "calender" },
  ];
  const [openEditEmployeeModal, setOpenEditEmployeeModal] = useState(false);
  const [existingEmployeeData, setExistingEmployeeData] = useState({});
  const actionHandler = (elem, ele) => {
    setExistingEmployeeData(ele);
    switch (elem) {
      case "Edit":
        setOpenEditEmployeeModal(true);
        break;
      case "Delete":
        setOpenDeleteConfirmModal(true);
        break;

      default:
        break;
    }
  };
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const deleteEmployee = () => {
    dispatch(deleteEmployeeAction({ employeeId: existingEmployeeData?._id }));
  };
  const dropdownList = ["Developer", "Designer", "Human Resource"];
  const onSubmit = (data) => {
    dispatch(
      updateEmployeeAction({
        ...data,
        employeeId: data?._id,
      })
    );
  };
  const debouncedSetSearch = useCallback(
    debounce((value) => {
      setSearch(value);
    }, 300),
    []
  );
  const handleSearchChange = (e) => {
    debouncedSetSearch(e.target.value); // delayed setting of search
  };
  const statusFilterChange = (ele) => {
    setPosition(ele);
  };
  return (
    <>
      <DeleteConfirmation
        show={openDeleteConfirmModal}
        close={() => setOpenDeleteConfirmModal(false)}
        loading={deleteEmployeeReducer?.loading}
        deleteUser={deleteEmployee}
      />
      <GlobalModal
        termsAndConditionsCheck={false}
        onSubmit={onSubmit}
        fields={field}
        loading={updateEmployeeReducer?.loading}
        editModal={true}
        show={openEditEmployeeModal}
        close={() => setOpenEditEmployeeModal(false)}
        modalFor={"Edit Employee"}
        existingData={existingEmployeeData}
        dropdownList={dropdownList}
      />
      <FilterSection
        positionValue={position}
        statusFilterChange={statusFilterChange}
        dropdownList={dropdownList}
        handleSearchChange={handleSearchChange}
      />
      <GlobalList
        data={formattedEmployees}
        headers={headers}
        loading={getEmployeeReducer?.loading}
        actionOptions={actionOptions}
        handleBlockToggle={actionHandler}
      />
    </>
  );
};

export default Employees;

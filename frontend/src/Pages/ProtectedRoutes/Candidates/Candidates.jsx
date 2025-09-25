import React from "react";
import FilterSection from "./FilterSection/FilterSection";
import GlobalList from "../../../Components/Globals/GlobalList/GlobalList";
import KanbanBoard from "../../../Components/Globals/KanbanBoard/KanbanBoard";
import { extractHeadersAndRows } from "../../../Components/ListHandlers/ListHandler";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../Components/Toaster/ToasterServices";
import {
  addCandidateActionReset,
  deleteCandidateAction,
  deleteCandidateActionReset,
  getCandidateAction,
  updateCandidateAction,
  updateCandidateActionReset,
} from "../../../Redux/Candidate/action";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal/ConfirmationModal";
import DeleteConfirmation from "./ConfirmationModal/DeleteConfirmation";
import { useCallback } from "react";
import { debounce } from "lodash";
import { LayoutGrid, List, ToggleLeft, ToggleRight } from "lucide-react";

const actionOptions = ["Download Resume", "Delete Candidate"];
const dropdownList = ["New", "Scheduled", "Ongoing", "Selected", "Rejected"];
const candidatePositionList = ["Developer", "Designer", "Human Resource"];
const Candidates = () => {
  const dispatch = useDispatch();
  const createCandidateReducer = useSelector(
    (state) => state?.createCandidateReducer
  );
  const getCandidateReducer = useSelector(
    (state) => state?.getCandidateReducer
  );
  const updateCandidateReducer = useSelector(
    (state) => state?.updateCandidateReducer
  );
  const deleteCandidateReducer = useSelector(
    (state) => state?.deleteCandidateReducer
  );
  const [status, setStatus] = useState("");
  const [position, setPosition] = useState("");
  const [search, setSearch] = useState("");
  const [apiCall, setApiCall] = useState(false);
  const [viewMode, setViewMode] = useState("kanban"); // "kanban" or "table"

  console.log(updateCandidateReducer);
  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  useEffect(() => {
    const updateCandidate = updateCandidateReducer?.data;
    if (updateCandidate) {
      if (updateCandidate?.status == 200) {
        setOpenStatusChangeConfirmationModal(false);
        showSuccessToast(updateCandidate?.data?.message);
        setApiCall((prev) => !prev);
      } else {
        showErrorToast(updateCandidate?.message);
      }
      dispatch(updateCandidateActionReset());
    }
  }, [updateCandidateReducer]);
  useEffect(() => {
    dispatch(getCandidateAction({ status, position, search }));
  }, [status, position, search, apiCall]);
  useEffect(() => {
    const addCandidate = createCandidateReducer?.data;
    if (addCandidate) {
      if (addCandidate?.status == 201) {
        showSuccessToast("Candidate Created Successfully!");
        setOpenAddEmployeeModal(false);
        setApiCall((prev) => !prev);
      } else {
        showErrorToast(addCandidate?.error);
      }
      dispatch(addCandidateActionReset());
    }
  }, [createCandidateReducer]);
  useEffect(() => {
    const deleteCandidate = deleteCandidateReducer?.data;
    if (deleteCandidate) {
      if (deleteCandidate?.status == 200) {
        showSuccessToast("Candidate Successfully Deleted!");
        setOpenDeleteConfirmModal(false);
        setApiCall((prev) => !prev);
      } else {
        showErrorToast(deleteCandidate?.error);
      }
      dispatch(deleteCandidateActionReset());
    }
  }, [deleteCandidateReducer]);
  const [
    openStatusChangeConfirmationModal,
    setOpenStatusChangeConfirmationModal,
  ] = useState(false);
  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);
  const [statusChangedTo, setStatusChangedTo] = useState("");
  const [statusChangedFrom, setStatusChangedFrom] = useState("");
  const [candidateId, setCandidateId] = useState("");
  const headers = [
    { id: "sno", label: "Sr no.", type: "text" },
    { id: "name", label: "Candidate Name", type: "text" },
    { id: "email", label: "Email Address", type: "text" },
    { id: "phone", label: "Phone Number", type: "text" },
    { id: "position", label: "Position", type: "text" },
    { id: "status", label: "Status", type: "dropdown" },
    { id: "experience", label: "Experience", type: "text" },
  ];

  const employeeStatusChange = (
    statusChangedTo,
    statusChangedFrom,
    candidateId
  ) => {
    setOpenStatusChangeConfirmationModal(true);
    setStatusChangedTo(statusChangedTo);
    setStatusChangedFrom(statusChangedFrom);
    setCandidateId(candidateId);
  };
  const rows = getCandidateReducer?.data?.data;
  const positionFilterChange = (position) => {
    console.log(position);
    setPosition(position);
  };
  const statusFilterChange = (status) => {
    setStatus(status);
  };
  const statusUpdateHandler = () => {
    dispatch(updateCandidateAction({ status: statusChangedTo, candidateId }));
  };
  const actionHandler = (elem, ele) => {
    const link = document.createElement("a");
    switch (elem) {
      case "Download Resume":
        const downloadLink = ele?.resume?.split("/")?.[1];
        link.href = `https://mern-backend-zocv.onrender.com/download/${downloadLink}`;
        link.download = "resume.pdf"; // optional: set download filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;
      case "Delete Candidate":
        // dispatch(deleteCandidateAction({ id: ele?._id }));
        setOpenDeleteConfirmModal(true);
        setCandidateId(ele?._id);
        break;

      default:
        break;
    }
  };
  const deleteCandidate = () => {
    dispatch(deleteCandidateAction({ id: candidateId }));
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
  return (
    <>
      <ConfirmationModal
        show={openStatusChangeConfirmationModal}
        close={() => setOpenStatusChangeConfirmationModal(false)}
        statusChangedFrom={statusChangedFrom}
        statusChangedTo={statusChangedTo}
        candidateId={candidateId}
        statusUpdateHandler={statusUpdateHandler}
        loading={updateCandidateReducer?.loading}
      />
      <DeleteConfirmation
        show={openDeleteConfirmModal}
        candidateId={candidateId}
        close={() => setOpenDeleteConfirmModal(false)}
        loading={deleteCandidateReducer?.loading}
        deleteUser={deleteCandidate}
      />
      
      {/* View Toggle */}
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          backgroundColor: '#fff',
          borderRadius: '16px',
          boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          padding: '20px 24px'
        }}>
          <div>
            <h4 style={{ 
              margin: 0, 
              color: '#333', 
              fontSize: '24px', 
              fontWeight: '600',
              marginBottom: '4px'
            }}>
              Candidates Management
            </h4>
            <p style={{ 
              margin: 0, 
              color: '#666', 
              fontSize: '14px' 
            }}>
              Manage your recruitment pipeline
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            backgroundColor: '#f8f9fa',
            borderRadius: '20px',
            padding: '4px',
            border: '1px solid #e9ecef',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.1)'
          }}>
            <button
              type="button"
              style={{
                backgroundColor: viewMode === "kanban" ? '#4d007d' : 'transparent',
                color: viewMode === "kanban" ? 'white' : '#666',
                border: viewMode === "kanban" ? '1px solid #4d007d' : '1px solid transparent',
                borderRadius: '16px',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginRight: '2px',
                boxShadow: viewMode === "kanban" ? '0 2px 4px rgba(77, 0, 125, 0.3)' : 'none'
              }}
              onClick={() => setViewMode("kanban")}
              onMouseOver={(e) => {
                if (viewMode !== "kanban") {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.color = '#4d007d';
                }
              }}
              onMouseOut={(e) => {
                if (viewMode !== "kanban") {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#666';
                }
              }}
            >
              <LayoutGrid size={16} style={{ marginRight: '8px' }} />
              Kanban View
            </button>
            <button
              type="button"
              style={{
                backgroundColor: viewMode === "table" ? '#4d007d' : 'transparent',
                color: viewMode === "table" ? 'white' : '#666',
                border: viewMode === "table" ? '1px solid #4d007d' : '1px solid transparent',
                borderRadius: '16px',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: viewMode === "table" ? '0 2px 4px rgba(77, 0, 125, 0.3)' : 'none'
              }}
              onClick={() => setViewMode("table")}
              onMouseOver={(e) => {
                if (viewMode !== "table") {
                  e.target.style.backgroundColor = '#f0f0f0';
                  e.target.style.color = '#4d007d';
                }
              }}
              onMouseOut={(e) => {
                if (viewMode !== "table") {
                  e.target.style.backgroundColor = 'transparent';
                  e.target.style.color = '#666';
                }
              }}
            >
              <List size={16} style={{ marginRight: '8px' }} />
              Table View
            </button>
          </div>
        </div>
      </div>

      <FilterSection
        candidatePositionList={candidatePositionList}
        statusValue={status}
        positionValue={position}
        positionFilterChange={positionFilterChange}
        statusFilterChange={statusFilterChange}
        dropdownList={dropdownList}
        openAddEmployeeModal={openAddEmployeeModal}
        setOpenAddEmployeeModal={setOpenAddEmployeeModal}
        handleSearchChange={handleSearchChange}
      />

      {viewMode === "kanban" ? (
        <KanbanBoard
          candidates={rows || []}
          onStatusChange={employeeStatusChange}
          loading={getCandidateReducer?.loading}
        />
      ) : (
        <GlobalList
          loading={getCandidateReducer?.loading}
          title="Users"
          employeeStatusChange={employeeStatusChange}
          data={rows}
          headers={headers}
          actionOptions={actionOptions}
          currentPage={currentPage}
          pageSize={pageSize}
          dropdownList={dropdownList}
          handleBlockToggle={actionHandler}
        />
      )}
    </>
  );
};

export default Candidates;

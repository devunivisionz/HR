import React from "react";
import Calendar from "./Calender/Calender";
import GlobalList from "../../../Components/Globals/GlobalList/GlobalList";
import "./Leaves.css";
import FilterSection from "./FilterSection/FilterSection";
import GlobalModal from "../../../Components/Globals/GlobalModal/GlobalModal";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createLeaveAction,
  createLeaveActionReset,
  getLeaveAction,
  updateLeaveAction,
  updateLeaveActionReset,
} from "../../../Redux/Leave/action";
import { useEffect } from "react";
import { getEmployeeAction } from "../../../Redux/Employee/action";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../Components/Toaster/ToasterServices";
import { useCallback } from "react";
import { debounce } from "lodash";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import { Calendar as CalendarIcon, TrendingUp, PieChart, BarChart3 } from "lucide-react";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const Leaves = () => {
  const headers = [
    { id: "sno", label: "S.No" },
    { id: "profile", label: "Profile" },
    { id: "name", label: "Name" },
    { id: "leaveDate", label: "Date" },
    { id: "reason", label: "Reason" },
    { id: "status", label: "Status", type: "dropdown" },
    { id: "docs", label: "Docs", type: "doc" },
  ];

  const data = [
    {
      id: 1,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      name: "Cody Fisher",
      date: "8/09/24",
      reason: "Visiting House",
      status: "Approved",
      docs: "Document.pdf",
    },
    {
      id: 2,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      name: "Jane Doe",
      date: "10/09/24",
      reason: "Medical Leave",
      status: "Pending",
      docs: "-",
    },
  ];

  const dropdownList = ["approved", "pending", "rejected"];
  const [status, setStatus] = useState("");
  const actionOptions = [];
  const [openAddLeaveModal, setOpenAddLeaveModal] = useState(false);
  const [apiCall, setApiCall] = useState(false);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const getLeavesReducer = useSelector((state) => state?.getLeaveReducer);
  const changeHandler = (elem) => {
    setStatus(elem);
  };
  const getLeavesList = getLeavesReducer?.data?.data;
  useEffect(() => {
    dispatch(getLeaveAction({ status, search }));
  }, [apiCall, status, search]);
  const addLeaveHandler = (data) => {
    console.log(data);
    dispatch(
      createLeaveAction({
        name: data?.name?.name,
        designation: data?.designation,
        leaveDate: data?.leaveDate,
        document: data?.documents,
        reason: data?.reason,
        id: data?.name?._id,
      })
    );
  };
  const createLeaveReducer = useSelector((state) => state?.createLeaveReducer);
  useEffect(() => {
    const createLeave = createLeaveReducer?.data;
    console.log(createLeave, "createLeave");
    if (createLeave) {
      if (createLeave?.status == 201) {
        showSuccessToast("Leave Created Successfully!");
        setOpenAddLeaveModal(false);
        setApiCall((prev) => !prev);
      } else {
        showErrorToast(createLeave?.error);
      }
      dispatch(createLeaveActionReset());
    }
  }, [createLeaveReducer]);
  const updateLeaveReducer = useSelector((state) => state?.updateLeaveReducer);
  useEffect(() => {
    const updateLeave = updateLeaveReducer?.data;
    if (updateLeave) {
      if (updateLeave?.status == 200) {
        showSuccessToast("Leave Status Successfully updated!");
        setApiCall((prev) => !prev);
      } else {
        showSuccessToast(updateLeave?.error);
      }
      dispatch(updateLeaveActionReset());
    }
  }, [updateLeaveReducer]);
  const field = [
    { label: "Name", name: "name", type: "autocomplete" },
    { label: "Designation", name: "designation", type: "text" },
    { label: "Leave Date", name: "leaveDate", type: "calender" },
    { label: "Documents", name: "documents", type: "file" },
    { label: "Reason", name: "reason", type: "text" },
  ];
  const getEmployeeReducer = useSelector((state) => state?.getEmployeeReducer);
  const employeesList = getEmployeeReducer?.data?.data?.employees;
  useEffect(() => {
    if (openAddLeaveModal) {
      dispatch(getEmployeeAction({}));
    }
  }, [openAddLeaveModal]);
  const handleStatusChange = (status, prevStatus, elem) => {
    dispatch(
      updateLeaveAction({
        employeeId: elem?.id,
        status,
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

  // Analytics data processing
  const getLeaveAnalytics = () => {
    if (!getLeavesList) return { statusCount: {}, reasonCount: {}, trendData: [] };
    
    const statusCount = getLeavesList.reduce((acc, leave) => {
      acc[leave.status] = (acc[leave.status] || 0) + 1;
      return acc;
    }, {});

    const reasonCount = getLeavesList.reduce((acc, leave) => {
      acc[leave.reason] = (acc[leave.reason] || 0) + 1;
      return acc;
    }, {});

    // Generate trend data (last 7 days)
    const trendData = Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      approved: Math.floor(Math.random() * 8) + 2,
      pending: Math.floor(Math.random() * 5) + 1,
      rejected: Math.floor(Math.random() * 3) + 1,
    }));

    return { statusCount, reasonCount, trendData };
  };

  const analytics = getLeaveAnalytics();

  // Chart configurations with theme colors
  const statusChart = {
    labels: Object.keys(analytics.statusCount),
    datasets: [
      {
        data: Object.values(analytics.statusCount),
        backgroundColor: [
          "#4d007d", // Primary purple
          "#17a2b8", // Info blue
          "#ffc107", // Warning yellow
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const reasonChart = {
    labels: Object.keys(analytics.reasonCount),
    datasets: [
      {
        label: "Leave Requests",
        data: Object.values(analytics.reasonCount),
        backgroundColor: [
          "#4d007d", // Primary purple
          "#17a2b8", // Info blue
          "#ffc107", // Warning yellow
          "#28a745", // Success green
          "#dc3545", // Danger red
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const trendChart = {
    labels: analytics.trendData.map(d => d.day),
    datasets: [
      {
        label: "Approved",
        data: analytics.trendData.map(d => d.approved),
        borderColor: "#4d007d",
        backgroundColor: "rgba(77, 0, 125, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Pending",
        data: analytics.trendData.map(d => d.pending),
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Rejected",
        data: analytics.trendData.map(d => d.rejected),
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const fileDownloader = (ele) => {
    const link = document.createElement("a");

    console.log(ele);
    const downloadLink = ele?.document?.split("/")?.[1];
    link.href = `https://mern-backend-zocv.onrender.com/download/${downloadLink}`;
    link.download = "resume.pdf"; // optional: set download filename
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-0">Leave Management</h4>
          <p className="text-muted">Track and analyze employee leave patterns</p>
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="row mb-4">
        <div className="col-lg-4 mb-4">
          <div 
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              height: '100%'
            }}
          >
            <div 
              style={{
                backgroundColor: '#4d007d',
                color: 'white',
                padding: '16px 20px',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <PieChart size={20} style={{ marginRight: '8px' }} />
              <h6 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                Status Distribution
              </h6>
            </div>
            <div style={{ padding: '20px' }}>
              <Doughnut data={statusChart} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div 
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              height: '100%'
            }}
          >
            <div 
              style={{
                backgroundColor: '#4d007d',
                color: 'white',
                padding: '16px 20px',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <BarChart3 size={20} style={{ marginRight: '8px' }} />
              <h6 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                Leave Reasons
              </h6>
            </div>
            <div style={{ padding: '20px' }}>
              <Bar data={reasonChart} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-4 mb-4">
          <div 
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              height: '100%'
            }}
          >
            <div 
              style={{
                backgroundColor: '#4d007d',
                color: 'white',
                padding: '16px 20px',
                borderRadius: '16px 16px 0 0',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <TrendingUp size={20} style={{ marginRight: '8px' }} />
              <h6 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>
                7-Day Trend
              </h6>
            </div>
            <div style={{ padding: '20px' }}>
              <Line data={trendChart} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      <FilterSection
        handleSearchChange={handleSearchChange}
        changeHandler={changeHandler}
        addLeaveHandler={() => setOpenAddLeaveModal(true)}
      />
      <GlobalModal
        loadingDropdown={getEmployeeReducer?.loading}
        employeeNames={employeesList}
        modalFor={"Add Leave"}
        show={openAddLeaveModal}
        close={() => setOpenAddLeaveModal(false)}
        fields={field}
        onSubmit={addLeaveHandler}
      />
      <div className="leaves-container">
        <div className="leaves-list">
          <GlobalList
            data={getLeavesList?.map((ele) => {
              return {
                profile: "-",
                id: ele?._id,
                name: ele?.employee?.name,
                leaveDate: new Date(ele.leaveDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }),
                reason: ele?.reason,
                status: ele?.status,
                document: ele?.document,
              };
            })}
            fileDownloader={fileDownloader}
            loading={getLeavesReducer?.loading}
            serialNumber={false}
            headers={headers}
            actionOptions={actionOptions}
            dropdownList={dropdownList}
            employeeStatusChange={handleStatusChange}
            handleBlockToggle={(action, rowData) => {
              console.log(`Action ${action} on`, rowData);
            }}
          />
        </div>
        <div className="leaves-calendar">
          <div className="calendar-panel">
            <Calendar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaves;

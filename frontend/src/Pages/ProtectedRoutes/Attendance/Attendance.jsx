import React from "react";
import GlobalList from "../../../Components/Globals/GlobalList/GlobalList";
import { useDispatch, useSelector } from "react-redux";
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
import { useEffect } from "react";
import {
  getEmployeeAction,
  updateEmployeeAction,
  updateEmployeeActionReset,
} from "../../../Redux/Employee/action";
import { useState } from "react";
import {
  showErrorToast,
  showSuccessToast,
} from "../../../Components/Toaster/ToasterServices";
import FilterSection from "./FilterSection/FilterSection";
import { useCallback } from "react";
import { debounce } from "lodash";
import { BarChart3, PieChart, TrendingUp, Users } from "lucide-react";

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

const Attendance = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const getEmployeeReducer = useSelector((state) => state?.getEmployeeReducer);
  const actionHandler = () => {};
  const employeesList = getEmployeeReducer?.data;
  const updateEmployeeReducer = useSelector(
    (state) => state?.updateEmployeeReducer
  );
  const [apiCall, setApiCall] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    const updateEmployee = updateEmployeeReducer?.data;
    if (!updateEmployee) return;

    if (updateEmployee?.status === 200) {
      showSuccessToast("Successfully Updated Employee");
      setApiCall((prev) => !prev);
    } else if (updateEmployee?.error) {
      showErrorToast(updateEmployee.error);
    }
    dispatch(updateEmployeeActionReset());
  }, [updateEmployeeReducer?.data]);
  const headers = [
    { id: "profile", label: "Profile" },
    { id: "name", label: "Employee Name" },
    { id: "position", label: "Position" },
    { id: "department", label: "Department" },
    { id: "task", label: "Task" },
    { id: "leaveStatus", label: "Status", type: "dropdown" },
  ];
  const dropdownList = ["Absent", "Present", "Medical Leave", "Work from Home"];
  const actionOptions = ["No Options Available!"];
  const employeeStatusChange = (newStatus, oldStatus, employeeId) => {
    dispatch(updateEmployeeAction({ employeeId, leaveStatus: newStatus }));
  };
  const formattedEmployees = employeesList?.data?.employees?.map((emp) => ({
    ...emp,
    joiningDate: new Date(emp.joiningDate).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  }));
  useEffect(() => {
    dispatch(getEmployeeAction({ status, search }));
  }, [apiCall, status, search]);
  const changeHandler = (value) => {
    setStatus(value);
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
  const getAttendanceAnalytics = () => {
    if (!formattedEmployees) return { statusCount: {}, departmentCount: {}, trendData: [] };
    
    const statusCount = formattedEmployees.reduce((acc, emp) => {
      acc[emp.leaveStatus] = (acc[emp.leaveStatus] || 0) + 1;
      return acc;
    }, {});

    const departmentCount = formattedEmployees.reduce((acc, emp) => {
      acc[emp.department] = (acc[emp.department] || 0) + 1;
      return acc;
    }, {});

    // Generate trend data (last 7 days)
    const trendData = Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      present: Math.floor(Math.random() * 20) + 15,
      absent: Math.floor(Math.random() * 5) + 1,
      wfh: Math.floor(Math.random() * 8) + 2,
    }));

    return { statusCount, departmentCount, trendData };
  };

  const analytics = getAttendanceAnalytics();

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
          "#28a745", // Success green
        ],
        borderWidth: 2,
        borderColor: "#fff",
      },
    ],
  };

  const departmentChart = {
    labels: Object.keys(analytics.departmentCount),
    datasets: [
      {
        label: "Employees",
        data: Object.values(analytics.departmentCount),
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
        label: "Present",
        data: analytics.trendData.map(d => d.present),
        borderColor: "#4d007d",
        backgroundColor: "rgba(77, 0, 125, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Absent",
        data: analytics.trendData.map(d => d.absent),
        borderColor: "#dc3545",
        backgroundColor: "rgba(220, 53, 69, 0.1)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Work from Home",
        data: analytics.trendData.map(d => d.wfh),
        borderColor: "#ffc107",
        backgroundColor: "rgba(255, 193, 7, 0.1)",
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

  return (
    <div className="container-fluid">
      <div className="row mb-4">
        <div className="col-12">
          <h4 className="mb-0">Attendance Management</h4>
          <p className="text-muted">Track and analyze employee attendance patterns</p>
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
                Department-wise
              </h6>
            </div>
            <div style={{ padding: '20px' }}>
              <Bar data={departmentChart} options={chartOptions} />
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

      {/* Employee List */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h6 className="mb-0">Employee Attendance List</h6>
            </div>
            <div className="card-body p-0">
              <FilterSection
                handleSearchChange={handleSearchChange}
                dropdownFor={status}
                changeHandler={changeHandler}
              />
              <GlobalList
                employeeStatusChange={employeeStatusChange}
                data={formattedEmployees}
                headers={headers}
                dropdownList={dropdownList}
                loading={getEmployeeReducer?.loading}
                actionOptions={actionOptions}
                handleBlockToggle={actionHandler}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;

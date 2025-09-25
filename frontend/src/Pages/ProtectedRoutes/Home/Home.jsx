import React, { useEffect, useState } from "react";
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
import { getCandidateAction } from "../../../Redux/Candidate/action";
import { getEmployeeAction } from "../../../Redux/Employee/action";
import { getLeaveAction } from "../../../Redux/Leave/action";
import { Users, UserCheck, Calendar, FileText, TrendingUp, Clock } from "lucide-react";

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

const Home = () => {
  const dispatch = useDispatch();
  const [dashboardData, setDashboardData] = useState({
    totalCandidates: 0,
    totalEmployees: 0,
    totalLeaves: 0,
    candidateStatus: {},
    attendanceStatus: {},
    leaveTrends: [],
  });

  const candidateReducer = useSelector((state) => state?.getCandidateReducer);
  const employeeReducer = useSelector((state) => state?.getEmployeeReducer);
  const leaveReducer = useSelector((state) => state?.getLeaveReducer);

  useEffect(() => {
    dispatch(getCandidateAction({}));
    dispatch(getEmployeeAction({}));
    dispatch(getLeaveAction({}));
  }, [dispatch]);

  useEffect(() => {
    if (candidateReducer?.data?.data) {
      const candidates = candidateReducer.data.data;
      const statusCount = candidates.reduce((acc, candidate) => {
        acc[candidate.status] = (acc[candidate.status] || 0) + 1;
        return acc;
      }, {});

      setDashboardData(prev => ({
        ...prev,
        totalCandidates: candidates.length,
        candidateStatus: statusCount,
      }));
    }
  }, [candidateReducer]);

  useEffect(() => {
    if (employeeReducer?.data?.data?.employees) {
      const employees = employeeReducer.data.data.employees;
      const attendanceCount = employees.reduce((acc, emp) => {
        acc[emp.leaveStatus] = (acc[emp.leaveStatus] || 0) + 1;
        return acc;
      }, {});

      setDashboardData(prev => ({
        ...prev,
        totalEmployees: employees.length,
        attendanceStatus: attendanceCount,
      }));
    }
  }, [employeeReducer]);

  useEffect(() => {
    if (leaveReducer?.data?.data) {
      const leaves = leaveReducer.data.data;
      setDashboardData(prev => ({
        ...prev,
        totalLeaves: leaves.length,
        leaveTrends: leaves.slice(0, 7), // Last 7 leaves for trend
      }));
    }
  }, [leaveReducer]);

  // Chart configurations with theme colors
  const candidateStatusChart = {
    labels: Object.keys(dashboardData.candidateStatus),
    datasets: [
      {
        data: Object.values(dashboardData.candidateStatus),
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

  const attendanceChart = {
    labels: Object.keys(dashboardData.attendanceStatus),
    datasets: [
      {
        label: "Employees",
        data: Object.values(dashboardData.attendanceStatus),
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

  const leaveTrendChart = {
    labels: dashboardData.leaveTrends.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: "Leave Requests",
        data: dashboardData.leaveTrends.map(() => Math.floor(Math.random() * 5) + 1),
        borderColor: "#4d007d",
        backgroundColor: "rgba(77, 0, 125, 0.1)",
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

  const StatCard = ({ title, value, icon: Icon, color, trend }) => {
    const getColorStyles = (color) => {
      const colors = {
        primary: { bg: '#4d007d', light: 'rgba(77, 0, 125, 0.1)' },
        success: { bg: '#28a745', light: 'rgba(40, 167, 69, 0.1)' },
        warning: { bg: '#ffc107', light: 'rgba(255, 193, 7, 0.1)' },
        info: { bg: '#17a2b8', light: 'rgba(23, 162, 184, 0.1)' },
      };
      return colors[color] || colors.primary;
    };

    const colorStyles = getColorStyles(color);

    return (
      <div className="col-md-3 mb-4">
        <div 
          style={{
            backgroundColor: '#fff',
            borderRadius: '16px',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
            height: '100%',
            padding: '20px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div 
            style={{
              padding: '12px',
              borderRadius: '50%',
              backgroundColor: colorStyles.light,
              marginRight: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Icon size={24} style={{ color: colorStyles.bg }} />
          </div>
          <div>
            <h6 style={{ 
              margin: 0, 
              color: '#666', 
              fontSize: '14px', 
              fontWeight: '500',
              marginBottom: '4px'
            }}>
              {title}
            </h6>
            <h4 style={{ 
              margin: 0, 
              color: '#333', 
              fontSize: '28px', 
              fontWeight: '700',
              marginBottom: '4px'
            }}>
              {value}
            </h4>
            {trend && (
              <small style={{ 
                color: trend > 0 ? '#28a745' : '#dc3545',
                fontSize: '12px',
                display: 'flex',
                alignItems: 'center'
              }}>
                <TrendingUp size={12} style={{ marginRight: '4px' }} />
                {trend}% from last month
              </small>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid p-4">
      <div className="row mb-4">
        <div className="col-12">
          <h2 className="mb-3">Dashboard Overview</h2>
          <p className="text-muted">Welcome to your HR Management Dashboard</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="row mb-4">
        <StatCard
          title="Total Candidates"
          value={dashboardData.totalCandidates}
          icon={Users}
          color="primary"
          trend={12}
        />
        <StatCard
          title="Active Employees"
          value={dashboardData.totalEmployees}
          icon={UserCheck}
          color="success"
          trend={8}
        />
        <StatCard
          title="Leave Requests"
          value={dashboardData.totalLeaves}
          icon={Calendar}
          color="warning"
          trend={-3}
        />
        <StatCard
          title="Pending Tasks"
          value="24"
          icon={Clock}
          color="info"
          trend={5}
        />
      </div>

      {/* Charts Row */}
      <div className="row mb-4">
        <div className="col-lg-6 mb-4">
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
                borderRadius: '16px 16px 0 0'
              }}
            >
              <h5 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Candidate Status Distribution
              </h5>
            </div>
            <div style={{ padding: '20px' }}>
              <Doughnut data={candidateStatusChart} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
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
                borderRadius: '16px 16px 0 0'
              }}
            >
              <h5 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Employee Attendance Status
              </h5>
            </div>
            <div style={{ padding: '20px' }}>
              <Bar data={attendanceChart} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Leave Trends */}
      <div className="row">
        <div className="col-12">
          <div 
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
          >
            <div 
              style={{
                backgroundColor: '#4d007d',
                color: 'white',
                padding: '16px 20px',
                borderRadius: '16px 16px 0 0'
              }}
            >
              <h5 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Leave Request Trends
              </h5>
            </div>
            <div style={{ padding: '20px' }}>
              <Line data={leaveTrendChart} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mt-4">
        <div className="col-12">
          <div 
            style={{
              backgroundColor: '#fff',
              borderRadius: '16px',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
            }}
          >
            <div 
              style={{
                backgroundColor: '#4d007d',
                color: 'white',
                padding: '16px 20px',
                borderRadius: '16px 16px 0 0'
              }}
            >
              <h5 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                Quick Actions
              </h5>
            </div>
            <div style={{ padding: '20px' }}>
              <div className="row">
                <div className="col-md-3 mb-2">
                  <button 
                    style={{
                      backgroundColor: '#4d007d',
                      color: 'white',
                      border: '1px solid #4d007d',
                      borderRadius: '20px',
                      padding: '8px 20px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#6f11a9';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#4d007d';
                    }}
                  >
                    <Users size={16} style={{ marginRight: '8px' }} />
                    Add Candidate
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button 
                    style={{
                      backgroundColor: '#28a745',
                      color: 'white',
                      border: '1px solid #28a745',
                      borderRadius: '20px',
                      padding: '8px 20px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#218838';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#28a745';
                    }}
                  >
                    <UserCheck size={16} style={{ marginRight: '8px' }} />
                    Add Employee
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button 
                    style={{
                      backgroundColor: '#ffc107',
                      color: '#333',
                      border: '1px solid #ffc107',
                      borderRadius: '20px',
                      padding: '8px 20px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#e0a800';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#ffc107';
                    }}
                  >
                    <Calendar size={16} style={{ marginRight: '8px' }} />
                    Mark Attendance
                  </button>
                </div>
                <div className="col-md-3 mb-2">
                  <button 
                    style={{
                      backgroundColor: '#17a2b8',
                      color: 'white',
                      border: '1px solid #17a2b8',
                      borderRadius: '20px',
                      padding: '8px 20px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#138496';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#17a2b8';
                    }}
                  >
                    <FileText size={16} style={{ marginRight: '8px' }} />
                    Process Leave
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

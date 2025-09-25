import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Navbar from "../../Components/Navbar/Navbar";
import "./PrivateLayout.css";

const Layout = () => {
  return (
    <div className="layout-container">
      <div className="sidebar-container">
        <Sidebar />
      </div>
      <div className="main-content">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="outlet-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;

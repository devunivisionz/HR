import React, { useState } from "react";
import "./Sidebar.css";
import { Link, useLocation } from "react-router-dom";
import {
  Users,
  UserCheck,
  Calendar,
  FileText,
  LogOut,
  Search,
} from "lucide-react";
import LogoutModal from "./LogoutModal/LogoutModal";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();
  const [openLogoutModal, setOpenLogoutModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const navigationItems = [
    {
      section: "Recruitment",
      items: [{ path: "/candidates", label: "Candidates", icon: Users }],
    },
    {
      section: "Organization",
      items: [
        { path: "/employees", label: "Employees", icon: UserCheck },
        { path: "/attendance", label: "Attendance", icon: Calendar },
        { path: "/leaves", label: "Leaves", icon: FileText },
      ],
    },
    {
      section: "Others",
      items: [{ path: "/logout", label: "Logout", icon: LogOut }],
    },
  ];

  // Filter based on search
  const filteredNavigation = navigationItems
    .map((section) => ({
      ...section,
      items: section.items.filter((item) =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((section) => section.items.length > 0);

  return (
    <div className={`custom-sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <LogoutModal
        show={openLogoutModal}
        close={() => setOpenLogoutModal(false)}
      />

      <div className="sidebar-logo">
        <div className="logo-icon">L</div>
        <span className="logo-text">LOGO</span>
      </div>

      <div className="sidebar-search">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <nav className="sidebar-nav">
        {filteredNavigation.map((section) => (
          <div key={section.section} className="nav-section">
            <div className="nav-section-title">{section.section}</div>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return item.label === "Logout" ? (
                <div
                  key={item.path}
                  className="nav-item"
                  onClick={() => setOpenLogoutModal(true)}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </div>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${isActive ? "active" : ""}`}
                  onClick={() => {
                    if (window.innerWidth <= 768) onToggle();
                  }}
                >
                  <Icon className="nav-icon" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

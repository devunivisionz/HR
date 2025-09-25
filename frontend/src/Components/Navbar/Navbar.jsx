import React from "react";
import "./Navbar.css";
import profileIcon from "../../../public/images/profileIcon.png";
import { BellDot, ChevronDown, Mail } from "lucide-react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="heading">Dashboard</div>
      <div className="profile-container">
        <Mail size={20} />
        <BellDot size={20} />
        <div className="profile-icon">
          <img src={profileIcon} alt="profile_icon" />
        </div>
        <ChevronDown size={20} color="#4D007D" />
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import { Outlet } from "react-router-dom";
import dashboardImgLoginPage from "../../../public/images/dashboardImgLoginPage.png";
import "../../Pages/Auth/Register/Register.css";
import Login from "../../Pages/Auth/Login/Login";

const AuthLayout = ({ children }) => {
  return (
    <div className="register-wrapper">
      <div className="left-panel">
        <div className="background-blurs">
          <div className="blur-circle blur1"></div>
          <div className="blur-circle blur2"></div>
          <div className="blur-circle blur3"></div>
        </div>

        <div className="dashboard-preview">
          <img
            src={dashboardImgLoginPage}
            width="100%"
            className="dashboard-card"
            alt="Dashboard Preview"
          />

          <div className="welcome-text">
            <h1>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </h1>
            <p>
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>

            <div className="carousel-dots" style={{ marginTop: "1.5rem" }}>
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

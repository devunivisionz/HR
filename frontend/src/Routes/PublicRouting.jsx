import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return !token ? children || <Outlet /> : <Navigate to="/home" />;
};

export default PublicRoute;

import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRouting";
import PublicRoute from "./PublicRouting";
import PublicLayout from "./Layout/PublicLayout";
import ProtectedLayout from "./Layout/PrivateLayout";
import { Loader } from "lucide-react";

// Lazy imports
const Register = lazy(() => import("../Pages/Auth/Register/Register"));
const Login = lazy(() => import("../Pages/Auth/Login/Login"));
const Home = lazy(() => import("../Pages/ProtectedRoutes/Home/Home"));
const Candidates = lazy(() =>
  import("../Pages/ProtectedRoutes/Candidates/Candidates")
);
const Employees = lazy(() =>
  import("../Pages/ProtectedRoutes/Employees/Employees")
);
const Attendance = lazy(() =>
  import("../Pages/ProtectedRoutes/Attendance/Attendance")
);
const Leaves = lazy(() => import("../Pages/ProtectedRoutes/Leaves/Leaves"));

const withSuspense = (Component) => (
  <Suspense
    fallback={
      <div className="full-page-loader">
        <Loader />
      </div>
    }
  >
    <Component />
  </Suspense>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <PublicLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "",
        element: <Login />,
      },
    ],
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <PublicLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "",
        element: <Register />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <ProtectedLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "home",
        element: withSuspense(Home),
      },
      {
        path: "candidates",
        element: withSuspense(Candidates),
      },
      {
        path: "employees",
        element: withSuspense(Employees),
      },
      {
        path: "attendance",
        element: withSuspense(Attendance),
      },
      {
        path: "leaves",
        element: withSuspense(Leaves),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />,
  },
]);

export default router;

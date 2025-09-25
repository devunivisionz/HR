// App.jsx
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // import styles

function GlobalToaster() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000} // 3 seconds
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored" // Bootstrap-like
      />
    </>
  );
}

export default GlobalToaster;

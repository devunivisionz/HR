// apiCore.js

import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: "http://localhost:8001",
  // baseURL: "https://mern-backend-zocv.onrender.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Or from cookies/session
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Unauthorized: force logout or redirect
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
export const apiServices = {
  get: async (url) => await api.get(url),

  post: (url, body) => api.post(url, body),

  update: async (url, body) => await api.put(url, body),

  deleteReq: async (url, params) => await api.delete(url, params),

  postFormData: (url, formData) =>
    api.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),

  updateFormData: (url, formData) =>
    api.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
};

export default api;

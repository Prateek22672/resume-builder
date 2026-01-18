import { BASE_URL } from "./apiPaths";
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error("Server error. Please try again later.");
        console.log("Using backend URL:", BASE_URL);

      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again.");
      console.log("Using backend URL:", BASE_URL);

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;


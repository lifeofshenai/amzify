import axios from "axios";
import Cookies from "js-cookie"; 

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://amzify-api.onrender.com/api/v1",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor to attach the JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken"); // Get the auth token from cookies
    if (token) {
      // Attach token to Authorization header if it exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle responses
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      // If unauthorized, handle token expiration or invalid token
      console.log("Unauthorized! Redirecting to login.");
      // Optionally, clear cookies and redirect to login
      Cookies.remove("authToken");
      window.location.href = "/"; 
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;

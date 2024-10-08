// src/context/AuthContext.js

import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode"; // Corrected import
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import authService from "../services/authService";

// Create context for authentication
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store the user object
  const [role, setRole] = useState(null); // Store the user role (admin, vendor, etc.)
  const [loading, setLoading] = useState(true); // Loading state for async operations
  const navigate = useNavigate();

  // Function to login the user
  const login = async (email, password) => {
    try {
      const { user, token } = await authService.login(email, password); // Retrieve user and token

      // Store user in state
      setUser(user);
      setRole(user.role);

      // Store token in cookies (handled here to centralize token management)
      Cookies.set("authToken", token, { expires: 1 }); // Token expires in 1 day

      // Optionally, navigate to a protected route or dashboard
      navigate("/dashboard"); // Change "/dashboard" to your desired route

      // Return user data
      return { user, role: user.role };
    } catch (error) {
      console.error("Login failed:", error);
      // Handle the error gracefully
      toast.error(error.message || "Login failed, please try again.");
      throw error; // Re-throw to allow further handling if needed
    }
  };

  // Function to check if user is already logged in via cookies
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      try {
        // Decode token and get user information from it
        const decoded = jwtDecode(token);
        setUser(decoded);
        setRole(decoded.role);
      } catch (decodeError) {
        console.error("Token decoding failed:", decodeError);
        // If token is invalid, remove it
        Cookies.remove("authToken");
      }
    }
    setLoading(false);
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
      setRole(null);

      // Clear cookies and redirect
      Cookies.remove("authToken");
      navigate("/");
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to logout, please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

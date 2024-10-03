import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import Cookies from "js-cookie"; 
import { toast } from "react-toastify";
import {jwtDecode }from "jwt-decode"; 

// Create context for authentication
const AuthContext = createContext();

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

    // Store token in cookies (you may want to use HttpOnly for security in production)
    Cookies.set("authToken", token, { expires: 1 }); // Token expires in 1 day

    // Return user data (no need to throw any errors after success)
    return { user, role: user.role };
  } catch (error) {
    console.error("Login failed:", error);
    // Handle the error gracefully
    throw new Error(
      error?.response?.data?.message || "Login failed, please try again."
    );
  }
};


  // Function to check if user is already logged in via cookies
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      // Decode token and get user information from it
      const decoded = jwtDecode(token);
      setUser(decoded);
      setRole(decoded.role);
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

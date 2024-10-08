// src/services/authService.js

import axiosInstance from "./instantAxios";

const authService = {
  // Login user and return user data and token
  login: async (email, password) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      if (response.data.type === "Success") {
        const { user, token } = response.data.data;
        // Token is already handled by AuthContext; avoid setting cookies here to prevent duplication
        return { user, token };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      // Extract meaningful error messages
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        throw new Error(error.response.data.message);
      }
      throw new Error("An error occurred during login.");
    }
  },

  // Logout user
  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");
      // Token removal is handled by AuthContext; avoid manipulating cookies here
    } catch (error) {
      console.error("Logout error:", error);
      throw new Error("An error occurred during logout.");
    }
  },
};

export default authService;

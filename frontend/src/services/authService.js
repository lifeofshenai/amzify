import Cookies from "js-cookie";
import axiosInstance from "../services/instantAxios";

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

        // Store the token in cookies
        Cookies.set("authToken", token, { expires: 1 }); // Expires in 1 day
        return { user, token };
      } else {
        throw new Error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Logout user and clear cookies
  logout: async () => {
    try {
      await axiosInstance.get("/auth/logout");

      // Clear the auth token from cookies
      Cookies.remove("authToken");
      localStorage.clear();
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  },
};

export default authService;

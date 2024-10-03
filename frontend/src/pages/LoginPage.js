import React, { useState } from "react";
import { AiOutlineLock, AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext"; // Import useAuth hook

const LoginPage = () => {
  const { login } = useAuth(); // Use login function from the context
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // Loading state for button
  const navigate = useNavigate(); // For navigation after login

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading indicator

    try {
      // Attempt login
      const loggedInUser = await login(credentials.email, credentials.password);

      // Clear any error since the login was successful
      toast.success("Logged in successfully!");

      // Role-based redirection (redirect based on user's role)
      if (loggedInUser.role === "admin") {
        navigate("/admin");
      } else if (loggedInUser.role === "vendor") {
        navigate("/vendor");
      } else {
        navigate("/"); // Default fallback route
      }
    } catch (err) {
      // Show error toast based on server response or default error
      const errorMessage = err?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="main-layout">
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* Card starts here */}
        <div className="card w-full max-w-md bg-white shadow-lg shadow-pink-600 p-4">
          <div className="card-body">
            {/* AMZIFY Logo and Description */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-pink-700">AMZIFY</h1>
              <p className="mt-2 text-gray-600">Login to your account.</p>
            </div>

            {/* Form */}
            <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your email</span>
                </label>
                <div className="relative">
                  <AiOutlineMail
                    className="absolute left-3 top-3 text-gray-400"
                    size={24}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="input input-bordered w-full pl-10"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your password</span>
                </label>
                <div className="relative">
                  <AiOutlineLock
                    className="absolute left-3 top-3 text-gray-400"
                    size={24}
                  />
                  <input
                    type="password"
                    name="password"
                    placeholder="Your password"
                    className="input input-bordered w-full pl-10"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn bg-pink-700 w-full text-white"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
        {/* Card ends here */}
      </div>
    </div>
  );
};

export default LoginPage;

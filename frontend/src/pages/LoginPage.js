
import React from "react";
import { Link } from "react-router-dom"; 
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai"; 

const MainLayout = () => {
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
            <form className="mt-4 space-y-6">
              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your email</span>
                </label>
                <div className="relative">
                  <AiOutlineMail className="absolute left-3 top-3 text-gray-400" size={24} />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Enter your password</span>
                </label>
                <div className="relative">
                  <AiOutlineLock className="absolute left-3 top-3 text-gray-400" size={24} />
                  <input
                    type="password"
                    placeholder="Your password"
                    className="input input-bordered w-full pl-10"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn bg-pink-700 w-full text-white">
                Login
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-4">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <Link to="/signup" className="text-pink-700 hover:underline">
                  Sign up here
                </Link>
              </p>
            </div>
          </div>
        </div>
        {/* Card ends here */}
      </div>
    </div>
  );
};

export default MainLayout;

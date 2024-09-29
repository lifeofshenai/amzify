// src/pages/LoginPage.js

import React from "react";
import AuthLayout from "../layouts/auth/index";

const LoginPage = () => {
  return (
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary">AMZIFY</h1>
        <p className="mt-2 text-gray-600">Login to your account.</p>
        <form className="mt-6 space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Your password"
              className="input input-bordered w-full"
            />
          </div>
          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>
        </form>
      </div>

  );
};

export default LoginPage;

import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";

const SidebarVendor = () => {
  const { isSidebarOpen } = useGlobalContext();

  return (
    <aside
      className={`bg-white shadow-lg w-64 p-6 h-screen fixed md:static transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 z-50`}
    >
      {/* Brand Logo */}
      <div className="flex items-center justify-start mb-8">
        <h1 className="text-pink-600 text-3xl font-bold">AMZIFY</h1>
      </div>

      {/* Navigation Links */}
      <nav className="space-y-2">
        <ul className="text-gray-700">
          <li>
            <Link
              to="/vendor"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-pink-500 text-white"
            >
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/vendor/products"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-pink-100"
            >
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link
              to="/vendor/orders"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-pink-100"
            >
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link
              to="/vendor/analytics"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-pink-100"
            >
              <span>Analytics</span>
            </Link>
          </li>
          <li>
            <Link
              to="/vendor/messages"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-pink-100"
            >
              <span>Messages</span>
            </Link>
          </li>
          <li>
            <Link
              to="/vendor/payments"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-pink-100"
            >
              <span>Payments</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Help & Support / Settings */}
      <div className="mt-10 space-y-2">
        <ul className="text-gray-500">
          <li>
            <Link
              to="/help"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-pink-100"
            >
              <span>Help & Support</span>
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-pink-100"
            >
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SidebarVendor;

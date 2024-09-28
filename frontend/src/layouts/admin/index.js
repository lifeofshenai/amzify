import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar with fixed width */}
      <div className="w-72">
        <Sidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Navbar (spanning full width of content area) */}
        <Navbar />

        {/* Page content area */}
        <div className="p-4 flex-grow">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

import React from "react";
import SidebarVendor from "../../components/SidebarVendor";
import Header from "../../components/Header";
import { Outlet } from "react-router-dom";

const VendorLayout = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarVendor />
      <div className="flex-1">
        <Header />
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;

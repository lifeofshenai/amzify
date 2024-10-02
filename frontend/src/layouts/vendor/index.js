import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import VendorSidebar from "../../components/VendorSidebar";

const VendorLayout = () => {

  return (
    <div className="flex h-full w-full">
      {/* Sidebar at the top */}
      <VendorSidebar />

      {/* Navbar & Main Content */}
      <div className="h-full w-full bg-lightPrimary dark:!bg-navy-900">
        {/* Main Content */}
        <main
          className={`mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[260px]`}
        >
          <div className="h-full">
            <Navbar />
            <div className="pt-5s mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2">
              <Outlet />
            </div>
            <div className="p-3">{/* <Footer /> */}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default VendorLayout;

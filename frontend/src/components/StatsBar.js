// components/StatsBar.js
import React, { useState } from "react";
import {
  FaClock,
  FaTrash,
  FaUserCheck,
  FaUsers,
  FaUserTimes,
} from "react-icons/fa";
import { DUMMY_DATA } from "../constants/data";
import VendorCard from "./VendorCard";
import VendorTable from "./VendorTable";

const StatsBar = () => {
  const [activeTab, setActiveTab] = useState("all-vendors");

  // Function to return data based on the active tab
  const getTableData = () => {
    switch (activeTab) {
      case "all-vendors":
        return DUMMY_DATA.allVendors;
      case "active-vendors":
        return DUMMY_DATA.activeVendors;
      case "suspended-vendors":
        return DUMMY_DATA.suspendedVendors;
      case "awaiting-approval":
        return DUMMY_DATA.awaitingApproval;
      case "deleted-vendors":
        return DUMMY_DATA.deletedVendors;
      default:
        return [];
    }
  };

  return (
    <div>
      <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <VendorCard
          icon={<FaUsers className="text-3xl text-pink-700" />}
          title="All Vendors"
          count={DUMMY_DATA.allVendors.length}
          active={activeTab === "all-vendors"}
          onClick={() => setActiveTab("all-vendors")}
          borderColor="border-pink-700"
        />
        <VendorCard
          icon={<FaUserCheck className="text-3xl text-green-500" />}
          title="Active Vendors"
          count={DUMMY_DATA.activeVendors.length}
          active={activeTab === "active-vendors"}
          onClick={() => setActiveTab("active-vendors")}
          borderColor="border-green-500"
        />
        <VendorCard
          icon={<FaUserTimes className="text-3xl text-red-500" />}
          title="Suspended Vendors"
          count={DUMMY_DATA.suspendedVendors.length}
          active={activeTab === "suspended-vendors"}
          onClick={() => setActiveTab("suspended-vendors")}
          borderColor="border-red-500"
        />
        <VendorCard
          icon={<FaClock className="text-3xl text-yellow-500" />}
          title="Awaiting Approval"
          count={DUMMY_DATA.awaitingApproval.length}
          active={activeTab === "awaiting-approval"}
          onClick={() => setActiveTab("awaiting-approval")}
          borderColor="border-yellow-500"
        />
        <VendorCard
          icon={<FaTrash className="text-3xl text-gray-500" />}
          title="Deleted Vendors"
          count={DUMMY_DATA.deletedVendors.length}
          active={activeTab === "deleted-vendors"}
          onClick={() => setActiveTab("deleted-vendors")}
          borderColor="border-gray-500"
        />
      </div>

      {/* Table of Vendors based on active tab */}
      <div className="mt-8">
        <VendorTable data={getTableData()} />
      </div>
    </div>
  );
};

export default StatsBar;

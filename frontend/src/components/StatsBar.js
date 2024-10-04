import React, { useEffect, useState } from "react";
import { FaClock, FaUserCheck, FaUsers, FaUserTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import axiosInstance from "../services/instantAxios";
import LoadingSpinner from "./LoadingSpinner";
import VendorCard from "./VendorCard";
import VendorTable from "./VendorTable";

const StatsBar = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all-vendors");
  const [vendorsData, setVendorsData] = useState({
    allVendors: [],
    activeVendors: [],
    suspendedVendors: [],
    awaitingApproval: [],
    deletedVendors: [],
  });

  // Fetch vendor data from server
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await axiosInstance.get("/vendors");
        const stores = response.data.data.stores;
        // Organize vendors into different categories
        const allVendors = stores;
        const activeVendors = stores.filter((store) => store.vendor.isActive);
        const suspendedVendors = stores.filter(
          (store) => !store.vendor.isActive && store.isActive
        );
        const awaitingApproval = stores.filter((store) => !store.isActive);

        setVendorsData({
          allVendors,
          activeVendors,
          suspendedVendors,
          awaitingApproval,
        });

        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch vendor details.");
        console.error("Error fetching vendors:", error);
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  // Function to return data based on the active tab
  const getTableData = () => {
    switch (activeTab) {
      case "all-vendors":
        return vendorsData.allVendors;
      case "active-vendors":
        return vendorsData.activeVendors;
      case "suspended-vendors":
        return vendorsData.suspendedVendors;
      case "awaiting-approval":
        return vendorsData.awaitingApproval;
      case "deleted-vendors":
        return vendorsData.deletedVendors;
      default:
        return [];
    }
  };

  return (
    <div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <VendorCard
            icon={<FaUsers className="text-3xl text-pink-700" />}
            title="All Vendors"
            count={vendorsData.allVendors.length}
            active={activeTab === "all-vendors"}
            onClick={() => setActiveTab("all-vendors")}
            borderColor="border-pink-700"
          />
          <VendorCard
            icon={<FaUserCheck className="text-3xl text-green-500" />}
            title="Active Vendors"
            count={vendorsData.activeVendors.length}
            active={activeTab === "active-vendors"}
            onClick={() => setActiveTab("active-vendors")}
            borderColor="border-green-500"
          />
          <VendorCard
            icon={<FaUserTimes className="text-3xl text-red-500" />}
            title="Suspended Vendors"
            count={vendorsData.suspendedVendors.length}
            active={activeTab === "suspended-vendors"}
            onClick={() => setActiveTab("suspended-vendors")}
            borderColor="border-red-500"
          />
          <VendorCard
            icon={<FaClock className="text-3xl text-yellow-500" />}
            title="Awaiting Approval"
            count={vendorsData.awaitingApproval.length}
            active={activeTab === "awaiting-approval"}
            onClick={() => setActiveTab("awaiting-approval")}
            borderColor="border-yellow-500"
          />
        </div>
      </div>

      {/* Table of Vendors based on active tab */}
      <div className="mt-8">
        {loading ? <LoadingSpinner /> : <VendorTable data={getTableData()} />}
      </div>
    </div>
  );
};

export default StatsBar;

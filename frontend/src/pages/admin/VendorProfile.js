import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCheck,
  FaEnvelope,
  FaLink,
  FaStoreAlt,
  FaTimes,
  FaArrowLeft,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/LoadingSpinner";
import axiosInstance from "../../services/instantAxios";

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
   const navigate = useNavigate();

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axiosInstance.get(`/vendors/${vendorId}`);
        const vendorData = response.data.data.store;
        setVendor(vendorData);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch vendor details.");
        console.error("Error fetching vendor details:", error);
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, [vendorId]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!vendor) {
    return <div>{toast.info(`No Vendor found with ID ${vendorId}`)}</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex items-center justify-between mb-6">
        <button
          className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-focus"
          onClick={() => navigate(-1)} // Navigate back to the previous page or vendor list
        >
          <FaArrowLeft className="mr-2" />
          Back to Vendors
        </button>
      </div>
      <div className="bg-base-100 shadow-lg rounded-lg p-8 flex flex-col lg:flex-row lg:space-x-12">
        {/* Left Column - Vendor Information */}
        <div className="lg:w-1/2">
          <div className="flex items-center space-x-6">
            <img
              src={vendor.vendor.pictureUrl}
              alt={vendor.vendor.firstName}
              className="w-24 h-24 rounded-full mb-4 border-4 border-pink-700"
            />
            <div className="">
              <h2 className="text-lg font-bold text-pink-700 mb-3">
                {`${vendor.vendor.firstName} ${vendor.vendor.lastName}`}
              </h2>
              <p className="text-gray-500 flex items-center">
                <FaEnvelope className="mr-2 text-secondary" />
                {vendor.vendor.email}
              </p>
              <p
                className={`flex items-center mt-2 ${
                  vendor.vendor.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {vendor.vendor.isActive ? (
                  <>
                    <FaCheck className="mr-2" />
                    Active Vendor
                  </>
                ) : (
                  <>
                    <FaTimes className="mr-2" />
                    Inactive Vendor
                  </>
                )}
              </p>
              <p className="flex items-center mt-2">
                <FaCalendarAlt className="mr-2 text-accent" />
                Created on:{" "}
                {new Date(vendor.vendor.createdAt).toLocaleDateString()}
              </p>
              <p className="flex items-center mt-2">
                <FaCalendarAlt className="mr-2 text-accent" />
                Last login:{" "}
                {new Date(vendor.vendor.lastLogin).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Store Information */}
        <div className="lg:w-1/2">
          <h3 className="text-xl font-semibold text-accent">
            Store Information
          </h3>
          <div className="flex items-center mt-4">
            <img
              src={vendor.logo}
              alt={vendor.name}
              className="w-16 h-16 rounded-lg border-2 border-gray-300 mr-4"
            />
            <div>
              <p className="text-2xl font-semibold">{vendor.name}</p>
              <p className="text-gray-600 mt-2">{vendor.description}</p>
              <a
                href={vendor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 mt-2 hover:underline"
              >
                <FaLink className="mr-2" /> Visit Store
              </a>
            </div>
          </div>

          {/* Additional Store Details */}
          <div className="mt-6 space-y-2">
            <p className="flex items-center">
              <FaStoreAlt className="mr-2 text-secondary" />
              Shopify Store ID: {vendor.shopifyStoreId}
            </p>
            <p
              className={`flex items-center ${
                vendor.isActive ? "text-green-600" : "text-red-600"
              }`}
            >
              {vendor.isActive ? (
                <>
                  <FaCheck className="mr-2" />
                  Store is Active
                </>
              ) : (
                <>
                  <FaTimes className="mr-2" />
                  Store is Inactive
                </>
              )}
            </p>
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 text-accent" />
              Store Created on:{" "}
              {new Date(vendor.createdAt).toLocaleDateString()}
            </p>
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 text-accent" />
              Store Updated on:{" "}
              {new Date(vendor.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorProfile;

import { motion } from "framer-motion";
import React from "react";
import {
  FaAudioDescription,
  FaBuilding,
  FaCalendarAlt,
  FaEnvelope,
  FaLink,
  FaStore,
  FaUser,
} from "react-icons/fa";

// Vendor Info Component
const VendorInfo = React.memo(({ vendorDetails }) => {
  const {
    firstName,
    lastName,
    email,
    role,
    lastLogin,
    createdAt: vendorCreatedAt,
    updatedAt: vendorUpdatedAt,
    isActive: isActiveVendor,
    pictureUrl,
  } = vendorDetails.vendorDetails || {}; // Accessing nested vendorDetails

  // Destructuring store-level information
  const {
    name,
    description,
    url,
    isActive: storeActive,
    createdAt: storeCreatedAt,
    updatedAt: storeUpdatedAt,
    platforms = [],
  } = vendorDetails || {}; // Accessing top-level vendorDetails

  // Format dates if they exist
  const formattedLastLogin = lastLogin
    ? new Date(lastLogin).toLocaleDateString()
    : "N/A";
  const formattedVendorCreatedAt = vendorCreatedAt
    ? new Date(vendorCreatedAt).toLocaleDateString()
    : "N/A";
  const formattedVendorUpdatedAt = vendorUpdatedAt
    ? new Date(vendorUpdatedAt).toLocaleDateString()
    : "N/A";
  const formattedStoreCreatedAt = storeCreatedAt
    ? new Date(storeCreatedAt).toLocaleDateString()
    : "N/A";
  const formattedStoreUpdatedAt = storeUpdatedAt
    ? new Date(storeUpdatedAt).toLocaleDateString()
    : "N/A";

  return (
    <motion.div
      className="flex flex-col md:flex-row p-4 bg-white shadow-md rounded-lg w-full max-w-5xl mx-auto"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Vendor Information Section */}
      <div className="flex-1 p-4 border-b md:border-b-0 md:border-r">
        <h3 className="text-xl font-bold mb-4">Vendor Information</h3>
        {/* Vendor Picture */}
        {pictureUrl ? (
          <div className="mb-4">
            <img
              src={pictureUrl}
              alt={`${firstName} ${lastName}`}
              className="w-24 h-24 rounded-full object-cover shadow-md"
            />
          </div>
        ) : (
          <div className="mb-4 w-24 h-24 rounded-full bg-gray-300" />
        )}
        {/* Vendor Name */}
        <div className="flex items-center mb-2">
          <FaUser className="text-gray-600 mr-2" />
          <span>
            {firstName} {lastName}
          </span>
        </div>
        {/* Vendor Status */}
        <div className="flex items-center mb-2">
          <span className="text-gray-600 font-bold mr-2">Status:</span>
          <span>{isActiveVendor ? "Active" : "Inactive"}</span>
        </div>
        {/* Vendor Email */}
        <div className="flex items-center mb-2">
          <FaEnvelope className="text-gray-600 mr-2" />
          <span>{email}</span>
        </div>
        {/* Vendor Role */}
        <div className="flex items-center mb-2">
          <FaBuilding className="text-gray-600 mr-2" />
          <span>Role: {role}</span>
        </div>
        {/* Last Login */}
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <span>Last Login: {formattedLastLogin}</span>
        </div>
        {/* Vendor Created At */}
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <span>Created At: {formattedVendorCreatedAt}</span>
        </div>
        {/* Vendor Updated At */}
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <span>Updated At: {formattedVendorUpdatedAt}</span>
        </div>
      </div>

      {/* Store Information Section */}
      <div className="flex-1 p-4">
        <h3 className="text-xl font-bold mb-4">Store Information</h3>
        {/* Store Name */}
        <div className="flex items-center mb-2">
          <FaStore className="text-gray-600 mr-2" />
          <span>{name}</span>
        </div>
        {/* Store Description */}
        <div className="flex items-center mb-2">
          <FaAudioDescription className="text-gray-600 mr-2" />
          <span>{description || "No description available"}</span>
        </div>
        {/* Store Status */}
        <div className="flex items-center mb-2">
          <span className="text-gray-600 font-bold mr-2">Status:</span>
          <span>{storeActive ? "Active" : "Inactive"}</span>
        </div>
        {/* Store Created At */}
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <span>Created At: {formattedStoreCreatedAt}</span>
        </div>
        {/* Store Updated At */}
        <div className="flex items-center mb-2">
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <span>Updated At: {formattedStoreUpdatedAt}</span>
        </div>
        {/* Platforms */}
        {platforms.length > 0 ? (
          <div className="flex items-center mb-2">
            <span className="text-gray-600 font-bold mr-2">Platforms:</span>
            {platforms.map((platform, index) => (
              <span key={index} className="mr-2">
                {platform}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex items-center mb-2">
            <span className="text-gray-600 font-bold mr-2">Platforms:</span>
            <span>N/A</span>
          </div>
        )}
        {/* Website URL */}
        {url ? (
          <div className="flex items-center mb-2">
            <FaLink className="text-gray-600 mr-2" />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {url}
            </a>
          </div>
        ) : (
          <div className="flex items-center mb-2">
            <FaLink className="text-gray-600 mr-2" />
            <span className="text-gray-600">No URL available</span>
          </div>
        )}
      </div>
    </motion.div>
  );
});



export default VendorInfo;

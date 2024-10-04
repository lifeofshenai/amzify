import { motion } from "framer-motion";
import React from "react";
import { FaBuilding, FaEnvelope, FaStore, FaUser } from "react-icons/fa";

// Vendor Info Component
const VendorInfo = ({ store }) => {

  return (
    <motion.div
      className="flex p-4 bg-white shadow-md rounded-lg w-full max-w-5xl mx-auto"
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Vendor Information Section */}
      <div className="flex-1 p-4 border-r">
        <h3 className="text-xl font-bold mb-2">Vendor Information</h3>
        <div className="flex items-center mb-2">
          <FaUser className="text-gray-600 mr-2" />
          <span>{/* {firstName} {lastName} */} Name of Vendor</span>
        </div>
        <div className="flex items-center mb-2">
          <FaEnvelope className="text-gray-600 mr-2" />
          {/* <span>{email}</span> */} Email
        </div>
        {/* {platforms.length > 0 && (
          <div className="flex items-center mb-2">
            <span className="text-gray-600 font-bold mr-2">Platforms:</span>
            {platforms.map((platform, index) => (
              <span key={index} className="mr-2">
                {platform}
              </span>
            ))}
          </div>
        )} */} platforms
      </div>

      {/* Company Information Section */}
      <div className="flex-1 p-4 border-r flex flex-col items-center">
        <h3 className="text-xl font-bold mb-2">Company Information</h3>
        {/* {companyLogo && (
          <div className="mb-2">
            <img
              src={companyLogo}
              alt={`${companyName} Logo`}
              className="w-16 h-16 rounded-full"
            />
          </div>
        )} */}
        <p>company logo</p>
        <div className="flex items-center mb-2 justify-center">
          <FaBuilding className="text-gray-600 mr-2" />
          {/* <span>{companyName}</span> */} company name
        </div>
        {/* <p className="text-gray-600 mb-2">{companyDescription}</p> */}{" "}
        company description
        {/* {companyUrl && (
          <div className="flex items-center mb-2">
            <FaLink className="text-gray-600 mr-2" />
            <a
              href={companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Visit Website
            </a>
          </div>
        )} */}{" "}
        company url
      </div>

      {/* Store Information Section */}
      <div className="flex-1 p-4">
        <h3 className="text-xl font-bold mb-2">Store Information</h3>
        <div className="flex items-center mb-2">
          <FaStore className="text-gray-600 mr-2" />
          {/* <span>{companyName}</span> */} store name
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 font-bold mr-2">Status:</span>
          {/* <span>{isActive ? "Active" : "Inactive"}</span> */} status
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 font-bold mr-2">Created At:</span>
          {/* <span>{new Date(createdAt).toLocaleDateString()}</span> */}{" "}
          created at
        </div>
        <div className="flex items-center mb-2">
          <span className="text-gray-600 font-bold mr-2">Updated At:</span>
          {/* <span>{new Date(updatedAt).toLocaleDateString()}</span> */}{" "}
          updated at
        </div>
      </div>
    </motion.div>
  );
};

export default VendorInfo;

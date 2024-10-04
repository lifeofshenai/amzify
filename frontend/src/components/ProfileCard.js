import React from "react";
import { FaEnvelope, FaPhone } from "react-icons/fa";

// Profile Card Component
const ProfileCard = () => {
  return (
    <div className="flex items-center p-4 bg-white shadow-md rounded-lg">
      {/* Vendor Profile Image */}
      <img
        src="https://via.placeholder.com/100"
        alt="Vendor"
        className="w-20 h-20 rounded-full border-2 border-gray-300 shadow-sm"
      />
      <div className="ml-4">
        {/* Profile Info */}
        <h2 className="text-gray-800 text-lg font-bold">Vendor Profile</h2>
        <p className="text-gray-600 flex items-center">
          <FaEnvelope className="mr-2" /> vendor@email.com
        </p>
        <p className="text-gray-600 flex items-center">
          <FaPhone className="mr-2" /> +23339901309
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;

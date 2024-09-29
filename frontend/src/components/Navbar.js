import React, { useState } from "react";
import {
  FaBell,
  FaBars,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { useGlobalContext } from "../context";
import { user } from "../constants/data";



const Navbar = ({ onToggleSidebar }) => {
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { toggleSidebar } = useGlobalContext();


  return (
    <div className="navbar bg-base-100 shadow-lg p-4">
      <div className="flex-1">
        {/* Sidebar Toggle Button */}
        <button onClick={toggleSidebar} className="btn btn-ghost lg:hidden">
          <FaBars className="text-xl" />
        </button>
        <div className="form-control hidden lg:block">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered rounded-full"
          />
        </div>
      </div>
      <div className="flex-none gap-2">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setNotificationOpen(true)}
            className="btn btn-ghost"
          >
            <FaBell className="text-xl" />
          </button>
          {/* Notification Modal */}
          <input
            type="checkbox"
            id="notification-modal"
            className="modal-toggle"
            checked={isNotificationOpen}
            onChange={() => setNotificationOpen(!isNotificationOpen)}
          />
          <label htmlFor="notification-modal" className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              <h2 className="text-lg font-bold">Notifications</h2>
              <p>No new notifications</p>
              <div className="modal-action">
                <label htmlFor="notification-modal" className="btn">
                  Close
                </label>
              </div>
            </label>
          </label>
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className="btn btn-ghost rounded-full"
          >
            <img
              src={user.profileImage}
              alt="Profile"
              className="w-10 h-10 rounded"
            />
          </button>
          <span className="ml-2">{user.name}</span>
          <span className="ml-1 text-sm text-gray-500">{user.role}</span>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 p-2 bg-white shadow-lg rounded-lg z-10">
              <p className="hover:bg-gray-100 p-2 rounded">{user.name}</p>
              <p className="hover:bg-gray-100 p-2 rounded">{user.email}</p>
              <p className="hover:bg-gray-100 p-2 rounded">{user.phone}</p>
              <hr className="my-2" />
              <div className="flex justify-around mb-2">
                <a
                  href={user.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaFacebook className="text-xl text-blue-600" />
                </a>
                <a href={user.socials.twitter} target="_blank" rel="noreferrer">
                  <FaTwitter className="text-xl text-blue-400" />
                </a>
                <a
                  href={user.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaLinkedin className="text-xl text-blue-500" />
                </a>
                <a
                  href={user.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaInstagram className="text-xl text-pink-600" />
                </a>
              </div>
              <p className="hover:bg-gray-100 p-2 rounded">Logout</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

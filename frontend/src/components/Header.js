import React, { useState } from 'react';
import { FaBell, FaBars } from 'react-icons/fa';
import { useGlobalContext } from '../context';

const Header = ({ onToggleSidebar }) => {
  const { toggleSidebar } = useGlobalContext();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-pink-50 flex justify-between items-center px-4 py-2 shadow-md">
      {/* Sidebar Toggle for mobile view */}
      <div className="flex items-center space-x-4">
        <button 
          className="text-xl md:hidden" 
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-auto md:mx-0">
          <input
            type="text"
            className="w-full rounded-full px-4 py-2 bg-white shadow-inner border border-gray-200 focus:outline-none focus:ring focus:ring-pink-300"
            placeholder="Search..."
          />
        </div>
      </div>

      {/* Notification Bell and User Profile */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <button
            className="text-gray-600 relative"
            onClick={() => setNotificationOpen(!isNotificationOpen)}
          >
            <FaBell className="text-xl" />
            {/* Notification dot */}
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600"></span>
          </button>

          {/* Dropdown Notifications */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition duration-300 ease-in-out transform origin-top-right scale-100">
              <ul className="divide-y divide-gray-100">
                <li className="p-4 hover:bg-gray-100 transition-colors duration-150">No new notifications</li>
              </ul>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            className="flex items-center space-x-2"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <img
              src="https://via.placeholder.com/40"
              alt="User Profile"
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-gray-700 hidden md:inline">Halle Jaay</span>
          </button>

          {/* User Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 transition duration-300 ease-in-out transform origin-top-right scale-100">
              <ul className="divide-y divide-gray-100">
                <li className="p-4 hover:bg-gray-100 transition-colors duration-150 cursor-pointer">Profile</li>
                <li className="p-4 hover:bg-gray-100 transition-colors duration-150 cursor-pointer">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

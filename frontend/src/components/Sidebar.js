import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; // Import useLocation
import { links } from "../constants/data";
import { HiX } from "react-icons/hi";
import { useGlobalContext } from "../context";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, openSidebar } = useGlobalContext();
  const location = useLocation(); // Get the current route

  // Add a hook to handle sidebar visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        openSidebar(); // Ensure sidebar is open on large screens
      }
    };

    // Run once on component mount
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar]);

  return (
    <div
      className={`duration-175 linear fixed z-50 flex min-h-full flex-col bg-white pb-10 shadow-2xl shadow-white/5 transition-all dark:bg-navy-800 dark:text-white ${
        isSidebarOpen || window.innerWidth >= 1024
          ? "translate-x-0"
          : "-translate-x-96"
      }`}
    >
      {/* Close Button for Small Screens */}
      <span
        className="absolute top-4 right-4 block cursor-pointer md:hidden"
        onClick={closeSidebar}
      >
        <HiX className="h-6 w-6" />
      </span>

      {/* Logo */}
      <div className="mx-14 mt-7 flex items-center">
        <div className="h-2.5 font-poppins text-2xl font-bold uppercase text-pink-700 dark:text-white">
          AMZIFY
        </div>
      </div>

      {/* Divider */}
      <div className="mt-14 mb-7 h-px bg-gray-300 dark:bg-white/30" />

      {/* Navigation Links */}
      <ul className="mb-auto pt-1 px-5 rounded-lg shadow-lg">
        {links.map((link) => (
          <Link
            to={link.url}
            key={link.id}
            className={`flex items-center p-2 mb-2 rounded-lg ${
              location.pathname === link.url // Check if the link is active
                ? "bg-pink-700 text-white" // Active styles
                : "hover:bg-gray-700 hover:text-white" // Inactive styles
            }`}
          >
            {link.icon}
            <span className="ml-3">{link.text}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

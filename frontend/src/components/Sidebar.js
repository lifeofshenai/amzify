import React, { useEffect } from "react";
import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { links } from "../constants/data";
import { useSidebarContext } from "../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, openSidebar } = useSidebarContext();

  // Add a hook to handle sidebar visibility on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        openSidebar(); // Ensure sidebar is open on large screens
      } else {
        closeSidebar(); // Close sidebar on small screens
      }
    };

    // Run once on component mount
    handleResize();

    // Add event listener to handle window resizing
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar, closeSidebar]);

  return (
    <div
      className={`fixed z-50 flex min-h-full flex-col bg-base-100 rounded-lg pb-10 shadow-lg shadow-pink-500 transition-transform duration-500 ease-in-out dark:bg-navy-800 dark:text-white
      ${
        isSidebarOpen || window.innerWidth >= 1024
          ? "translate-x-0" // Sidebar visible
          : "-translate-x-full" // Sidebar hidden
      }`}
      style={{ width: "220px" }} // Reduced width
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
      <ul className="mb-auto pt-1 px-5">
        {links.map((link) => (
          <NavLink
            to={link.url}
            key={link.id}
            end={link.url === "/admin"}
            className={({ isActive }) =>
              `flex items-center p-2 mb-2 rounded-lg transition-transform duration-300 ${
                isActive
                  ? "bg-pink-700 text-white scale-105"
                  : "hover:bg-gray-700 hover:text-white hover:scale-105"
              }`
            }
          >
            {link.icon}
            <span className="ml-3">{link.text}</span>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

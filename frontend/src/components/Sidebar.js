import debounce from "lodash.debounce";
import React, { useEffect } from "react";
import { HiX } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { links } from "../constants/data";
import { useSidebarContext } from "../context/SidebarContext";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, openSidebar } = useSidebarContext();

  useEffect(() => {
    const handleResize = debounce(() => {
      if (window.innerWidth >= 1024 && !isSidebarOpen) {
        openSidebar();
      }
    }, 200);

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [openSidebar, isSidebarOpen]);

  return (
    <div
      className={` fixed z-50 flex min-h-full flex-col bg-zinc-50  pb-10 shadow-lg transition-transform duration-500 ease-in-out
      ${
        isSidebarOpen || window.innerWidth >= 1024
          ? "translate-x-0"
          : "-translate-x-full"
      }`}
      style={{ width: "180px" }}
    >
      {/* Close Button for Small Screens */}
      <span
        className="absolute top-4 right-4 block cursor-pointer md:hidden"
        onClick={closeSidebar}
      >
        <HiX className="h-6 w-6" />
      </span>

      {/* Logo */}
      <div className="mx-8 mt-7 flex items-center">
        <img src="/AMZIFY.png" alt="Amzify Logo" className="w-60 h-10" />
      </div>

      {/* Divider */}
      <div className="mt-4 mb-4" />

      {/* Navigation Links */}
      <div>
        <ul className="mb-auto pt-1 mr-4">
          {links.map((link) => (
            <NavLink
              to={link.url}
              key={link.id}
              end={link.url === "/admin"}
              className={({ isActive }) =>
                `relative flex items-center mb-2 rounded-lg transition-transform duration-300 font-bold ${
                  isActive
                    ? "bg-primary-pink text-white px-4 mr-2 py-2 scale-105"
                    : "hover:bg-gray-200 hover:text-primary-pink px-4 py-2 hover:scale-105"
                }`
              }
            >
              {link.icon}
              <span className="ml-4">{link.text}</span>
            </NavLink>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

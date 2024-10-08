import { motion } from "framer-motion"; // Import framer-motion
import { useState } from "react";
import { FaAlignJustify, FaSearch } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import Dropdown from "../components/dropdown";
import { useAuth } from "../context/AuthContext";
import { useSidebarContext } from "../context/SidebarContext";

const Navbar = () => {
  const { openSidebar, isSidebarOpen, closeSidebar } = useSidebarContext();
  const { user, logout } = useAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Handle logout functionality
  const handleLogout = async () => {
    if (logoutLoading) return;
    setLogoutLoading(true);

    try {
      await logout();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <motion.nav
      className={`navbar sticky top-4 z-40 flex justify-between items-center mt-2 w-full bg-base-100 rounded-lg bg-white/10 p-2 backdrop-blur-xl dark:bg-[#0b14374d]`}
      initial={{ opacity: 0, y: -20 }} // Start from offscreen
      animate={{ opacity: 1, y: 0 }} // Slide down and fade in
      transition={{ duration: 0.5, ease: "easeOut" }} // Smooth transition
    >
      <motion.div
        className="relative mt-[3px] h-[65px] flex flex-grow items-center justify-between gap-2 rounded-full bg-zinc-100 px-6 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none"
        initial={{ opacity: 0, scale: 0.9 }} // Slightly scaled down initially
        animate={{ opacity: 1, scale: 1 }} // Scale up to normal size
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Sidebar Toggle Button */}
        <motion.span
          className="flex transition ease-in-out animate-pulse cursor-pointer text-xl text-gray-600 dark:text-white xl:hidden"
          whileHover={{ scale: 1.2 }} // Hover effect to enlarge icon
          onClick={() => {
            isSidebarOpen ? closeSidebar() : openSidebar(); // Toggle based on the current state
          }}
        >
          <FaAlignJustify className="h-5 w-5" />
        </motion.span>

        {/* Search Bar */}
        <motion.div
          className="flex border h-[40px]  items-center rounded-full text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[180px] md:w-[150px] sm:w-[130px]"
          initial={{ x: -50, opacity: 0 }} // Slide in from left
          animate={{ x: 0, opacity: 1 }} // Slide to original position
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="pl-2">
            <FaSearch className="h-4 w-4 text-gray-400 dark:text-white" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="block h-full w-full pl-2 pr-4 bg-transparent text-sm font-medium text-navy-700 outline-none placeholder:text-gray-400 dark:text-white dark:placeholder:text-white rounded-full"
          />
        </motion.div>

        {/* Right Side: Notifications and User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <Dropdown
            button={
              <motion.div
                className="relative cursor-pointer"
                whileHover={{ rotate: [0, 10, -10, 0] }} // Rotation animation on hover
                transition={{ type: "spring", stiffness: 300 }}
              >
                <IoMdNotificationsOutline className="h-5 w-5 rounded-lg shadow-lg text-gray-600 dark:text-white" />
              </motion.div>
            }
            children={
              <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none sm:w-[460px]">
                {/* Notification Content */}
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-navy-700 dark:text-white">
                    Notification
                  </p>
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    Mark all read
                  </p>
                </div>
              </div>
            }
            classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
          />

          {/* User Profile Section */}
          <Dropdown
            button={
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }} // Hover effect for profile section
                transition={{ type: "spring", stiffness: 150 }}
              >
                <img
                  className="rounded-full btn btn-ghost btn-circle avatar"
                  src={
                    user?.pictureUrl ||
                    "https://www.kindpng.com/picc/m/722-7221920_placeholder-profile-image-placeholder-png-transparent-png.png"
                  }
                  alt={user?.firstName || "User Avatar"}
                />
                <div className="text-left">
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs font-semibold text-pink-700 dark:text-pink-500">
                    {user?.role?.toUpperCase()}
                  </p>
                </div>
              </motion.div>
            }
            children={
              <div className="flex w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
                <div className="p-4">
                  <p className="text-sm font-bold text-navy-700 dark:text-white">
                    👋 Hey, {user?.firstName || "Guest"}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-300">
                    {user?.email || "example@email.com"}
                  </p>
                </div>
                <div className="h-px w-full bg-gray-200 dark:bg-white/20" />
                <div className="flex flex-col p-4">
                  <a
                    href=" "
                    className="text-sm text-gray-800 dark:text-white hover:dark:text-white"
                  >
                    Profile Settings
                  </a>
                  <a
                    href=" "
                    className="mt-3 text-sm text-gray-800 dark:text-white hover:dark:text-white"
                  >
                    Newsletter Settings
                  </a>
                  <button
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    className={`mt-3 btn btn-sm btn-primary text-sm font-medium ${
                      logoutLoading ? "btn-disabled" : "text-red-500"
                    } transition duration-200 ease-out hover:text-red-500 hover:ease-in`}
                  >
                    {logoutLoading ? "Logging out..." : "Log Out"}
                  </button>
                </div>
              </div>
            }
            classNames={"py-2 top-8 -left-[180px] w-max"}
          />
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;

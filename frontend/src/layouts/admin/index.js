import { motion } from "framer-motion"; // Import Framer Motion
import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

// Define animation variants for Framer Motion
const pageVariants = {
  initial: {
    opacity: 0,
    x: -100,
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: 100,
  },
};

const pageTransition = {
  duration: 0.9,
  ease: "easeInOut",
};

const AdminLayout = () => {
  return (
    <div className="flex h-full w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="h-full w-full bg-zinc-50">
        {/* Main Area */}
        <main className="mx-[12px] h-full flex-none transition-all md:pr-2 xl:ml-[210px]">
          <div className="h-full">
            {/* Navbar */}
            <Navbar />

            {/* Content area with Framer Motion animation */}
            <motion.div
              className="pt-5 mx-auto mb-auto h-full min-h-[84vh] p-2 md:pr-2"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Outlet />
            </motion.div>

            <div className="p-3">{/* <Footer /> */}</div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

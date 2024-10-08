// src/context/SidebarContext.js

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

// Custom hook to use the SidebarContext
export const useSidebarContext = () => useContext(SidebarContext);

const SidebarProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{ openSidebar, closeSidebar, toggleSidebar, isSidebarOpen }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarProvider;

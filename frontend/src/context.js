// context/AppContext.js
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <GlobalContext.Provider
      value={{ openSidebar, closeSidebar, isSidebarOpen }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default AppContext;

// src/context/Providers.js

import React from "react";
import AuthProvider from "./AuthContext";
import { GlobalProvider } from "./ContextAnalytics";
import SidebarProvider from "./SidebarContext";

const Providers = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <SidebarProvider>{children}</SidebarProvider>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default Providers;

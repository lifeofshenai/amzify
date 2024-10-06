import React from "react";
import { AnalyticsProvider } from "./AnalyticsContext";
import AuthProvider from "./AuthContext";
import { GlobalProvider } from "./ContextAnalytics";
import SidebarProvider from "./SidebarContext";

const Providers = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <SidebarProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </SidebarProvider>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default Providers;

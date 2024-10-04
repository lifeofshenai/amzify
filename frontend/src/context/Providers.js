import React from "react";
import AppContext from "../context"; // GlobalContext
import SidebarProvider from "./SidebarContext";
import AuthProvider from "./AuthContext";
import {AnalyticsProvider} from "./AnalyticsContext";

const Providers = ({children}) => {
  return (
    <AppContext>
      <AuthProvider>
        <SidebarProvider>
          <AnalyticsProvider>{children}</AnalyticsProvider>
        </SidebarProvider>
      </AuthProvider>
    </AppContext>
  );
};

export default Providers;

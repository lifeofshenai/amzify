import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./context/AuthContext"; 
import SidebarProvider from "./context/SidebarContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <SidebarProvider>
        <App />
        <ToastContainer position="top-center" />
      </SidebarProvider>
    </AuthProvider>
  </BrowserRouter>
);

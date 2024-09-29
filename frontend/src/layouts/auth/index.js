import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <header className="bg-blue-600 text-white p-4">AMZIFY</header>
      <main className="flex items-center justify-center h-screen bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

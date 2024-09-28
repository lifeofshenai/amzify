import React from "react";
import { Link } from "react-router-dom";
import { links } from "../constants/data";
import { useGlobalContext } from "../context";

const Sidebar = () => {
  const { isSidebarOpen } = useGlobalContext();
  return (
    <div
      className={`drawer ${isSidebarOpen ? "drawer-open" : ""} lg:drawer-open`}
    >
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-72 bg-base-200 text-base-content">
          <div className="flex items-center justify-center mb-6">
            <span className="text-3xl font-black text-pink-700">AMZIFY</span>
          </div>
          {/* Sidebar links here */}
          {links.map((link) => (
            <li key={link.id} className="my-2 flex items-start">
              <Link to={link.url} className="flex items-center">
                <span className="text-xl mr-2">{link.icon}</span>
                <span className="">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

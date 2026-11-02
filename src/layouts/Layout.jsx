import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Sidebar from "./Sidebar.jsx";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="layout-wrapper">
      <Sidebar
        isCollapsed={collapsed}
        onToggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <div className="main-content">
        <Navbar />
        <div className="content-body">{children || <Outlet />}</div>
      </div>
    </div>
  );
};

export default Layout;

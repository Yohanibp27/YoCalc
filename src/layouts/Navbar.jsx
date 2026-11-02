import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMaximize2 } from "react-icons/fi";

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("history");

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/scientific":
        return "Scientific";
      case "/graphing":
        return "Graphing";
      case "/programmer":
        return "Programmer";
      case "/date-calculation":
        return "Date Calculation";
      default:
        return "Standard";
    }
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <h3 className="nav-title">{getPageTitle()}</h3>
        <button className="navbar-action-button" title="expand view">
          <FiMaximize2 />
        </button>
      </div>

      {/* <div className="navbar-right">
        <div className="navbar-tabs">
          <button
            className={`tab-item ${activeTab === "history" ? "active" : ""}`}
            onClick={() => setActiveTab("history")}
          >
            History
          </button>
          <button
            className={`tab-item ${activeTab === "memory" ? "active" : ""}`}
            onClick={() => setActiveTab("memory")}
          >
            Memory
          </button>
        </div>
      </div> */}
    </header>
  );
};

export default Navbar;

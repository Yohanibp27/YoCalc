import React from "react";
import { NavLink } from "react-router-dom";
import { FaCode } from "react-icons/fa";
import { FiSearch, FiSidebar } from "react-icons/fi";
import { FcCalculator, FcCalendar } from "react-icons/fc";
import { GoGraph } from "react-icons/go";
import { MdScience } from "react-icons/md";
const Sidebar = ({ isCollapsed, onToggleCollapsed }) => {
  const menuItems = [
    {
      name: "Standard",
      icon: <FcCalculator />,
      path: "/",
    },
    {
      name: "Scientific",
      icon: <MdScience />,
      path: "/scientific",
    },
    {
      name: "Graphing",
      icon: <GoGraph />,
      path: "/graphing",
    },
    {
      name: "Programmer",
      icon: <FaCode />,
      path: "/programmer",
    },
    {
      name: "Date Calculation",
      icon: <FcCalendar />,
      path: "/date-calculation",
    },
  ];
  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="brand-wrapper">
            <div className="brand-logo">YC</div>
            <span className="brand-name">YoCalc</span>
          </div>
        )}
        <button
          className="collapse-button"
          onClick={onToggleCollapsed}
          title="toggle"
        >
          <FiSidebar />
        </button>
      </div>

      <div className="sidebar-search">
        <FiSearch className="search-icon" />
        <input id="text" placeholder={isCollapsed ? "" : "Search"} />
        {!isCollapsed && <span className="search-shortcut">/</span>}
      </div>

      {!isCollapsed && <strong className="sub-navlink">Calculate</strong>}
      <nav className="sidebar-menu">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `menu-item ${isActive ? "active" : ""}`
            }
            title={isCollapsed ? item.name : ""}
          >
            <span className="menu-icon">{item.icon}</span>
            {!isCollapsed && <span className="menu-text">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;

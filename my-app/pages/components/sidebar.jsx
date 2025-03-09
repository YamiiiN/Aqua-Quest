import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BarChart,
  LogOut,
  XCircle,
  User,
  Mail,
  ChevronDown,
  Gamepad,
  Wallet,
  Activity,
  LineChart,
  Receipt,
  PiggyBank
} from "lucide-react";
import ReactDOM from "react-dom";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [expandedMenu, setExpandedMenu] = useState(null);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={24} />,
      to: "/admin-dashboard"
    },
    {
      label: "User Management",
      icon: <Users size={24} />,
      to: "/user-management"
    },
    {
      label: "Game Analytics",
      icon: <Gamepad size={24} />,
      subItems: [
        { label: "Player Inventory", to: "/inventory", icon: <Wallet size={20} /> },
        { label: "Player Statistics", to: "/statistics", icon: <Activity size={20} /> }
      ]
    },
    {
      label: "Water Usage Analytics",
      icon: <BarChart size={24} />,
      subItems: [
        { label: "Predictions", to: "/predictions", icon: <LineChart size={20} /> },
        { label: "Water Bill", to: "/bills", icon: <Receipt size={20} /> },
        { label: "Saved", to: "/saved", icon: <PiggyBank size={20} /> }
      ]
    }
  ];

  useEffect(() => {
    const firstName = localStorage.getItem("adminFirstName") || "Admin";
    const lastName = localStorage.getItem("adminLastName") || "";
    const email = localStorage.getItem("adminEmail") || "";
    setAdminName(`${firstName} ${lastName}`);
    setAdminEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminFirstName");
    localStorage.removeItem("adminLastName");
    navigate("/login-as-admin");
  };

  const toggleMenu = (label) => {
    setExpandedMenu(expandedMenu === label ? null : label);
  };

  const NavItem = ({ item }) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedMenu === item.label;

    if (!hasSubItems) {
      return (
        <Link
          to={item.to}
          className="flex items-center gap-3 p-3 hover:bg-blue-900 rounded-md transition-all"
        >
          {item.icon}
          {!isCollapsed && <span className="text-lg">{item.label}</span>}
        </Link>
      );
    }

    return (
      <div className="w-full">
        <button
          onClick={() => toggleMenu(item.label)}
          className="flex items-center justify-between w-full p-3 hover:bg-blue-900 rounded-md transition-all text-white"
        >
          <div className="flex items-center gap-3">
            {item.icon}
            {!isCollapsed && <span className="text-lg">{item.label}</span>}
          </div>
          {!isCollapsed && (
            <ChevronDown
              size={20}
              className={`transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          )}
        </button>
        {isExpanded && !isCollapsed && (
          <div className="ml-8 mt-1 space-y-1">
            {item.subItems.map((subItem) => (
              <Link
                key={subItem.to}
                to={subItem.to}
                className="flex items-center gap-2 p-2 text-sm hover:bg-blue-900 rounded-md transition-all text-gray-300 hover:text-white"
              >
                {subItem.icon}
                <span>{subItem.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gray-900 text-white ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 flex flex-col p-4`}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-6 self-end text-white"
        >
          {isCollapsed ? "▶" : "◀"}
        </button>

        <div className="mb-6 text-center">
          <h1
            className={`text-xl font-bold transition-all ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Admin Panel
          </h1>
        </div>

        <div className="mb-6 text-center">
          <div className="flex items-center gap-3 p-3">
            <User size={24} />
            {!isCollapsed && <span className="text-lg">Hi, {adminName}</span>}
          </div>
          <div className="flex items-center gap-3 p-3">
            <Mail size={24} />
            {!isCollapsed && <span className="text-sm">{adminEmail}</span>}
          </div>
        </div>

        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => (
            <NavItem key={item.label} item={item} />
          ))}
        </nav>

        <div className="mt-auto">
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-3 p-3 hover:bg-blue-600 rounded-md transition-all w-full"
          >
            <LogOut size={24} />
            {!isCollapsed && <span className="text-lg">Logout</span>}
          </button>
        </div>
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex justify-center items-center z-50">
            <div className="fixed inset-0 bg-black/50 z-40"></div>
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg text-center w-96 border border-gray-300 z-50">
              <XCircle size={40} className="text-red-600 mx-auto" />
              <h2 className="text-xl font-bold text-gray-900 mt-3">
                Confirm Logout
              </h2>
              <p className="text-gray-600 mt-2">
                Are you sure you want to log out?
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Logout
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
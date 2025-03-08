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
} from "lucide-react";
import ReactDOM from "react-dom";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch admin name and email from local storage
    const firstName = localStorage.getItem("adminFirstName") || "Admin";
    const lastName = localStorage.getItem("adminLastName") || "";
    const email = localStorage.getItem("adminEmail") || "";
    setAdminName(`${firstName} ${lastName}`);
    setAdminEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Remove token
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminFirstName");
    localStorage.removeItem("adminLastName");
    navigate("/login-as-admin"); // Redirect to login page
  };

  return (
    <>
      <div
        className={`min-h-screen bg-gray-900 text-white ${
          isCollapsed ? "w-20" : "w-64"
        } transition-all duration-300 flex flex-col p-4`}
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="mb-6 self-end text-white"
        >
          {isCollapsed ? "▶" : "◀"}
        </button>

        {/* Logo */}
        <div className="mb-6 text-center">
          <h1
            className={`text-xl font-bold transition-all ${
              isCollapsed ? "hidden" : "block"
            }`}
          >
            Admin Panel
          </h1>
        </div>

        {/* Admin Info */}
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

        {/* Navigation Links */}
        <nav className="flex flex-col gap-4">
          <NavItem
            to="/admin-dashboard"
            icon={<LayoutDashboard size={24} />}
            label="Dashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/user-management"
            icon={<Users size={24} />}
            label="User Management"
            isCollapsed={isCollapsed}
          />
          <NavItem
            to="/game-analytics"
            icon={<BarChart size={24} />}
            label="Game & Engagement"
            isCollapsed={isCollapsed}
          />
        </nav>

        {/* Logout Button */}
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

      {/* Modal with Background Overlay */}
      {showModal &&
        ReactDOM.createPortal(
          <div className="fixed inset-0 flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out">
            {/* Gray Background Overlay */}
            <div className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-in-out"></div>

            {/* Modal Content */}
            <div className="modal-content bg-white p-6 rounded-lg shadow-lg text-center w-96 border border-gray-300 z-50 transform transition-transform duration-300 ease-in-out">
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
          document.body // Keeps modal separate from layout
        )}
    </>
  );
}

/** Individual Nav Item Component */
function NavItem({ to, icon, label, isCollapsed }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 p-3 hover:bg-blue-900 rounded-md transition-all"
    >
      {icon}
      {!isCollapsed && <span className="text-lg">{label}</span>}
    </Link>
  );
}

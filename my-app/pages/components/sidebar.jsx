import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutDashboard, Users, BarChart, LogOut, FileText } from "lucide-react";

export default function AdminSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${isCollapsed ? "w-20" : "w-64"} transition-all duration-300 flex flex-col p-4`}>
      {/* Toggle Button */}
      <button onClick={() => setIsCollapsed(!isCollapsed)} className="mb-6 self-end text-white">
        {isCollapsed ? "▶" : "◀"}
      </button>

      {/* Logo */}
      <div className="mb-6 text-center">
        <h1 className={`text-xl font-bold transition-all ${isCollapsed ? "hidden" : "block"}`}>Admin Panel</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-4">
        <NavItem to="/admin-dashboard" icon={<LayoutDashboard size={24} />} label="Dashboard" isCollapsed={isCollapsed} />
        <NavItem to="/user-management" icon={<Users size={24} />} label="User Management" isCollapsed={isCollapsed} />
        <NavItem to="/game-analytics" icon={<BarChart size={24} />} label="Game & Engagement" isCollapsed={isCollapsed} />
      </nav>

      {/* Logout Button */}
      <div className="mt-auto">
        <NavItem to="/logout" icon={<LogOut size={24} />} label="Logout" isCollapsed={isCollapsed} />
      </div>
    </div>
  );
}

/** Individual Nav Item Component */
function NavItem({ to, icon, label, isCollapsed }) {
  return (
    <Link to={to} className="flex items-center gap-3 p-3 hover:bg-blue-900 rounded-md transition-all">
      {icon}
      {!isCollapsed && <span className="text-lg">{label}</span>}
    </Link>
  );
}

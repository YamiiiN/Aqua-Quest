import React from "react";
import Sidebar from "../components/sidebar";

function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-200 min-h-screen">{children}</main>
    </div>
  );
}

export default AdminLayout;

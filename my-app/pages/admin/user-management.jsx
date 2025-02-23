import React, { useState } from "react";
import AdminLayout from "/pages/admin/layout";
import { Trash2, Search, Edit, X } from "lucide-react";

const usersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "User",
    createdAt: "2023-01-10",
    lastLogin: "2024-02-20",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Admin",
    createdAt: "2022-12-05",
    lastLogin: "2024-02-22",
  },
  {
    id: 3,
    name: "Michael Brown",
    email: "michael@example.com",
    role: "User",
    createdAt: "2023-03-15",
    lastLogin: "2024-02-21",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily@example.com",
    role: "User",
    createdAt: "2023-05-20",
    lastLogin: "2024-02-19",
  },
  {
    id: 5,
    name: "Daniel Wilson",
    email: "daniel@example.com",
    role: "User",
    createdAt: "2023-07-25",
    lastLogin: "2024-02-18",
  },
];

export default function UserManagement() {
  const [search, setSearch] = useState("");
  const [userList, setUserList] = useState(usersData);
  const [editUser, setEditUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const handleDelete = (id) => {
    setUserList(userList.filter((user) => user.id !== id));
    setDeleteUser(null);
  };

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
           User Management
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search
              className="absolute right-3 top-3 text-gray-500"
              size={20}
            />
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-blue-700 text-white text-sm uppercase">
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
                <th className="px-6 py-3">Date Created</th>
                <th className="px-6 py-3">Last Login</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b transition duration-200 hover:bg-blue-100"
                  >
                    <td className="px-6 py-4 font-semibold">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td
                      className={`px-6 py-4 ${
                        user.role === "Admin"
                          ? "text-green-600 font-bold"
                          : "text-gray-600"
                      }`}
                    >
                      {user.role}
                    </td>
                    <td className="px-6 py-4">{user.createdAt}</td>
                    <td className="px-6 py-4">{user.lastLogin}</td>
                    <td className="px-6 py-4 flex gap-4">
                      <button
                        className="text-blue-600 hover:text-blue-800 transition"
                        onClick={() => setEditUser(user)}
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => setDeleteUser(user)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit User Modal */}
        {editUser && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-6 w-80 z-50 border border-gray-300">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setEditUser(null)}
            >
              <X size={20} />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Edit User</h2>
            <input
              type="text"
              value={editUser.name}
              className="w-full px-4 py-2 border rounded mb-2 text-gray-600 font-semibold bg-gray-100"
              readOnly
            />
            <input
              type="email"
              value={editUser.email}
              className="w-full px-4 py-2 border rounded mb-2 text-gray-600 font-semibold bg-gray-100"
              readOnly
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded mt-4 hover:bg-blue-700 transition"
              onClick={() => setEditUser(null)}
            >
              Close
            </button>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteUser && (
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-xl p-6 w-80 z-50 border border-gray-300 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Confirm Delete
            </h2>
            <p className="text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteUser.name}</span>?
            </p>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                onClick={() => handleDelete(deleteUser.id)}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => setDeleteUser(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

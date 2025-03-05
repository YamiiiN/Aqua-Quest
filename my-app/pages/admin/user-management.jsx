import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";
import { CheckCircle, XCircle } from "lucide-react";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null); // Sorting field
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://aqua-quest-backend-deployment.onrender.com/api/admin/get-all-users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  // Sorting function
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortBy) return 0;
    const valueA = a[sortBy];
    const valueB = b[sortBy];

    if (sortBy === "status") {
      return sortOrder === "asc"
        ? (valueA === "verified" ? 1 : -1) - (valueB === "verified" ? 1 : -1)
        : (valueB === "verified" ? 1 : -1) - (valueA === "verified" ? 1 : -1);
    }

    if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
    if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const displayedUsers = sortedUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Handle sorting
  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <AdminLayout>
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 rounded-lg shadow-lg mb- text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">
          User Management
        </h1>
        <p className="mt-2 text-lg opacity-80">
          Manage and monitor user accounts, permissions, and activity logs.
        </p>
      </div>

      <div className="p-6 min-h-screen">
        {/* Search Bar - Aligned Left */}
        <div className="flex justify-start mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full max-w-md px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* User Table */}
        <div className="bg-white p-6 shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-700 text-white text-sm uppercase rounded-t-lg">
                <th
                  className="px-6 py-3 w-1/4 cursor-pointer first:rounded-tl-lg"
                  onClick={() => handleSort("first_name")}
                >
                  Name{" "}
                  {sortBy === "first_name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 w-1/4">Email</th>
                <th
                  className="px-6 py-3 w-1/6 cursor-pointer"
                  onClick={() => handleSort("role")}
                >
                  Role {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th
                  className="px-6 py-3 w-1/6 cursor-pointer"
                  onClick={() => handleSort("status")}
                >
                  Status{" "}
                  {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th className="px-6 py-3 w-1/6 last:rounded-tr-lg">
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody>
              {displayedUsers.length > 0 ? (
                displayedUsers.map((user, index) => (
                  <tr
                    key={user._id}
                    className={`border-b transition duration-200 hover:bg-blue-100 ${
                      index === displayedUsers.length - 1
                        ? "last:rounded-b-lg"
                        : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-semibold truncate">
                      {`${user.first_name} ${user.last_name}`}
                    </td>
                    <td className="px-6 py-4 truncate">{user.email}</td>
                    <td className="px-6 py-4 text-gray-600">{user.role}</td>
                    <td className="px-6 py-4 flex items-center">
                      {user.status === "verified" ? (
                        <CheckCircle className="text-green-500" size={20} />
                      ) : (
                        <XCircle className="text-red-500" size={20} />
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500 rounded-b-lg"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm font-medium rounded-md transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm font-medium rounded-md transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

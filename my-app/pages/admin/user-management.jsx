import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";
import { CheckCircle, XCircle, Pencil, Eye } from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
} from "recharts";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState(null); // Sorting field
  const [sortOrder, setSortOrder] = useState("asc"); // asc or desc
  const usersPerPage = 10;
  const [selectedUser, setSelectedUser] = useState(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isGraphModalOpen, setIsGraphModalOpen] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [scatterData, setScatterData] = useState([]);
  const BLUE_SHADES = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/average-consumption"
        );
        const data = await response.json();
        setScatterData(data.scatterData);
      } catch (error) {
        console.error("Error fetching average consumption:", error);
      }
    };

    fetchData();
  }, []);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-2 shadow-md rounded-md text-sm">
          <p className="font-bold">{dataPoint.name}</p>
          <p>Avg Consumption: {dataPoint.avgConsumption.toFixed(2)} L</p>
        </div>
      );
    }
    return null;
  };
  
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

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/update-status/${userId}`, // Using localhost
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus.toLowerCase() }), // Convert to lowercase in frontend too
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const updatedUser = await response.json();

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === updatedUser.user._id ? updatedUser.user : user
        )
      );

      console.log("User status updated:", updatedUser);
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleFetchUserWaterBill = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/user-water-bills/${userId}`
      );
      const data = await response.json();
      setBarChartData(data.barChartData);
      setLineChartData(data.lineChartData);
      setIsGraphModalOpen(true);
    } catch (error) {
      console.error("Error fetching user water bill data:", error);
    }
  };

  const openStatusModal = (user) => {
    setSelectedUser(user);
    setNewStatus(user.status);
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedUser(null);
  };

  const closeGraphModal = () => {
    setIsGraphModalOpen(false);
    setBarChartData([]);
    setLineChartData([]);
  };

  const handleSave = () => {
    handleUpdateStatus(selectedUser._id, newStatus);
    closeStatusModal();
  };

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
      <div className="bg-white p-6 shadow-lg rounded-lg mt-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Average Water Consumption per User
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="id"
                name="User ID"
                domain={["auto", "auto"]}
              />
              <YAxis
                type="number"
                dataKey="avgConsumption"
                name="Avg Consumption (L)"
                unit="L"
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ strokeDasharray: "3 3" }}
              />
              <Scatter name="Users" data={scatterData} fill="#2563EB" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
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
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-blue-700 text-white text-sm uppercase">
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
                <th className="px-6 py-3 w-1/6">Actions</th>
                <th className="px-6 py-3">User Water Usage</th>
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
                        ? "last:border-none"
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
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => openStatusModal(user)}
                      >
                        <Pencil size={20} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => handleFetchUserWaterBill(user._id)}
                      >
                        <Eye size={20} />
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-4 text-center text-gray-500 bg-gray-50 rounded-b-lg"
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

        {isStatusModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-xl font-bold mb-4">Change User Status</h2>
              <select
                className="w-full p-2 border rounded-md"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="verified">Verified</option>
                <option value="unverified">Unverified</option>
              </select>
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={closeStatusModal}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {isGraphModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[800px]">
              <h2 className="text-2xl font-bold mb-6">User Water Bill Data</h2>
              {barChartData.length > 0 && lineChartData.length > 0 ? (
                <>
                  <div className="h-64 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="amount">
                          {barChartData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={BLUE_SHADES[index % BLUE_SHADES.length]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <h2 className="text-2xl font-bold mb-6">
                    Consumption Trends
                  </h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={lineChartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="consumption"
                          stroke="#2563EB"
                          strokeWidth={3}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </>
              ) : (
                <div className="text-center text-gray-500">
                  No water bill data available for this user.
                </div>
              )}
              <div className="flex justify-end mt-6">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded-md"
                  onClick={closeGraphModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
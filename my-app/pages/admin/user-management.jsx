import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10; // Show 10 users per page

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://aqua-quest-backend-deployment.onrender.com/api/admin/get-all-users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search input
  const filteredUsers = users.filter(user =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const displayedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-6 text-center">
          User Management
        </h1>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full max-w-md px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to page 1 when searching
            }}
          />
        </div>

        {/* User Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
          <thead>
  <tr className="bg-blue-700 text-white text-sm uppercase">
    <th className="px-6 py-3">Name</th>
    <th className="px-6 py-3">Email</th>
    <th className="px-6 py-3">Role</th>
    <th className="px-6 py-3">Status</th> {/* New Status Column */}
    <th className="px-6 py-3">Date Created</th>
  </tr>
</thead>
<tbody>
  {displayedUsers.length > 0 ? (
    displayedUsers.map((user) => (
      <tr key={user._id} className="border-b transition duration-200 hover:bg-blue-100">
        <td className="px-6 py-4 font-semibold">{`${user.first_name} ${user.last_name}`}</td>
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4 text-gray-600">{user.role}</td>
        <td className="px-6 py-4">
          <span className={`px-2 py-1 rounded-lg text-white font-semibold ${user.status === 'verified' ? 'bg-green-500' : 'bg-red-500'}`}>
            {user.status === 'verified' ? 'verified' : 'Unverified'}
          </span>
        </td>
        <td className="px-6 py-4">{new Date(user.createdAt).toLocaleDateString()}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">No users found.</td>
    </tr>
  )}
</tbody>

          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-6 space-x-4">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white font-semibold rounded-lg ${currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white font-semibold rounded-lg ${currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"}`}
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

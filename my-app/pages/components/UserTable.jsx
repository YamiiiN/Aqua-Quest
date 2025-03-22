import React from 'react';
import { CheckCircle, XCircle, Pencil, Eye } from "lucide-react";

function UserTable({ displayedUsers, handleSort, sortBy, sortOrder, openStatusModal, handleFetchUserWaterBill }) {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr className="bg-blue-700 text-white text-sm uppercase">
            <th
              className="px-6 py-3 w-1/6 cursor-pointer first:rounded-tl-lg"
              onClick={() => handleSort("first_name")}
            >
              Name{" "}
              {sortBy === "first_name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-6 py-3 w-1/6">Email</th>
            <th
              className="px-6 py-3 w-1/12 cursor-pointer"
              onClick={() => handleSort("role")}
            >
              Role {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-6 py-3 w-1/12 cursor-pointer"
              onClick={() => handleSort("status")}
            >
              Status{" "}
              {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th
              className="px-6 py-3 w-1/12 cursor-pointer"
              onClick={() => handleSort("gender")}
            >
              Gender{" "}
              {sortBy === "gender" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th className="px-6 py-3 w-1/12">Actions</th>
            <th className="px-6 py-3 w-1/12">User Water Usage</th>
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
                <td className="px-6 py-4 text-gray-600">{user.gender}</td>
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
                colSpan="8"
                className="px-6 py-4 text-center text-gray-500 bg-gray-50 rounded-b-lg"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
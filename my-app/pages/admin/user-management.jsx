import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";
import SearchBar from "../components/SearchBar";
import UserTable from "../components/UserTable";
import PaginationControls from "../components/PaginationControls";
import StatusModal from "../components/StatusModal";
import GraphModal from "../components/GraphModal";
import WaterConsumptionScatterChart from "../components/WaterConsumptionScatterChart";
import PlayerEngagementChart from "../components/PlayerEngagementChart"; // Import the new component

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
  const [lastFiveUsers, setLastFiveUsers] = useState([]); // State for last five users
  const BLUE_SHADES = ["#1E3A8A", "#2563EB", "#3B82F6", "#60A5FA", "#93C5FD"];
  const [playerEngagementData, setPlayerEngagementData] = useState([]);

  useEffect(() => {
    fetch(
      "https://aqua-quest-backend-deployment.onrender.com/api/admin/player-engagement"
    )
      .then((response) => response.json())
      .then((data) => setPlayerEngagementData(data))
      .catch((error) =>
        console.error("Error fetching player engagement:", error)
      );
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://aqua-quest-backend-deployment.onrender.com/api/admin/average-consumption"
        );
        const data = await response.json();
        setScatterData(data.scatterData);
      } catch (error) {
        console.error("Error fetching average consumption:", error);
      }
    };

    fetchData();
  }, []);

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

  useEffect(() => {
    const fetchLastFiveUsers = async () => {
      try {
        const response = await fetch(
          "https://aqua-quest-backend-deployment.onrender.com/api/admin/last-five"
        );
        const data = await response.json();
        setLastFiveUsers(data.users);
      } catch (error) {
        console.error("Error fetching last five users:", error);
      }
    };

    fetchLastFiveUsers();
  }, []);

  const handleUpdateStatus = async (userId, newStatus) => {
    try {
      const response = await fetch(
        `https://aqua-quest-backend-deployment.onrender.com/api/admin/update-status/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus.toLowerCase() }),
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
        `https://aqua-quest-backend-deployment.onrender.com/api/admin/user-water-bills/${userId}`
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
      <hr className="my-6 border-t-2 border-gray-300" />
      <div className="flex flex-wrap">
        <div className="w-full lg:w-3/4 p-4">
          <PlayerEngagementChart playerEngagementData={playerEngagementData} />
        </div>
        <div className="w-full lg:w-1/4 p-4">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Last 5 Users</h2>
            <ul className="space-y-4">
              {lastFiveUsers.map((user) => (
                <li
                  key={user._id}
                  className="mb-2 p-2 border-b border-gray-200 flex justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {user.first_name} {user.last_name}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="p-6 min-h-screen">
        <SearchBar
          search={search}
          setSearch={setSearch}
          setCurrentPage={setCurrentPage}
        />
        <UserTable
          displayedUsers={displayedUsers}
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSort={handleSort}
          openStatusModal={openStatusModal}
          handleFetchUserWaterBill={handleFetchUserWaterBill}
        />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
        <StatusModal
          isStatusModalOpen={isStatusModalOpen}
          closeStatusModal={closeStatusModal}
          newStatus={newStatus}
          setNewStatus={setNewStatus}
          handleSave={handleSave}
        />
        <GraphModal
          isGraphModalOpen={isGraphModalOpen}
          closeGraphModal={closeGraphModal}
          barChartData={barChartData}
          lineChartData={lineChartData}
          BLUE_SHADES={BLUE_SHADES}
        />
      </div>
    </AdminLayout>
  );
}

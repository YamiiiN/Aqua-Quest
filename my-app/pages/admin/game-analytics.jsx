import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "/pages/admin/layout";

export default function GameAnalytics() {
  const [playerEngagementData, setPlayerEngagementData] = useState([]);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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
    fetch("https://aqua-quest-backend-deployment.onrender.com/api/gamestat/leaderboard")
      .then((response) => response.json())
      .then((data) => {
        // Ensure data is sorted by "overallKills" in descending order by default
        const sortedData = [...data].sort((a, b) => (b.overallKills || 0) - (a.overallKills || 0));
        setLeaderboardData(sortedData);
        setSortBy("overallKills"); // Set default sorting column
        setSortOrder("desc"); // Set default sorting order
      })
      .catch((error) =>
        console.error("Error fetching leaderboard data:", error)
      );
  }, []);
  
  const handleSort = (key) => {
    const newSortOrder = sortBy === key && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(key);
    setSortOrder(newSortOrder);

    setLeaderboardData((prevData) => {
      return [...prevData].sort((a, b) => {
        const getValue = (obj, path) =>
          path.split(".").reduce((o, p) => o?.[p], obj);
        const valA = getValue(a, key) ?? 0;
        const valB = getValue(b, key) ?? 0;

        if (valA < valB) return newSortOrder === "asc" ? -1 : 1;
        if (valA > valB) return newSortOrder === "asc" ? 1 : -1;
        return 0;
      });
    });

    setCurrentPage(1);
  };

  const filteredData = leaderboardData.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredData.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(filteredData.length / playersPerPage);

  return (
    <AdminLayout>
      <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white p-8 rounded-lg shadow-lg mb-4 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide">Game Analytics</h1>
        <p className="mt-2 text-lg opacity-80">
          Track player activity and leaderboard rankings.
        </p>
      </div>

      <div className="p-6 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-3xl font-bold mb-4 text-blue-900">
            Player Engagement Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={playerEngagementData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="players" stroke="#4F46E5" strokeWidth={3} dot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-lg text-center mt-4 mb-4">
          <h2 className="text-4xl font-bold text-blue-900">Leaderboard Table</h2>
        </div>

        <div className="flex justify-start mb-6">
          <input
            type="text"
            placeholder="Search Player..."
            className="w-full max-w-md px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="bg-white p-6 shadow-lg rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse table-fixed rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-700 text-white text-sm uppercase rounded-t-lg">
                <th className="px-6 py-3 w-1/12">Rank</th>
                <th className="px-6 py-3 w-2/12">Player</th>
                <th className="px-6 py-3 w-1/6 cursor-pointer" onClick={() => handleSort("woins")}>
                  Woins {sortBy === "woins" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-6 py-3 w-1/6 cursor-pointer" onClick={() => handleSort("kills.KanalGoblin")}>
                  Kanal Goblin Kills {sortBy === "kills.KanalGoblin" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-6 py-3 w-1/6 cursor-pointer" onClick={() => handleSort("kills.ElNiño")}>
                  El Niño Kills {sortBy === "kills.ElNiño" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="px-6 py-3 w-1/6 cursor-pointer" onClick={() => handleSort("overallKills")}>
                  Overall Kills {sortBy === "overallKills" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th
                  className="px-6 py-3 w-1/6 cursor-pointer last:rounded-tr-lg"
                  onClick={() => handleSort("powerLevel")}
                >
                  Power Level{" "}
                  {sortBy === "powerLevel"
                    ? sortOrder === "asc"
                      ? "↑"
                      : "↓"
                    : ""}
                </th>
              </tr>
            </thead>

            <tbody>
              {currentPlayers.map((player, index) => {
                const rank =
                  sortOrder === "desc"
                    ? indexOfFirstPlayer + index + 1
                    : filteredData.length - (indexOfFirstPlayer + index);

                return (
                  <tr key={player.id} className="border-b text-center hover:bg-blue-100 transition duration-200">
                    <td className="px-6 py-4 text-lg">{rank}</td>
                    <td className="px-6 py-4 flex items-center gap-2 justify-center font-semibold truncate">
                      {player.name}
                    </td>
                    <td className="px-6 py-4">{player.woins}</td>
                    <td className="px-6 py-4">{player.kills.KanalGoblin}</td>
                    <td className="px-6 py-4">{player.kills.ElNiño}</td>
                    <td className="px-6 py-4">{player.overallKills}</td>
                    <td className="px-6 py-4">
                      {player.powerLevel.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center items-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 text-sm font-medium rounded-md transition ${
              currentPage === 1 ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            ← Prev
          </button>
          <span className="text-sm text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 text-sm font-medium rounded-md transition ${
              currentPage === totalPages ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}

import React, { useState, useEffect } from "react";
import { Crown, Trophy, ChevronUp, ChevronDown, Search } from "lucide-react";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

// Sort icon component using Lucide icons
const SortIcon = ({ column, sortedColumn, sortOrder }) => {
  if (sortedColumn !== column) return null;
  return sortOrder === "asc" ? (
    <ChevronUp size={16} className="inline-block" />
  ) : (
    <ChevronDown size={16} className="inline-block" />
  );
};

export default function Ranking() {
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(
      "https://aqua-quest-backend-deployment.onrender.com/api/gamestat/leaderboard"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch leaderboard data.");
        }
        return response.json();
      })
      .then((data) => {
        setPlayers(data);
        setFilteredPlayers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Sorting logic
  const handleSort = (column) => {
    const order =
      sortedColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortedColumn(column);
    setSortOrder(order);

    const sortedData = [...filteredPlayers].sort((a, b) => {
      const aValue = column.includes(".")
        ? column.split(".").reduce((o, key) => o[key], a)
        : a[column];
      const bValue = column.includes(".")
        ? column.split(".").reduce((o, key) => o[key], b)
        : b[column];

      if (aValue > bValue) return order === "asc" ? 1 : -1;
      if (aValue < bValue) return order === "asc" ? -1 : 1;
      return 0;
    });

    setFilteredPlayers(sortedData);
  };

  // Search filter logic
  useEffect(() => {
    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPlayers(filtered);
  }, [searchQuery, players]);

  // Pagination logic
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );
  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <div className="flex-1 flex flex-col items-center p-6 text-black relative overflow-hidden">
        {/* Background Waves */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/wave-pattern.svg')] bg-cover opacity-10"></div>

        <h1 className="text-4xl font-extrabold mb-6 relative z-10 flex items-center gap-2">
          <Trophy size={40} className="text-yellow-500" /> Aqua Quest
          Leaderboard
        </h1>

        {/* Search Bar */}
        <div className="relative mb-4 w-full max-w-lg">
          <input
            type="text"
            placeholder="Search player..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            size={20}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
          />
        </div>

        {/* Loading/Error Handling */}
        {loading && (
          <p className="text-lg text-gray-700">Loading leaderboard...</p>
        )}
        {error && <p className="text-lg text-red-500">{error}</p>}

        {/* Rankings Table */}
        {!loading && !error && (
          <div className="bg-gray-200 bg-opacity-70 p-6 rounded-2xl shadow-lg backdrop-blur-md w-full max-w-7xl relative z-10 overflow-x-auto">
            <h2 className="text-2xl font-semibold mb-3 text-center">
              Game Leaderboard
            </h2>
            <table className="w-full text-center">
              <thead>
                <tr className="bg-blue-700 text-white text-sm uppercase">
                  <th className="px-6 py-3">Rank</th>
                  <th className="px-6 py-3">Player</th>
                  <th className="px-6 py-3">Email</th>
                  <th
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("woins")}
                  >
                    Woins{" "}
                    <SortIcon
                      column="woins"
                      sortedColumn={sortedColumn}
                      sortOrder={sortOrder}
                    />
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("kills.KanalGoblin")}
                  >
                    Kanal Goblin Kills{" "}
                    <SortIcon
                      column="kills.KanalGoblin"
                      sortedColumn={sortedColumn}
                      sortOrder={sortOrder}
                    />
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("kills.ElNiño")}
                  >
                    El Niño Kills{" "}
                    <SortIcon
                      column="kills.ElNiño"
                      sortedColumn={sortedColumn}
                      sortOrder={sortOrder}
                    />
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("kills.PinsalangKinamada")}
                  >
                    Pinsalang Kinamada Kills{" "}
                    <SortIcon
                      column="kills.PinsalangKinamada"
                      sortedColumn={sortedColumn}
                      sortOrder={sortOrder}
                    />
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("overallKills")}
                  >
                    Overall Kills{" "}
                    <SortIcon
                      column="overallKills"
                      sortedColumn={sortedColumn}
                      sortOrder={sortOrder}
                    />
                  </th>
                  <th
                    className="px-6 py-3 cursor-pointer"
                    onClick={() => handleSort("powerLevel")}
                  >
                    Power Level{" "}
                    <SortIcon
                      column="powerLevel"
                      sortedColumn={sortedColumn}
                      sortOrder={sortOrder}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPlayers.map((player, index) => {
                  const rank =
                    sortOrder === "desc"
                      ? indexOfFirstPlayer + index + 1
                      : filteredPlayers.length - indexOfFirstPlayer - index;
                  return (
                    <tr
                      key={index}
                      className="text-lg font-medium hover:bg-blue-500 hover:text-white transition-all"
                    >
                      <td className="p-3 text-center">
                        {rank === 1 ? (
                          <Crown
                            size={24}
                            className="text-yellow-500 mx-auto"
                          />
                        ) : (
                          `#${rank}`
                        )}
                      </td>
                      <td className="p-3">{player.name}</td>
                      <td className="p-3">{player.email}</td>
                      <td className="p-3 font-bold text-blue-800">
                        {player.woins?.toLocaleString() || 0}
                      </td>
                      <td className="p-3">{player.kills?.KanalGoblin || 0}</td>
                      <td className="p-3">{player.kills?.ElNiño || 0}</td>
                      <td className="p-3">
                        {player.kills?.PinsalangKinamada || 0}
                      </td>
                      <td className="p-3">{player.overallKills || 0}</td>
                      <td className="p-3">{(player.powerLevel || 0).toFixed(2)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// filepath: c:\Users\Danniel\Documents\GitHub\Aqua-Quest\my-app\pages\admin\game-analytics.jsx
import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";
import SearchBar from "../components/GameSearchBar";
import LeaderboardTable from "../components/LeaderBoardTable";
import PaginationControls from "../components/GamePaginationControls";
import PlayerEngagementChart from "../components/PlayerEngagementChart";
import PlayerKillStatsChart from "../components/PlayerKillStatsChart";

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
        <PlayerEngagementChart playerEngagementData={playerEngagementData} />
        <PlayerKillStatsChart />
        <div className="bg-white p-4 rounded-lg shadow-lg text-center mt-4 mb-4">
          <h2 className="text-4xl font-bold text-blue-900">Leaderboard Table</h2>
        </div>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <LeaderboardTable
          currentPlayers={currentPlayers}
          sortBy={sortBy}
          sortOrder={sortOrder}
          handleSort={handleSort}
          indexOfFirstPlayer={indexOfFirstPlayer}
          filteredData={filteredData}
        />
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </AdminLayout>
  );
}
import React, { useEffect, useState } from "react";
import AdminLayout from "/pages/admin/layout";
import SearchBar from "../../components/GameSearchBar";
import LeaderboardTable from "../../components/LeaderBoardTable";
import PaginationControls from "../../components/GamePaginationControls";
import PlayerEngagementChart from "../../components/PlayerEngagementChart";
import PlayerKillStatsChart from "../../components/PlayerKillStatsChart";

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
      <div className="p-6 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Player Statistics</h1>
        <hr className="my-6 border-t-2 border-gray-300" />
        <div className="flex flex-wrap mb-6">
          <div className="w-full lg:w-1/2 p-4">
            <PlayerEngagementChart playerEngagementData={playerEngagementData} />
          </div>
          <div className="w-full lg:w-1/2 p-4">
            <PlayerKillStatsChart />
          </div>
        </div>
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
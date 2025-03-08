// filepath: c:\Users\Danniel\Documents\GitHub\Aqua-Quest\my-app\pages\components\LeaderBoardTable.jsx
import React from 'react';

function LeaderboardTable({ currentPlayers, sortBy, sortOrder, handleSort, indexOfFirstPlayer, filteredData }) {
  return (
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
            <th className="px-6 py-3 w-1/6 cursor-pointer" onClick={() => handleSort("kills.PinsalangKinamada")}>
              Pinsalang Kinamada Kills {sortBy === "kills.PinsalangKinamada" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="px-6 py-3 w-1/6 cursor-pointer" onClick={() => handleSort("overallKills")}>
              Overall Kills {sortBy === "overallKills" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="px-6 py-3 w-1/6 cursor-pointer last:rounded-tr-lg" onClick={() => handleSort("powerLevel")}>
              Power Level {sortBy === "powerLevel" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
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
                <td className="px-6 py-4">{player.kills.PinsalangKinamada}</td>
                <td className="px-6 py-4">{player.overallKills}</td>
                <td className="px-6 py-4">{player.powerLevel.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardTable;
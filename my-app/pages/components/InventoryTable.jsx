import React from 'react';

function InventoryTable({ inventoryData, sortBy, sortOrder, handleSort }) {
  return (
    <div className="bg-white p-6 shadow-lg rounded-lg overflow-hidden">
      <table className="w-full text-left border-collapse table-fixed rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-blue-700 text-white text-sm uppercase rounded-t-lg">
            <th className="px-6 py-3 w-1/12">Player</th>
            <th className="px-6 py-3 w-2/12 cursor-pointer" onClick={() => handleSort("woins")}>
              Woins {sortBy === "woins" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="px-6 py-3 w-2/12 cursor-pointer" onClick={() => handleSort("relics")}>
              Relics {sortBy === "relics" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th className="px-6 py-3 w-2/12 cursor-pointer" onClick={() => handleSort("potions")}>
              Potions {sortBy === "potions" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
          </tr>
        </thead>
        <tbody>
          {inventoryData.map((player, index) => (
            <tr key={index} className="border-b text-center hover:bg-blue-100 transition duration-200">
              <td className="px-6 py-4 flex items-center gap-2 justify-center font-semibold truncate">
                {player.playerName}
              </td>
              <td className="px-6 py-4">{player.woins}</td>
              <td className="px-6 py-4">{player.relics}</td>
              <td className="px-6 py-4">{player.potions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InventoryTable;
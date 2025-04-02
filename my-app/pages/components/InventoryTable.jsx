import React, { useState } from 'react';

function InventoryTable({ inventoryData, sortBy, sortOrder, handleSort }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const totalPages = Math.ceil(inventoryData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentData = inventoryData.slice(startIndex, startIndex + rowsPerPage);

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
          {currentData.map((player, index) => (
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
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default InventoryTable;
import React from 'react';

function GameSearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div className="flex justify-start mb-6">
      <input
        type="text"
        placeholder="Search Player..."
        className="w-full max-w-md px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default GameSearchBar;
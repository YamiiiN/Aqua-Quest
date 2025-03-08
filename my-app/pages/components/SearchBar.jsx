import React from 'react';

function SearchBar({ search, setSearch, setCurrentPage }) {
  return (
    <div className="flex justify-start mb-6">
      <input
        type="text"
        placeholder="Search users..."
        className="w-full max-w-md px-4 py-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}

export default SearchBar;
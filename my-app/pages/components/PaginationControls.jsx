import React from 'react';

function PaginationControls({ currentPage, totalPages, setCurrentPage }) {
  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${
          currentPage === 1
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        ← Prev
      </button>
      <span className="text-sm text-gray-700">{`Page ${currentPage} of ${totalPages}`}</span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 text-sm font-medium rounded-md transition ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-600 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        Next →
      </button>
    </div>
  );
}

export default PaginationControls;
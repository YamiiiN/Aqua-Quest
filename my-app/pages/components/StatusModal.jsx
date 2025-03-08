// filepath: c:\Users\Danniel\Documents\GitHub\Aqua-Quest\my-app\pages\components\StatusModal.jsx
import React from 'react';

function StatusModal({ isStatusModalOpen, closeStatusModal, newStatus, setNewStatus, handleSave }) {
  if (!isStatusModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-black/30">
      <div className="modal-content bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6">Change User Status</h2>
        <select
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="verified">Verified</option>
          <option value="unverified">Unverified</option>
        </select>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 transition-all"
            onClick={closeStatusModal}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default StatusModal;
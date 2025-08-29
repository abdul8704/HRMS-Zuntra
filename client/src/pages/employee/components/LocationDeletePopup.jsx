import React from 'react';
import { X } from 'lucide-react'; 
import axios from "../../../api/axios";

const LocationDeletePopup = ({ isOpen, onClose, onConfirm, locationName }) => {
  if (!isOpen) return null;
  const handleDelete = async (id, newId) => {
  try {
    await axios.delete("/api/branch/delete-branch", {
      params: { oldCampusId: id, newCampusId: newId }
    });
    toast.success("Location deleted successfully");
    refreshData();
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to delete location");
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Confirm Delete</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 mb-6">
            Are you sure you want to delete this location?
            {locationName && (
              <span className="font-medium"> "{locationName}"</span>
            )}
          </p>
        </div>

        {/* Footer with buttons */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-black bg-red-400 hover:bg-red-600 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-black bg-gray-200 hover:bg-gray-400 rounded-md transition-colors"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDeletePopup;

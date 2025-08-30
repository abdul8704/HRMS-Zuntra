// frontend/components/LocationEditPopup.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import axios from "../../../api/axios";

const LocationEditPopup = ({ 
  isOpen, 
  onClose, 
  onSave, 
  currentCampusId, 
  currentBranchName = '', 
  currentEmbedUrl = '', 
  currentGeoFenceRadius = '' 
}) => {
  // ✅ Add the missing useState declarations
  const [branchName, setBranchName] = useState(currentBranchName);
  const [embedUrl, setEmbedUrl] = useState(currentEmbedUrl);
  const [geoFenceRadius, setGeoFenceRadius] = useState(currentGeoFenceRadius);

  // Sync local state with props when popup opens
  useEffect(() => {
    if (isOpen) {
      console.log("LocationEditPopup props:", {
        currentCampusId,
        currentBranchName,
        currentEmbedUrl,
        currentGeoFenceRadius
      });
      setBranchName(currentBranchName);
      setEmbedUrl(currentEmbedUrl);
      setGeoFenceRadius(currentGeoFenceRadius);
    }
  }, [isOpen, currentBranchName, currentEmbedUrl, currentGeoFenceRadius]);

  if (!isOpen) return null;

  const handleSave = async () => {
    // Add validation
    if (!currentCampusId) {
      console.error("No campus ID provided!");
      alert("Error: No campus ID available. Please close and try again.");
      return;
    }

    if (!branchName.trim() || !embedUrl.trim() || !geoFenceRadius.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      console.log("Sending request with campus ID:", currentCampusId);
      
      const response = await axios.patch("/api/branch/edit-branch", {
        oldCampusId: currentCampusId,
        campusName: branchName.trim(),
        embedURL: embedUrl.trim(),
        radius: parseFloat(geoFenceRadius.trim())
      });

      console.log("Update successful:", response.data);
      onSave(); 
      onClose();
    } catch (err) {
      console.error("Error updating branch", err.response?.data || err.message);
      alert("Failed to update branch: " + (err.response?.data?.message || err.message));
    }
  };

  const handleClose = () => {
    // Reset fields to props values
    setBranchName(currentBranchName);
    setEmbedUrl(currentEmbedUrl);
    setGeoFenceRadius(currentGeoFenceRadius);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Edit Location</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Branch Name</label>
            <input
              type="text"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Embed URL</label>
            <textarea
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Geo Fence Radius</label>
            <div className="relative">
              <input
                type="number"
                min="0"
                value={geoFenceRadius}
                onChange={(e) => setGeoFenceRadius(e.target.value)}
                className="w-full px-3 py-2 pr-20 border rounded-md focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">meters</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button onClick={handleClose} className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-md">Cancel</button>
          <button
            onClick={handleSave}
            disabled={!branchName.trim() || !embedUrl.trim() || !geoFenceRadius.trim()}
            className="px-4 py-2 text-sm bg-[#BBD3CC] hover:bg-[#A6C4BA] disabled:bg-gray-300 rounded-md"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationEditPopup;
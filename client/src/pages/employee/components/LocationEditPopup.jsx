import React, { useState } from 'react';
import { X } from 'lucide-react';

const LocationEditPopup = ({ 
  isOpen, 
  onClose, 
  onSave, 
  currentBranchName = '', 
  currentEmbedUrl = '', 
  currentGeoFenceRadius = '' 
}) => {
  const [branchName, setBranchName] = useState(currentBranchName);
  const [embedUrl, setEmbedUrl] = useState(currentEmbedUrl);
  const [geoFenceRadius, setGeoFenceRadius] = useState(currentGeoFenceRadius);

  if (!isOpen) return null;

  const handleSave = () => {
    if (branchName.trim() && embedUrl.trim() && geoFenceRadius.trim()) {
      onSave({
        branchName: branchName.trim(),
        embedUrl: embedUrl.trim(),
        geoFenceRadius: geoFenceRadius.trim()
      });
      onClose();
    }
  };

  const handleClose = () => {
    // Reset form when closing
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
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Branch Name Input */}
          <div className="mb-4">
            <label htmlFor="branchName" className="block text-sm font-medium text-gray-700 mb-2">
              Branch Name
            </label>
            <input
              type="text"
              id="branchName"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter branch name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Embed URL Input */}
          <div className="mb-4">
            <label htmlFor="embedUrl" className="block text-sm font-medium text-gray-700 mb-2">
              Embed URL
            </label>
            <textarea
              id="embedUrl"
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              placeholder="Paste Google Maps embed URL here..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          {/* Geo Fence Radius Input */}
          <div className="mb-4">
            <label htmlFor="geoFenceRadius" className="block text-sm font-medium text-gray-700 mb-2">
              Geo Fence Radius
            </label>
            <div className="relative">
              <input
                type="number"
                id="geoFenceRadius"
                value={geoFenceRadius}
                onChange={(e) => setGeoFenceRadius(e.target.value)}
                placeholder="Enter radius"
                min="0"
                step="0.1"
                className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 pointer-events-none">
                meters
              </span>
            </div>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!branchName.trim() || !embedUrl.trim() || !geoFenceRadius.trim()}
            className="px-4 py-2 text-sm font-medium text-black bg-[#BBD3CC] hover:bg-[#aedacd] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-md transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationEditPopup;

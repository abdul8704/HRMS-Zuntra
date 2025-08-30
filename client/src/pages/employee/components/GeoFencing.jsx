import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import LocationDeletePopup from './LocationDeletePopup';
import LocationEditPopup from './LocationEditPopup';

export const GeoFencing = ({ embedUrl, branchName, geoFenceRadius, _id, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const menuRef = useRef();

  const options = ['Edit', 'Delete'];

  // Debug log
  useEffect(() => {
    console.log("GeoFencing props:", { embedUrl, branchName, geoFenceRadius, _id });
  }, [embedUrl, branchName, geoFenceRadius, _id]);

  const handleOptionClick = (option) => {
    setShowMenu(false);
    
    if (option === 'Edit') {
      if (!_id) {
        alert("Error: Cannot edit location - missing ID");
        return;
      }
      setShowEditPopup(true);
    } else if (option === 'Delete') {
      if (!_id) {
        alert("Error: Cannot delete location - missing ID");
        return;
      }
      setShowDeletePopup(true);
    }
  };

  const handleEditSave = () => {
    // The LocationEditPopup handles the API call internally
    // Just close the popup and optionally refresh data
    setShowEditPopup(false);
    
    // Optionally call parent's refresh function if you have one
    if (onEdit) onEdit();
  };

  const handleDeleteConfirm = () => {
    if (onDelete) onDelete();
    setShowDeletePopup(false);
  };


  const handleDeleteCancel = () => {
    setShowDeletePopup(false);
  };

  if (!embedUrl || !embedUrl.includes("https://www.google.com/maps/embed")) return null;

  return (
    <div className="w-full relative">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-[2.25rem] font-extrabold text-black/65">{branchName}</h3>
        <div className="relative" ref={menuRef}>
          <button
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <MoreVertical className="w-6 h-6 text-gray-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(option)}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="relative w-full rounded-2xl overflow-hidden shadow-md">
        <iframe
          title="Map Location"
          src={embedUrl}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[30rem] md:h-[30rem] border-0"
        ></iframe>
      </div>

      {/* Edit Popup */}
      <LocationEditPopup
        isOpen={showEditPopup}
        onClose={() => setShowEditPopup(false)}
        onSave={handleEditSave}
        currentCampusId={_id}
        currentBranchName={branchName}
        currentEmbedUrl={embedUrl}
        currentGeoFenceRadius={geoFenceRadius}
      />

      <LocationDeletePopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleDeleteConfirm}
        oldCampusId={_id}
        locationName={branchName}
      />
    </div>
  );
};
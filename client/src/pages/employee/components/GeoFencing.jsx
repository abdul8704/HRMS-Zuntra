import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';
import LocationDeletePopup from './LocationDeletePopup';
import LocationEditPopup from './LocationEditPopup';

export const GeoFencing = ({ embedUrl, branchName, geoFenceRadius , id}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const menuRef = useRef();

  const options = ['Edit', 'Delete'];

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOptionClick = (option) => {
    setShowMenu(false);
    
    if (option === 'Edit') {
      setShowEditPopup(true);
    } else if (option === 'Delete') {
      setShowDeletePopup(true);
    }
  };

  const handleEditSave = (editedData) => {
    console.log('Saving edited location data:', editedData);
    setShowEditPopup(false);
  };

  const handleEditCancel = () => {
    setShowEditPopup(false);
  };

  const handleDeleteConfirm = () => {
    // Handle actual delete logic here
    console.log('Deleting location:', branchName);
    setShowDeletePopup(false);
    // Add your delete API call or state update here
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
        onClose={handleEditCancel}
        onSave={handleEditSave}
        currentCampusId={id}
        currentBranchName={branchName}
        currentEmbedUrl={embedUrl}
        currentGeoFenceRadius={geoFenceRadius}
      />

      {/* Delete Popup */}
      <LocationDeletePopup
        isOpen={showDeletePopup}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        oldCampusId={id}
        locationName={branchName}
      />
    </div>
  );
};

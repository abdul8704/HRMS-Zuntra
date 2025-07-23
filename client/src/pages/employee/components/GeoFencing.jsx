import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical } from 'lucide-react';

export const GeoFencing = ({ embedUrl, branchName }) => {
  const [showMenu, setShowMenu] = useState(false);
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
                  onClick={() => {
                    setShowMenu(false);
                  }}
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
    </div>
  );
};

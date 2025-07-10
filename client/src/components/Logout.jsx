import React from 'react';

export const Logout = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Black Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-xl shadow-lg w-[90%] max-w-md max-h-[90%] overflow-y-auto px-6 py-8 text-gray-800">
        <h2 className="text-2xl font-bold mb-4 text-center">Checkout time will be logged.</h2>
        <p className="text-center mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

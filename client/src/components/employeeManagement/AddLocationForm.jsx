import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function AddLocationForm() {
  const [formData, setFormData] = useState({
    branchName: '',
    address: '',
    location: '',
    radius: ''
  });

  const [isOpen, setIsOpen] = useState(true);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdd = () => {
    console.log('Form Data:', formData);
    // Handle form submission here
    alert('Geofencing data added successfully!');
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <button 
          onClick={openModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg transition-colors"
        >
          Open Geofencing Form
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4 relative">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-xl font-medium text-gray-800 text-center">Add New Company Location</h2>
          </div>

          {/* Branch Name Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter branch name"
              value={formData.branchName}
              onChange={(e) => handleInputChange('branchName', e.target.value)}
              className="w-full p-4 bg-gray-100 rounded-lg border-none outline-none focus:bg-gray-200 transition-colors placeholder-gray-500"
            />
          </div>

          {/* Address Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className="w-full p-4 bg-gray-100 rounded-lg border-none outline-none focus:bg-gray-200 transition-colors placeholder-gray-500"
            />
          </div>

          {/* Location Input */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter location"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="w-full p-4 bg-gray-100 rounded-lg border-none outline-none focus:bg-gray-200 transition-colors placeholder-gray-500"
            />
          </div>

          {/* Radius Input */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Enter radius (in meters)"
              value={formData.radius}
              onChange={(e) => handleInputChange('radius', e.target.value)}
              className="w-full p-4 bg-gray-100 rounded-lg border-none outline-none focus:bg-gray-200 transition-colors placeholder-gray-500"
            />
          </div>

          {/* Add Button */}
          <div className="flex justify-center">
            <button 
              onClick={handleAdd}
              className="bg-gray-300 text-gray-700 font-medium py-3 px-8 rounded-full transition-colors min-w-[120px]"
              style={{ backgroundColor: '#d1d5db' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#BBD3CC'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#d1d5db'}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
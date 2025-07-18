import React, { useState } from 'react';

export const ShiftDetails = () => {
  const [shifts, setShifts] = useState([
    {
      id: 1,
      shiftName: "Morning Shift",
      startTime: "09:00",
      endTime: "17:00",
      noOfUsers: "12"
    },
    {
      id: 2,
      shiftName: "Night Shift",
      startTime: "22:00",
      endTime: "06:00",
      noOfUsers: "8"
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShift, setEditingShift] = useState(null);
  const [formData, setFormData] = useState({
    shiftName: '',
    startTime: '',
    endTime: '',
    noOfUsers: ''
  });

  const openModal = (shift = null) => {
    if (shift) {
      setEditingShift(shift);
      setFormData(shift);
    } else {
      setEditingShift(null);
      setFormData({
        shiftName: '',
        startTime: '',
        endTime: '',
        noOfUsers: ''
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingShift(null);
    setFormData({
      shiftName: '',
      startTime: '',
      endTime: '',
      noOfUsers: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.shiftName || !formData.startTime || !formData.endTime || !formData.noOfUsers) {
      alert('Please fill in all fields');
      return;
    }
    
    if (editingShift) {
      // Update existing shift
      setShifts(prev => prev.map(shift => 
        shift.id === editingShift.id ? { ...formData, id: editingShift.id } : shift
      ));
    } else {
      // Add new shift
      const newShift = {
        ...formData,
        id: Date.now() // Simple ID generation
      };
      setShifts(prev => [...prev, newShift]);
    }
    
    closeModal();
  };

  const PlusButton = () => {
    return (
      <button
        type="button"
        onClick={() => openModal()}
        aria-label="Add new shift"
        className="fixed bottom-8 right-20 w-16 h-16 bg-[#c2d9d7] rounded-full flex items-center justify-center cursor-pointer group hover:bg-[#b2ccc9] transition-colors duration-300 z-[1000]"
      >
        <svg
          className="w-8 h-8 text-black transform transition-transform duration-300 ease-in-out group-hover:rotate-[180deg]"
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
        </svg>
      </button>
    );
  };

  return (
    <div className="w-full bg-white relative">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-200">
            <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
              Shift Name
            </th>
            <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
              Start Time
            </th>
            <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
              End Time
            </th>
            <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
              No. of Users
            </th>
            <th className="text-left py-4 px-4 font-bold text-gray-900 text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift) => (
            <tr key={shift.id} className="border-b border-gray-200">
              <td className="py-4 px-4 text-sm text-black">
                {shift.shiftName}
              </td>
              <td className="py-4 px-4 text-sm text-black">
                {shift.startTime}
              </td>
              <td className="py-4 px-4 text-sm text-black">
                {shift.endTime}
              </td>
              <td className="py-4 px-4 text-sm text-black">
                {shift.noOfUsers}
              </td>
              <td className="py-4 px-4 text-sm">
                <button
                  onClick={() => openModal(shift)}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Plus Button */}
      <PlusButton />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1001]">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              {editingShift ? 'Edit Shift' : 'Add New Shift'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="shiftName" className="block text-sm font-medium text-gray-700 mb-1">
                  Shift Name
                </label>
                <input
                  type="text"
                  id="shiftName"
                  name="shiftName"
                  value={formData.shiftName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter shift name"
                />
              </div>

              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="noOfUsers" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Users
                </label>
                <input
                  type="number"
                  id="noOfUsers"
                  name="noOfUsers"
                  value={formData.noOfUsers}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter number of users"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  {editingShift ? 'Update' : 'Add'} Shift
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
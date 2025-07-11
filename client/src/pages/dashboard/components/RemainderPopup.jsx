import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export const RemainderPopup = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [reminderText, setReminderText] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (dateStr) => {
    if (!dateStr) return 'dd-mm-yy';
    const [year, month, day] = dateStr.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleCalendarClick = () => {
    setShowDatePicker(true);
  };

  const handleCancel = () => {
    setSelectedDate('');
    setReminderText('');
    setShowDatePicker(false);
    if (onClose) onClose();
  };

  const handleAddReminder = () => {
    console.log('Reminder added:', { date: selectedDate, text: reminderText });
    handleCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
      <div className="bg-white rounded-lg shadow-xl p-4" style={{ width: '420px' }}>
        
        {/* 1. Reminder Text Area */}
        <div className="mb-4">
          <textarea
            value={reminderText}
            onChange={(e) => setReminderText(e.target.value)}
            placeholder="Reminder..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded text-sm text-gray-700 resize-none bg-[#D9D9D9] h-[100px]"

          />
        </div>

        {/* 2. Date and Add Reminder in one row */}
        <div className="flex gap-3 mb-4">
          {/* Date Input or Picker */}
          <div className="relative w-1/2">
            {!showDatePicker ? (
              <>
                <input
                  type="text"
                  value={formatDisplayDate(selectedDate)}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-600 bg-[#D9D9D9]"
                  placeholder="dd-mm-yy"
                />
                <button
                  onClick={handleCalendarClick}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Calendar className="w-4 h-4" />
                </button>
              </>
            ) : (
              <input
                type="date"
                autoFocus
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm text-gray-700 bg-white"
                min={getCurrentDate()}
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setShowDatePicker(false);
                }}
                value={selectedDate || getCurrentDate()}
              />
            )}
          </div>

          {/* Add Reminder Button */}
          <div className="w-1/2">
            <button
              onClick={handleAddReminder}
              className="w-full py-2 bg-white border border-gray-300 text-gray-800 text-sm rounded hover:bg-gray-100 transition"
            >
              Add Reminder
            </button>
          </div>
        </div>

        {/* 3. Cancel Button */}
        <div className="flex justify-center">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded border border-gray-300 hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

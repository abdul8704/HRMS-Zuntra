import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const Remainder = ({ onAddReminder }) => {
  const [reminders, setReminders] = useState([
    'Complete project proposal by Friday',
    'Call dentist for appointment',
    'Buy groceries for the weekend',
    'Review quarterly reports',
    'Schedule team meeting for next week',
    'Pay electricity bill',
    'Submit expense reports'
  ]);

  const handleAddReminder = () => {
    if (onAddReminder) onAddReminder();
  };

  return (
    <div className="w-full h-full bg-[#BFBFF7] flex flex-col rounded-2xl">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-2">
        <h1 className="text-xl font-semibold text-gray-800">Reminder</h1>
        <button
          onClick={handleAddReminder}
          className="bg-blue-500 text-white p-1 rounded-full shadow-md hover:bg-blue-600 transition-all flex items-center justify-center"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Reminders List */}
      <div className="flex-1 overflow-y-auto pr-4">
        <ul className="flex flex-col gap-3 px-4 pb-4">
          {reminders.map((reminder, index) => (
            <li key={index} className="flex items-start gap-2 pl-4">
              <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{reminder}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

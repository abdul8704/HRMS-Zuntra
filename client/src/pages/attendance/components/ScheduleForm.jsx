import React, { useState } from 'react';

export const ScheduleForm = ({ handleClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [actionType, setActionType] = useState('holiday'); // holiday, event, leave
  const [description, setDescription] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);

  const religions = ['Hindu', 'Muslim', 'Christian', 'Sikh', 'Jain', 'Buddhist'];
  const roles = ['Admin', 'Manager', 'Employee', 'Intern'];

  const handleRoleToggle = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      date: selectedDate,
      type: actionType,
      description,
      religion: actionType === 'leave' ? selectedReligion : null,
      roles: actionType === 'event' ? selectedRoles : null,
    };
    console.log('Scheduled:', data);
    if (handleClose) handleClose();
  };

  const handleCancel = () => {
    setSelectedDate('');
    setActionType('holiday');
    setDescription('');
    setSelectedReligion('');
    setSelectedRoles([]);
    if (handleClose) handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-gray-700 w-full max-w-xl mx-auto"
    >
      {/* Date */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Select Date</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded px-3 py-2 bg-slate-100"
          required
        />
      </div>

      {/* Type of Schedule Action */}
      <div className="flex gap-6">
        {['holiday', 'event', 'leave'].map((type) => (
          <label key={type} className="flex items-center gap-2 cursor-pointer text-sm">
            <input
              type="radio"
              name="actionType"
              value={type}
              checked={actionType === type}
              onChange={() => setActionType(type)}
              className="accent-[#bcd4cd] h-4 w-4"
            />
            {type === 'holiday'
              ? 'Mark as Holiday'
              : type === 'event'
              ? 'Add Event'
              : 'Functional Leave'}
          </label>
        ))}
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Reason, details or notes..."
          className="border rounded px-3 py-2 bg-slate-100 resize-none"
          required
        />
      </div>

      {/* Conditional Fields */}
      {actionType === 'leave' && (
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Select Religion</label>
          <select
            value={selectedReligion}
            onChange={(e) => setSelectedReligion(e.target.value)}
            className="border rounded px-3 py-2 bg-slate-100"
            required
          >
            <option value="">-- Select Religion --</option>
            {religions.map((rel) => (
              <option key={rel} value={rel}>
                {rel}
              </option>
            ))}
          </select>
        </div>
      )}

      {actionType === 'event' && (
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Applicable Roles</label>
          <div className="flex flex-wrap gap-3">
            {roles.map((role) => (
              <label key={role} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={selectedRoles.includes(role)}
                  onChange={() => handleRoleToggle(role)}
                  className="accent-[#bcd4cd]"
                />
                {role}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-red-500 hover:text-white transition-all w-full sm:w-auto"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 rounded transition-all w-full sm:w-auto"
          style={{
            backgroundColor: 'rgba(140, 221, 132, 0.8)',
            color: 'black',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#16a34a';
            e.target.style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(140, 221, 132, 0.8)';
            e.target.style.color = 'black';
          }}
        >
          Save
        </button>
      </div>
    </form>
  );
};

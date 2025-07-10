import React, { useState } from 'react';

export const LeaveForm = ({ handleClose }) => {
  const [leaveCategory, setLeaveCategory] = useState('');
  const [durationType, setDurationType] = useState('single');
  const [singleDate, setSingleDate] = useState('');
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');
  const [specificDates, setSpecificDates] = useState([]);
  const [reason, setReason] = useState('');

  const leaveCategories = [
    'Medical Leave',
    'Informed Leave',
    'Emergency Leave',
    'Sick Leave',
    'Casual Leave',
  ];

  const handleSpecificDateChange = (index, value) => {
    const updatedDates = [...specificDates];
    updatedDates[index] = value;
    setSpecificDates(updatedDates);
  };

  const addSpecificDateField = () => {
    setSpecificDates([...specificDates, '']);
  };

  const removeSpecificDateField = (index) => {
    const updated = [...specificDates];
    updated.splice(index, 1);
    setSpecificDates(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      leaveCategory,
      durationType,
      dates:
        durationType === 'single'
          ? [singleDate]
          : durationType === 'range'
            ? [rangeStart, rangeEnd]
            : specificDates,
      reason,
    };
    console.log(data);
    if (handleClose) handleClose();
  };

  const handleCancel = () => {
    setLeaveCategory('');
    setDurationType('single');
    setSingleDate('');
    setRangeStart('');
    setRangeEnd('');
    setSpecificDates([]);
    setReason('');
    if (handleClose) handleClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 text-gray-700 w-full h-full overflow-x-auto"
    >
      {/* Leave Category */}
      <div className="flex flex-col">
        <select
          value={leaveCategory}
          onChange={(e) => setLeaveCategory(e.target.value)}
          className="border rounded px-3 py-2 bg-slate-100 text-gray-700"
          required
        >
          <option value="">Select Leave Category</option>
          {leaveCategories.map((category, i) => (
            <option key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Duration Type */}
      <div className="flex gap-4">
        {['single', 'range', 'specific'].map((type) => (
          <div key={type} className="relative">
            <input
              type="radio"
              name="duration"
              id={type}
              value={type}
              checked={durationType === type}
              onChange={() => setDurationType(type)}
              className="peer hidden"
            />
            <label
              htmlFor={type}
              className={`px-4 py-1 border rounded-full cursor-pointer transition-colors
          peer-checked:bg-[#bcd4cd] peer-checked:text-white 
          text-gray-600 border-gray-300 hover:bg-[#bcd4cd]`}
            >
              {type === 'single'
                ? 'Single Day'
                : type === 'range'
                  ? 'Date Range'
                  : 'Specific Dates'}
            </label>
          </div>
        ))}
      </div>


      {/* Date Inputs Based on Type */}
      {durationType === 'single' && (
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            value={singleDate}
            onChange={(e) => setSingleDate(e.target.value)}
            className="border rounded px-3 py-2 bg-slate-100"
            required
          />
        </div>
      )}

      {durationType === 'range' && (
        <div className="flex gap-4">
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium mb-1">From</label>
            <input
              type="date"
              value={rangeStart}
              onChange={(e) => setRangeStart(e.target.value)}
              className="border rounded px-3 py-2 bg-slate-100"
              required
            />
          </div>
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium mb-1">To</label>
            <input
              type="date"
              value={rangeEnd}
              onChange={(e) => setRangeEnd(e.target.value)}
              className="border rounded px-3 py-2 bg-slate-100"
              required
            />
          </div>
        </div>
      )}

      {durationType === 'specific' && (
        <div className="flex flex-col gap-2">
          {specificDates.map((date, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="date"
                value={date}
                onChange={(e) => handleSpecificDateChange(index, e.target.value)}
                className="border rounded px-3 py-2 bg-slate-100 flex-1"
                required
              />
              <button
                type="button"
                onClick={() => removeSpecificDateField(index)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addSpecificDateField}
            className="text-blue-500 hover:underline text-sm w-fit"
          >
            + Add another date
          </button>
        </div>
      )}

      {/* Reason (Scrollable & min height) */}
      <div className="flex flex-col flex-1 min-h-[150px] overflow-y-auto">
        <label className="text-sm font-medium mb-1">Reason for Leave</label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason..."
          className="border rounded px-3 py-2 bg-slate-100 text-gray-700 resize-none flex-1"
          required
        />
      </div>

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
          Apply
        </button>
      </div>
    </form>
  );
};

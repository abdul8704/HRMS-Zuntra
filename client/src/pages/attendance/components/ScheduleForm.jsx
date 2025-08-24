import React, { useState } from 'react';

export const ScheduleForm = ({ handleClose }) => {
  const [actionType, setActionType] = useState('event'); 
  const [dateOption, setDateOption] = useState('single'); // single | range (for events)
  const [singleDate, setSingleDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [name, setName] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);

  const religions = ['Hindu', 'Muslim', 'Christian', 'All'];
  const today = new Date().toISOString().split('T')[0]; // today's date for min attr

  const generateDateArray = (start, end) => {
    const arr = [];
    let current = new Date(start);
    const last = new Date(end);
    while (current <= last) {
      arr.push(current.toISOString().split('T')[0]); // yyyy-mm-dd
      current.setDate(current.getDate() + 1);
    }
    return arr;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (actionType === 'event') {
      let dates = [];
      if (dateOption === 'single' && singleDate) {
        dates = [singleDate];
      } else if (dateOption === 'range' && fromDate && toDate) {
        dates = generateDateArray(fromDate, toDate);
      }

      const eventData = {
        name,
        dates,
        roles: selectedRoles,
      };
      console.log("Submitting Event:", eventData);
      // 👉 POST /api/schedule/event

    } else if (actionType === 'leave') {
      const leaveData = {
        name,
        dates: holidayDate ? [holidayDate] : [],
        religion: selectedReligion,
        roles: selectedRoles,
      };
      console.log("Submitting Leave:", leaveData);
      // 👉 POST /api/schedule/leave
    }

    if (handleClose) handleClose();
  };

  const handleCancel = () => {
    setActionType('event');
    setDateOption('single');
    setSingleDate('');
    setFromDate('');
    setToDate('');
    setHolidayDate('');
    setName('');
    setSelectedReligion('');
    setSelectedRoles([]);
    if (handleClose) handleClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full overflow-hidden">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 text-gray-700 w-full h-full overflow-y-auto max-h-[500px]"
      >
        {/* Type of Schedule Action (event / holiday) */}
        <div className="flex gap-6">
          {['event', 'leave'].map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="actionType"
                value={type}
                checked={actionType === type}
                onChange={() => setActionType(type)}
                className="accent-[#bcd4cd] h-4 w-4"
              />
              {type === 'event' ? 'Add Event' : 'Add Holiday'}
            </label>
          ))}
        </div>

        {/* Common Name field */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={actionType=='event'?`Enter event name`:`Enter holiday name`}
            className="border rounded px-3 py-2 bg-slate-100 text-sm"
            required
          />
        </div>

        {/* Date Fields */}
        {actionType === 'event' && (
          <>
            {/* Single vs Range option */}
            <div className="flex gap-6">
              {['single', 'range'].map((opt) => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm">
                  <input
                    type="radio"
                    name="dateOption"
                    value={opt}
                    checked={dateOption === opt}
                    onChange={() => setDateOption(opt)}
                    className="accent-[#bcd4cd] h-4 w-4"
                  />
                  {opt === 'single' ? 'Single Day' : 'Date Range'}
                </label>
              ))}
            </div>

            {/* Single Day Picker */}
            {dateOption === 'single' && (
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Select Date</label>
                <input
                  type="date"
                  value={singleDate}
                  min={today}
                  onChange={(e) => setSingleDate(e.target.value)}
                  className="border rounded px-3 py-2 bg-slate-100 text-sm"
                  required
                />
              </div>
            )}

            {/* Range Pickers */}
            {dateOption === 'range' && (
              <div className="flex gap-4">
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium mb-1">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    min={today}
                    onChange={(e) => {
                      const newFrom = e.target.value;
                      setFromDate(newFrom);
                      // auto-clear toDate if invalid
                      if (toDate && new Date(newFrom) > new Date(toDate)) {
                        setToDate('');
                      }
                    }}
                    className="border rounded px-3 py-2 bg-slate-100 text-sm"
                    required
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <label className="text-sm font-medium mb-1">To</label>
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate || today}   // ✅ ensures To >= From
                    onChange={(e) => setToDate(e.target.value)}
                    className="border rounded px-3 py-2 bg-slate-100 text-sm"
                    required
                  />
                </div>
              </div>
            )}
          </>
        )}

        {actionType === 'leave' && (
          <>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Select Date</label>
              <input
                type="date"
                value={holidayDate}
                min={today}
                onChange={(e) => setHolidayDate(e.target.value)}
                className="border rounded px-3 py-2 bg-slate-100 text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1">Select Religion</label>
              <select
                value={selectedReligion}
                onChange={(e) => setSelectedReligion(e.target.value)}
                className="border rounded px-3 py-2 bg-slate-100 text-sm"
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
          </>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 mt-auto pt-3">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-black px-4 py-2 rounded hover:bg-red-500 hover:text-white transition-all w-full sm:w-auto text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded transition-all w-full sm:w-auto text-sm"
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
    </div>
  );
};

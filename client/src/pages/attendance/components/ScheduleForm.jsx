import React, { useState } from 'react';
import axios from '../../../api/axios';

export const ScheduleForm = ({ handleClose }) => {
  const [actionType, setActionType] = useState('event');
  const [dateOption, setDateOption] = useState('single');
  const [singleDate, setSingleDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedReligion, setSelectedReligion] = useState('');

  const religions = ['Hindu', 'Muslim', 'Christian', 'All'];
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const generateDateArray = (start, end) => {
    const arr = [];
    let current = new Date(start);
    const last = new Date(end);
    while (current <= last) {
      arr.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return arr;
  };

  const getDatesArray = () => {
    if (dateOption === 'single' && singleDate) {
      return [singleDate];
    } else if (dateOption === 'range' && fromDate && toDate) {
      return generateDateArray(fromDate, toDate);
    }
    return [];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (actionType === 'event') {
      const eventData = {
        title: name,
        description,
        date: getDatesArray(),
      };
      console.log("Submitting Event:", eventData);
      try {
        const eventResponse = await axios.post("/api/events/create", eventData);
        if (eventResponse.status === 201) {
          alert("Event scheduled successfully");
        }
      } catch (error) {
        console.error(error);
        alert("Trouble while scheduling event!");
      }
      setDateOption('single');
      setSingleDate('');
      setFromDate('');
      setToDate('');
      setName('');
      setDescription('');

      //Holiday post
    } else if (actionType === 'leave') {
      const leaveData = {
        name,
        dates: getDatesArray(),
        religion: selectedReligion,
      };
      console.log("Submitting Holiday:", leaveData);
      try {
        const leaveResponse = await axios.post("api/holidays/add", leaveData);
        if (leaveResponse.status === 201) {
          alert("Holiday scheduled successfully");
        }
      } catch (error) {
        console.error(error);
        alert("Trouble while scheduling holiday!");
      }
      setDateOption('single');
      setSingleDate('');
      setFromDate('');
      setToDate('');
      setName('');
      setSelectedReligion('');
    }
  };

  const handleCancel = () => {
    setActionType('event');
    setDateOption('single');
    setSingleDate('');
    setFromDate('');
    setToDate('');
    setName('');
    setDescription('');
    setSelectedReligion('');
    if (handleClose) handleClose();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full overflow-hidden">
      <h1 className='text-center text-lg font-semibold text-gray-800 mb-2'>Mark Event/Holiday</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 text-gray-700 w-full h-full overflow-y-auto max-h-[500px]"
      >
        {/* Action Type */}
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

        {/* Common Name */}
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={actionType === 'event' ? `Enter event name` : `Enter holiday name`}
            className="border rounded px-3 py-2 bg-slate-100 text-sm"
            required
          />
        </div>

        {/* Description only for Event */}
        {actionType === 'event' && (
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter event description"
              className="border rounded px-3 py-2 bg-slate-100 text-sm"
              rows={3}
              required
            />
          </div>
        )}

        {/* Single / Range Option */}
        <div className="flex gap-6">
          {['single', 'range'].map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="dateOption"
                value={opt}
                checked={dateOption === opt}
                onChange={() => {
                  setDateOption(opt);
                  setSingleDate('');
                  setFromDate('');
                  setToDate('');
                }}
                className="accent-[#bcd4cd] h-4 w-4"
              />
              {opt === 'single' ? 'Single Day' : 'Date Range'}
            </label>
          ))}
        </div>

        {/* Date Inputs */}
        {dateOption === 'single' ? (
          <input
            type="date"
            value={singleDate}
            min={tomorrowStr}
            onChange={(e) => {
              const val = e.target.value;
              if (val < today) return;  // ⛔ block past dates
              setSingleDate(val);
            }}
            className="border rounded px-3 py-2 bg-slate-100 text-sm"
            required
          />
        ) : (
          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-medium mb-1">From</label>
              <input
                type="date"
                value={fromDate}
                min={tomorrowStr}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val < today) return;  // ⛔ block past dates
                  setFromDate(val);
                  if (toDate && new Date(val) > new Date(toDate)) {
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
                min={fromDate || tomorrowStr}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val < (tomorrowStr)) return;  // ⛔ block past
                  setToDate(val);
                }}
                className="border rounded px-3 py-2 bg-slate-100 text-sm"
                required
              />
            </div>
          </div>
        )}

        {/* Religion only for Holiday */}
        {actionType === 'leave' && (
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
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-1 mb-6">
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

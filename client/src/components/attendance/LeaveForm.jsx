import React, { useState, useEffect } from 'react';
import api from "../../api/axios"

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

  useEffect(() => {
    if (durationType === 'specific' && specificDates.length === 0) {
      setSpecificDates(['', '']);
    }
  }, [durationType]);

  const handleSpecificDateChange = (index, value) => {
    const updatedDates = [...specificDates];
    updatedDates[index] = value;
    setSpecificDates(updatedDates);
  };

  const addSpecificDateField = () => {
    const allFilled = specificDates.every(date => date);
    if (allFilled) {
      setSpecificDates([...specificDates, '']);
    }
  };

  const removeSpecificDateField = (index) => {
    const updated = [...specificDates];
    updated.splice(index, 1);
    setSpecificDates(updated);
  };

  const handleSubmit = async (e) => {
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
    try {
      const leavReq = await api.post('/api/employee/leave/apply-leave', {
        leaveCategory: data.leaveCategory,
        dates: data.dates,
        reason: data.reason
      });
      if (leavReq.status === 201) {
        alert("Leave request sent successfully");
      }
    } catch (error) {
      console.log(error);
      alert("Trouble while applying for leave");
    }
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

  const adjustTextareaHeight = (e) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.overflow = 'hidden';
    textarea.style.height = Math.max(textarea.scrollHeight, 50) + 'px';
    setReason(textarea.value);
  };

  return (
    <div className="w-full h-full flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-4 text-gray-700 max-w-2xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-800">Apply for Leave</h1>

          {/* Leave Category */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-gray-700">Leave Category</label>
            <select
              value={leaveCategory}
              onChange={(e) => setLeaveCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Duration Type</label>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
              {['single', 'range', 'specific'].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    name="duration"
                    value={type}
                    checked={durationType === type}
                    onChange={() => setDurationType(type)}
                    className="accent-blue-500 h-4 w-4"
                  />
                  {type === 'single'
                    ? 'Single Day'
                    : type === 'range'
                      ? 'Date Range'
                      : 'Specific Dates'}
                </label>
              ))}
            </div>
          </div>

          {/* Date Inputs Based on Type */}
          {durationType === 'single' && (
            <div className="flex flex-col">
              <label className="text-sm font-medium mb-1 text-gray-700">Date</label>
              <input
                type="date"
                value={singleDate}
                onChange={(e) => setSingleDate(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          )}

          {durationType === 'range' && (
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-medium mb-1 text-gray-700">From</label>
                <input
                  type="date"
                  value={rangeStart}
                  onChange={(e) => setRangeStart(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex flex-col flex-1">
                <label className="text-sm font-medium mb-1 text-gray-700">To</label>
                <input
                  type="date"
                  value={rangeEnd}
                  onChange={(e) => setRangeEnd(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          )}

          {durationType === 'specific' && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Specific Dates</label>
              {specificDates.map((date, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleSpecificDateChange(index, e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 bg-white flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeSpecificDateField(index)}
                    className="text-red-500 hover:text-red-700 text-lg font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-red-50 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addSpecificDateField}
                disabled={!specificDates.every(date => date)}
                className={`text-sm w-fit transition-colors ${
                  specificDates.every(date => date)
                    ? 'text-blue-500 hover:text-blue-700 hover:underline'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                + Add another date
              </button>
            </div>
          )}

          {/* Reason (Auto-expanding textarea) */}
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-1 text-gray-700">Reason for Leave</label>
            <textarea
              value={reason}
              onChange={adjustTextareaHeight}
              placeholder="Enter reason for leave..."
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ minHeight: '50px', overflow: 'hidden' }}
              rows="2"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6 pb-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-8 py-2 rounded-lg hover:bg-blue-600 transition-colors w-full sm:w-auto font-medium"
            >
              Apply for Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

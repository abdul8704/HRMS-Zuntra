import React, { useState } from 'react';

export const LeaveForm = ({ name, religion, role, handleClose }) => {
  const [typeOfLeave, setTypeOfLeave] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');

  const leaveOptions = [
    'Sick Leave',
    'Casual Leave',
    'Earned Leave',
    'Maternity Leave',
    'Paternity Leave',
  ];

  const handleOptionSelect = (option) => {
    setTypeOfLeave(option);
    setSearchTerm('');
    setDropdownOpen(false);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, religion, role, typeOfLeave, startDate, endDate, reason });
    if (handleClose) handleClose();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setTypeOfLeave('');
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setReason('');
    setDropdownOpen(false);
    if (handleClose) handleClose();
  };

  const filteredOptions = leaveOptions.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full text-gray-700">

      {/* Row 1: Name, Role, Religion */}
      <div className="flex flex-wrap gap-x-4">
        <div className="flex flex-col w-[31%]">
          <label className="text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            readOnly
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col w-[31%]">
          <label className="text-sm font-medium mb-1">Role</label>
          <input
            type="text"
            value={role}
            readOnly
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col w-[31%]">
          <label className="text-sm font-medium mb-1">Religion</label>
          <input
            type="text"
            value={religion}
            readOnly
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Row 2: Type of Leave, Start Date, End Date */}
      <div className="flex flex-wrap gap-x-4">
        <div className="flex flex-col w-[31%] relative">
          <label className="text-sm font-medium mb-1">Type of Leave</label>
          <input
            type="text"
            value={searchTerm || typeOfLeave}
            onClick={handleDropdownToggle}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setTypeOfLeave('');
              if (!dropdownOpen) setDropdownOpen(true);
            }}
            placeholder="Search leave type"
            className="border rounded px-3 py-2 w-full cursor-pointer bg-slate-100 text-gray-700 placeholder-gray-400"
          />
          <span
            onClick={handleDropdownToggle}
            className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500 cursor-pointer text-xs"
          >
            ▼
          </span>
          {dropdownOpen && (
            <ul className="absolute top-full left-0 right-0 bg-white border mt-1 rounded shadow z-20 max-h-40 overflow-y-auto text-left">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleOptionSelect(option)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {option}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-gray-400">No results</li>
              )}
            </ul>
          )}
        </div>

        <div className="flex flex-col w-[31%]">
          <label className="text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700"
          />
        </div>

        <div className="flex flex-col w-[31%]">
          <label className="text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700"
          />
        </div>
      </div>

      {/* Row 3: Reason for Leave */}
      <div className="flex flex-col">
  <label className="text-sm font-medium mb-1">Reason for Leave</label>
  <textarea
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    rows={1} // Reduced from 3
    placeholder="Enter reason..."
    className="border rounded px-3 py-1.5 bg-slate-100 text-gray-700 resize-none"
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


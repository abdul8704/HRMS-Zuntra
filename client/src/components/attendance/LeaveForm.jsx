import React, { useState } from 'react';

export const LeaveForm = ({ name, religion, role }) => {
  const [typeOfLeave, setTypeOfLeave] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const leaveOptions = ['Sick Leave', 'Casual Leave', 'Earned Leave', 'Maternity Leave', 'Paternity Leave'];
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleOptionSelect = (option) => {
    setTypeOfLeave(option);
    setDropdownOpen(false);
    setSearchTerm('');
  };

  const handleDropdownToggle = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Leave Applied!');
    console.log({ name, religion, role, typeOfLeave, startDate, endDate });
  };

  const handleCancel = () => {
    setTypeOfLeave('');
    setSearchTerm('');
    setStartDate('');
    setEndDate('');
    setDropdownOpen(false);
  };

  const filteredOptions = leaveOptions.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-xl text-gray-700">
      
      {/* Name and Role */}
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={name}
            readOnly
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1">Role</label>
          <input
            type="text"
            value={role}
            readOnly
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700 cursor-not-allowed"
          />
        </div>
      </div>

      {/* Religion and Type of Leave */}
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1">Religion</label>
          <input
            type="text"
            value={religion}
            readOnly
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700 cursor-not-allowed"
          />
        </div>

        <div className="flex flex-col flex-1 relative">
          <label className="text-sm font-medium mb-1">Type of Leave</label>
          <div className="relative">
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
  className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-0 h-0 
    border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent 
    ${dropdownOpen ? 'rotate-180' : ''} cursor-pointer`}
  style={{ borderTopColor: '#6b7280' }} // Tailwind gray-500
/>

          </div>

          {/* Dropdown Options */}
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
      </div>

      {/* Start Date and End Date */}
      <div className="flex gap-4">
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700 placeholder-gray-400"
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded px-3 py-2 bg-slate-100 text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

      {/* Buttons: Cancel & Apply */}
      <div className="flex justify-center gap-4 mt-4">
        {/* Cancel */}
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-200 text-black px-6 py-2 rounded hover:bg-red-500 hover:text-white transition-all"
        >
          Cancel
        </button>

        {/* Apply */}
        <button
          type="submit"
          className="px-6 py-2 rounded transition-all"
          style={{
            backgroundColor: 'rgba(140, 221, 132, 0.8)',
            color: 'black',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#16a34a'; // green
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

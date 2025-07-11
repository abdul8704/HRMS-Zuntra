import React, { useState, useEffect, useRef } from 'react';

export const AttendanceCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(2); // February
  const [showSidebar, setShowSidebar] = useState(false);

  const sidebarRef = useRef();

  // Detect clicks outside sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    };

    if (showSidebar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSidebar]);

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();

  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

  const calendarDays = [];
  for (let i = 0; i < firstDay; i++) calendarDays.push(null);
  for (let day = 1; day <= daysInMonth; day++) calendarDays.push(day);

  const handleMonthClick = (index) => {
    setSelectedMonth(index + 1);
    setShowSidebar(false);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white border-2 rounded-lg overflow-hidden">

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`
          absolute inset-y-0 left-0 bg-white z-30 shadow-lg w-64 max-w-full transition-transform duration-300
          flex flex-col p-4
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Year Navigation */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setSelectedYear((prev) => prev - 1)} className="text-xl font-bold px-2">&lt;</button>
          <div className="text-lg font-semibold">{selectedYear}</div>
          <button onClick={() => setSelectedYear((prev) => prev + 1)} className="text-xl font-bold px-2">&gt;</button>
        </div>

        {/* Scrollable Months */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {months.map((month, index) => (
              <button
                key={index}
                onClick={() => handleMonthClick(index)}
                className={`text-left text-sm px-3 py-1 rounded transition 
                  ${index + 1 === selectedMonth ? 'bg-blue-500 text-white' : 'hover:bg-gray-100 text-gray-800'}`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative flex items-center p-[1rem] flex-shrink-0">
        {/* Hamburger Icon */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="flex items-center gap-1 text-sm font-medium text-gray-700"
          >
            <div className="flex flex-col gap-0.5">
              <div className="w-3 h-0.5 bg-gray-600"></div>
              <div className="w-3 h-0.5 bg-gray-600"></div>
              <div className="w-3 h-0.5 bg-gray-600"></div>
            </div>
          </button>
        </div>

        {/* Centered Month-Year */}
        <div className="absolute left-1/2 transform -translate-x-1/2 text-base font-bold tracking-wide text-gray-800">
          {months[selectedMonth - 1]} {selectedYear}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 px-2 py-1 min-h-0">
        <div className="h-full grid grid-rows-7 gap-1">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div key={day} className="flex items-center justify-center text-xs font-medium text-gray-600 h-8">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dayNumber = calendarDays[weekIndex * 7 + dayIndex];
                const isSunday = dayIndex === 0;

                return (
                  <div key={dayIndex} className="flex items-center justify-center h-8 w-8 mx-auto">
                    {dayNumber && (
                      <div
                        className={`w-8 h-8 flex items-center justify-center text-xs font-medium cursor-pointer
                transition-colors duration-200
                ${isSunday
                            ? 'bg-red-100 text-red-600 rounded-full'
                            : 'text-gray-700 hover:bg-gray-100'}
              `}
                      >
                        {dayNumber}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react'

export const AttendanceCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(2); // February
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay();
  };

  const years = Array.from({ length: 21 }, (_, i) => 2015 + i); // 2015-2035
  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Create array of calendar days
  const calendarDays = [];
  
  // Add empty cells for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setShowYearDropdown(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white relative">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            className="flex items-center gap-1 text-sm font-medium text-gray-700"
          >
            <div className="flex flex-col gap-0.5">
              <div className="w-3 h-0.5 bg-gray-600"></div>
              <div className="w-3 h-0.5 bg-gray-600"></div>
              <div className="w-3 h-0.5 bg-gray-600"></div>
            </div>
            <span className="text-base font-bold tracking-wide">
              {months[selectedMonth - 1]} {selectedYear}
            </span>
          </button>
        </div>

        {/* Year Dropdown */}
        {showYearDropdown && (
          <div className="absolute top-12 left-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
            <div className="p-2">
              <div className="text-xs font-medium text-gray-500 mb-2">SELECT YEAR</div>
              <div className="grid grid-cols-3 gap-1">
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => handleYearClick(year)}
                    className={`px-3 py-1 text-sm rounded ${
                      year === selectedYear
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
            <div className="border-t p-2">
              <div className="text-xs font-medium text-gray-500 mb-2">SELECT MONTH</div>
              <div className="grid grid-cols-1 gap-1">
                {months.map((month, index) => (
                  <button
                    key={month}
                    onClick={() => {
                      setSelectedMonth(index + 1);
                      setShowYearDropdown(false);
                    }}
                    className={`px-3 py-1 text-xs text-left rounded ${
                      index + 1 === selectedMonth
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 px-2 py-1 min-h-0">
        <div className="h-full grid grid-rows-7 gap-1">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div
                key={day}
                className="flex items-center justify-center text-xs font-medium text-gray-600 h-8"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days - 6 rows */}
          {Array.from({ length: 6 }, (_, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const dayNumber = calendarDays[weekIndex * 7 + dayIndex];
                const isHighlighted = dayNumber === 1 || dayNumber === 9 || dayNumber === 16 || dayNumber === 23;
                
                return (
                  <div
                    key={dayIndex}
                    className="flex items-center justify-center h-8 w-8 mx-auto"
                  >
                    {dayNumber && (
                      <div
                        className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium cursor-pointer
                          transition-colors duration-200
                          ${isHighlighted 
                            ? 'bg-pink-200 text-pink-800 hover:bg-pink-300' 
                            : 'text-gray-700 hover:bg-gray-100'
                          }
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
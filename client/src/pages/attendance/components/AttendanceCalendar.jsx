import React, { useState, useEffect, useRef } from 'react';

export const AttendanceCalendar = () => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(7); // July to match your data
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  // Attendance data
  const [attendanceData] = useState({
    success: true,
    calendarData: [
      {
        "date": "2025-07-01",
        "status": "absent"
      },
      {
        "date": "2025-07-02",
        "status": "absent"
      },
      {
        "date": "2025-07-03",
        "status": "absent"
      },
      {
        "date": "2025-07-04",
        "status": "remote"
      },
      {
        "date": "2025-07-05",
        "status": "remote"
      },
      {
        "date": "2025-07-06",
        "status": "remote"
      },
      {
        "date": "2025-07-07",
        "status": "present"
      },
      {
        "date": "2025-07-08",
        "status": "absent"
      },
      {
        "date": "2025-07-09",
        "status": "remote"
      },
      {
        "date": "2025-07-10",
        "status": "absent"
      },
      {
        "date": "2025-07-11",
        "status": "present"
      },
      {
        "date": "2025-07-12",
        "status": "absent"
      },
      {
        "date": "2025-07-13",
        "status": "absent"
      },
      {
        "date": "2025-07-14",
        "status": "present"
      },
      {
        "date": "2025-07-15",
        "status": "absent"
      },
      {
        "date": "2025-07-16",
        "status": "present"
      },
      {
        "date": "2025-07-17",
        "status": "absent"
      },
      {
        "date": "2025-07-18",
        "status": "present"
      },
      {
        "date": "2025-07-19",
        "status": "absent"
      },
      {
        "date": "2025-07-20",
        "status": "absent"
      },
      {
        "date": "2025-07-21",
        "status": "present"
      },
      {
        "date": "2025-07-22",
        "status": "absent"
      },
      {
        "date": "2025-07-23",
        "status": "absent"
      },
      {
        "date": "2025-07-24",
        "status": "remote"
      },
      {
        "date": "2025-07-25",
        "status": "absent"
      },
      {
        "date": "2025-07-26",
        "status": "absent"
      },
      {
        "date": "2025-07-27",
        "status": "remote"
      },
      {
        "date": "2025-07-28",
        "status": "remote"
      },
      {
        "date": "2025-07-29",
        "status": "remote"
      },
      {
        "date": "2025-07-30",
        "status": "absent"
      },
      {
        "date": "2025-07-31",
        "status": "absent"
      },
      {
        "date": "2025-08-01",
        "status": "absent"
      }
    ]
  });

  const sidebarRef = useRef();

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
    setSelectedDate(null);
    setShowSidebar(false);
  };

  const today = new Date();
  const isToday = (day) =>
    day === today.getDate() &&
    selectedMonth === today.getMonth() + 1 &&
    selectedYear === today.getFullYear();

  const isFutureDate = (day) => {
    if (!day) return false;
    const currentDate = new Date(selectedYear, selectedMonth - 1, day);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return currentDate > todayDate;
  };

  const isSelected = (day) =>
    selectedDate &&
    selectedDate.year === selectedYear &&
    selectedDate.month === selectedMonth &&
    selectedDate.day === day;

  // Get attendance status for a specific date
  const getAttendanceStatus = (day) => {
    if (!day) return null;
    
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const attendanceRecord = attendanceData.calendarData.find(record => record.date === dateStr);
    return attendanceRecord ? attendanceRecord.status : null;
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white border-2 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`absolute inset-y-0 left-0 bg-white z-30 shadow-lg w-64 max-w-full transition-transform duration-300
          flex flex-col p-4 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
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

        <div className="absolute left-1/2 transform -translate-x-1/2 text-base font-bold tracking-wide text-gray-800">
          {months[selectedMonth - 1]} {selectedYear}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 px-2 py-1 min-h-0">
        <div className="h-full flex flex-col gap-1">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => (
              <div key={day} className="flex items-center justify-center text-xs font-medium text-gray-600 h-8">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="flex-1 grid grid-rows-6 gap-1">
            {Array.from({ length: 6 }, (_, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const dayNumber = calendarDays[weekIndex * 7 + dayIndex];
                  const isSunday = dayIndex === 0;
                  const future = isFutureDate(dayNumber);
                  const todayFlag = isToday(dayNumber);
                  const selected = isSelected(dayNumber);
                  const attendanceStatus = getAttendanceStatus(dayNumber);

                  // Priority-based styling WITHOUT borders - only background + text
                  let dayClasses = '';
                  let textClasses = 'text-gray-700';

                  if (future) {
                    dayClasses = '';
                    textClasses = 'text-gray-400 opacity-50 pointer-events-none';
                  } else if (attendanceStatus && !(isSunday && attendanceStatus !== 'remote')) {
                    // Attendance status colors (only background + text, NO borders)
                    switch (attendanceStatus) {
                      case 'present':
                        dayClasses = 'bg-green-100';
                        textClasses = 'text-green-700 font-semibold';
                        break;
                      case 'absent':
                        dayClasses = 'bg-red-100';
                        textClasses = 'text-red-700 font-semibold';
                        break;
                      case 'remote':
                        dayClasses = 'bg-blue-100';
                        textClasses = 'text-blue-700 font-semibold';
                        break;
                      case 'holiday':
                        dayClasses = 'bg-orange-100';
                        textClasses = 'text-orange-700 font-semibold';
                        break;
                    }
                  } else if (selected) {
                    dayClasses = 'bg-blue-500';
                    textClasses = 'text-white';
                  } else if (isSunday) {
                    // Sunday default orange styling (NO border, only background + text)
                    dayClasses = 'bg-orange-100';
                    textClasses = 'text-orange-700 font-semibold';
                  } else if (todayFlag) {
                    dayClasses = 'border border-blue-500';
                    textClasses = 'text-blue-600';
                  } else {
                    dayClasses = 'hover:bg-gray-100';
                    textClasses = 'text-gray-700';
                  }

                  return (
                    <div key={dayIndex} className="flex items-center justify-center h-8 w-8 mx-auto">
                      {dayNumber && (
                        <div
                          onClick={() => !future && setSelectedDate({ year: selectedYear, month: selectedMonth, day: dayNumber })}
                          className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-full cursor-pointer
                            transition-colors duration-200 ${dayClasses} ${textClasses}`}
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

          {/* Legend integrated in the bottom space */}
          <div className="flex items-center justify-center py-2">
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-100"></div>
                <span className="text-green-700">Present</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-red-100"></div>
                <span className="text-red-700">Absent</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-100"></div>
                <span className="text-blue-700">Remote</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-orange-100"></div>
                <span className="text-orange-700">Sunday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

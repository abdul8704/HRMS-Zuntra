import React, { useState, useEffect, useRef } from 'react';
import api from '../../../api/axios';

export const AttendanceCalendar = ({ userid, startDate, endDate, onMonthYearChange, disableFutureDates = true }) => {
  const getInitialYearMonth = () => {
    const today = new Date();
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
    };
  };

  const { year: initialYear, month: initialMonth } = getInitialYearMonth();

  const [selectedYear, setSelectedYear] = useState(initialYear);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [calendarData, setCalendarData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef();

  const today = new Date();

  const fetchCalendarData = async (year, month) => {
    if (!userid) return;

    const startDateISO = new Date(Date.UTC(year, month - 1, 1, 0, 0, 0)).toISOString();
    const endDateISO = new Date(Date.UTC(year, month, 0, 23, 59, 59)).toISOString();

    try {
      const response = await api.get('/api/employee/attendance/calendar', {
        params: {
          startDate: startDateISO,
          endDate: endDateISO,
          userid,
        },
      });

      setCalendarData(response.data.calendarData || []);
      console.log(`Fetched data for ${month}/${year}:`, response.data.calendarData);

    } catch (err) {
      console.error('Error fetching calendar data:', err);
    }
  };

  useEffect(() => {
    fetchCalendarData(selectedYear, selectedMonth);

    if (onMonthYearChange) {
      onMonthYearChange(selectedYear, selectedMonth);
    }
  }, [selectedYear, selectedMonth, userid]);


  const months = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month - 1, 1).getDay();

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = getFirstDayOfMonth(selectedYear, selectedMonth);

  const calendarDays = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const isFutureDate = (day) => {
    if (!disableFutureDates || !day) return false;
    const current = new Date(selectedYear, selectedMonth - 1, day);
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return current > todayDate;
  };

  const isSelected = (day) =>
    selectedDate &&
    selectedDate.year === selectedYear &&
    selectedDate.month === selectedMonth &&
    selectedDate.day === day;

  const isToday = (day) =>
    day === today.getDate() &&
    selectedMonth === today.getMonth() + 1 &&
    selectedYear === today.getFullYear();

  const getAttendanceStatus = (day) => {
    if (!day) return null;
    const dateStr = `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const record = calendarData?.find((item) => item.date === dateStr);
    return record?.status || null;
  };

  const handleMonthClick = (index) => {
    setSelectedMonth(index + 1);
    setSelectedDate(null);
    setShowSidebar(false);
  };

  const handleYearChange = (delta) => {
    setSelectedYear((prev) => prev + delta);
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-white border-2 rounded-lg overflow-hidden">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`absolute inset-y-0 left-0 bg-white z-30 shadow-lg w-64 max-w-full transition-transform duration-300
        flex flex-col p-4 ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => handleYearChange(-1)} className="text-xl font-bold px-2">&lt;</button>
          <div className="text-lg font-semibold">{selectedYear}</div>
          <button onClick={() => handleYearChange(1)} className="text-xl font-bold px-2">&gt;</button>
        </div>

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
      <div className="relative flex items-center p-4 flex-shrink-0">
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
        <div className="absolute left-1/2 transform -translate-x-1/2 text-base font-bold tracking-wide text-gray-800">
          {months[selectedMonth - 1]} {selectedYear}
        </div>
      </div>

      {/* Calendar */}
      <div className="flex-1 px-2 py-1 min-h-0">
        <div className="h-full flex flex-col gap-1">
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => (
              <div key={d} className="flex items-center justify-center text-xs font-medium text-gray-600 h-8">{d}</div>
            ))}
          </div>

          <div className="flex-1 grid grid-rows-6 gap-1">
            {Array.from({ length: 6 }, (_, weekIndex) => (
              <div key={weekIndex} className="grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const dayNumber = calendarDays[weekIndex * 7 + dayIndex];
                  const future = isFutureDate(dayNumber);
                  const selected = isSelected(dayNumber);
                  const todayFlag = isToday(dayNumber);
                  const isSunday = dayIndex === 0;
                  const status = getAttendanceStatus(dayNumber);

                  let dayClasses = '';
                  let textClasses = 'text-gray-700';

                  if (future) {
                    textClasses = 'text-gray-400 opacity-50 pointer-events-none';
                  } else if (selected) {
                    dayClasses = 'bg-blue-500';
                    textClasses = 'text-white';
                  } else if (status === 'present') {
                    dayClasses = 'bg-green-100';
                    textClasses = 'text-green-700 font-semibold';
                  } else if (status === 'absent') {
                    dayClasses = 'bg-red-100';
                    textClasses = 'text-red-700 font-semibold';
                  } else if (status === 'remote') {
                    dayClasses = 'bg-blue-100';
                    textClasses = 'text-blue-700 font-semibold';
                  } else if (status === 'holiday') {
                    dayClasses = 'bg-orange-100';
                    textClasses = 'text-orange-700 font-semibold';
                  } else if (isSunday) {
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
                          onClick={() => {
                            if (!future) {
                              const selected = { year: selectedYear, month: selectedMonth, day: dayNumber };
                              setSelectedDate(selected);
                            }
                          }}
                          className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-full cursor-pointer transition-colors duration-200 ${dayClasses} ${textClasses}`}
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

          {/* Legend */}
          {disableFutureDates && (
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
          )}
        </div>
      </div>
    </div>
  );
};

// components/DayInfoCard.jsx
import React from 'react';

export const DayInfoCard = ({ selectedDate }) => {
  // Enhanced sample data with more examples
  const getDayInfo = (date) => {
    if (!date) return null;

    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Initialize day info
    const dayInfo = {
      date: dateString,
      dayOfWeek: dayOfWeek,
      isWorkingDay: false,
      isHoliday: false,
      isReligiousDay: false,
      events: [],
      status: 'Present',
      workingHours: '09:00 AM - 06:00 PM'
    };

    // Weekend logic
    if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
      dayInfo.isHoliday = true;
      dayInfo.events.push('Weekend');
      dayInfo.status = 'Holiday';
    } else {
      dayInfo.isWorkingDay = true;
    }

    // Get month and day for special dates
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Independence Day
    if (month === 8 && day === 15) {
      dayInfo.isReligiousDay = true;
      dayInfo.isHoliday = true;
      dayInfo.isWorkingDay = false;
      dayInfo.events = ['Independence Day', 'National Holiday'];
      dayInfo.status = 'Holiday';
    }
    
    // Gandhi Jayanti
    if (month === 10 && day === 2) {
      dayInfo.isReligiousDay = true;
      dayInfo.isHoliday = true;
      dayInfo.isWorkingDay = false;
      dayInfo.events = ['Gandhi Jayanti', 'National Holiday'];
      dayInfo.status = 'Holiday';
    }

    // Diwali (example: October 24)
    if (month === 10 && day === 24) {
      dayInfo.isReligiousDay = true;
      dayInfo.isHoliday = true;
      dayInfo.isWorkingDay = false;
      dayInfo.events = ['Diwali', 'Festival of Lights'];
      dayInfo.status = 'Holiday';
    }

    // Christmas
    if (month === 12 && day === 25) {
      dayInfo.isReligiousDay = true;
      dayInfo.isHoliday = true;
      dayInfo.isWorkingDay = false;
      dayInfo.events = ['Christmas Day'];
      dayInfo.status = 'Holiday';
    }

    // Republic Day
    if (month === 1 && day === 26) {
      dayInfo.isReligiousDay = true;
      dayInfo.isHoliday = true;
      dayInfo.isWorkingDay = false;
      dayInfo.events = ['Republic Day', 'National Holiday'];
      dayInfo.status = 'Holiday';
    }

    // Add some random events for demo
    if (dayInfo.isWorkingDay) {
      if (day % 5 === 0) {
        dayInfo.events.push('Team Meeting - 2:00 PM');
      }
      if (day % 7 === 0) {
        dayInfo.events.push('Project Review');
      }
      
      // Random status for working days
      const statuses = ['Present', 'Leave', 'AB'];
      const randomIndex = day % 3;
      dayInfo.status = statuses[randomIndex];
    }

    return dayInfo;
  };

  const dayInfo = selectedDate ? getDayInfo(selectedDate) : null;

  if (!dayInfo) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center h-full flex items-center justify-center">
        <div>
          <div className="text-4xl mb-2">📅</div>
          <p className="text-gray-500">Select a date to view day information</p>
          <p className="text-xs text-gray-400 mt-1">Click on any date in the calendar</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Present':
        return 'text-green-600 bg-green-100';
      case 'Leave':
        return 'text-yellow-600 bg-yellow-100';
      case 'AB':
        return 'text-red-600 bg-red-100';
      case 'Holiday':
        return 'text-purple-600 bg-purple-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Present':
        return '✓';
      case 'Leave':
        return '📝';
      case 'AB':
        return '✗';
      case 'Holiday':
        return '🎉';
      default:
        return '●';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full overflow-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {dayInfo.date}
        </h3>
        <p className="text-gray-600">{dayInfo.dayOfWeek}</p>
      </div>

      {/* Working Day Info */}
      {dayInfo.isWorkingDay && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Working Day</span>
          </div>
          <div className="bg-blue-50 rounded-md p-2">
            <p className="text-xs text-blue-700">{dayInfo.workingHours}</p>
          </div>
        </div>
      )}

      {/* Holiday Info */}
      {dayInfo.isHoliday && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Holiday</span>
          </div>
        </div>
      )}

      {/* Religious Day Info */}
      {dayInfo.isReligiousDay && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Special Day</span>
          </div>
        </div>
      )}

      {/* Events */}
      {dayInfo.events.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Events:</h4>
          <div className="space-y-1">
            {dayInfo.events.map((event, index) => (
              <div key={index} className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                {event}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Status */}
      <div className="border-t pt-3 mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Status:</span>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dayInfo.status)}`}>
            <span>{getStatusIcon(dayInfo.status)}</span>
            <span>{dayInfo.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

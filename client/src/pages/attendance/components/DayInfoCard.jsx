// components/DayInfoCard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';

export const DayInfoCard = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // format date like 24-aug-2025
  const formatQueryDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(/ /g, '-').toLowerCase();
  };

  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedDate) return;
      setLoading(true);
      try {
        const queryDate = formatQueryDate(selectedDate);
        const res = await axios.get(`/api/events/today?today=${queryDate}`);
        console.log(res.data);
        if (res.data?.success) {
          setEvents(res.data.events || []);
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [selectedDate]);

  // Day info calculation
  const getDayInfo = (date) => {
    if (!date) return null;

    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const dayInfo = {
      date: dateString,
      dayOfWeek,
      isWorkingDay: false,
      isHoliday: false,
      isReligiousDay: false,
      status: 'Present',
    };

    if (dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday') {
      dayInfo.isHoliday = true;
      dayInfo.status = 'Holiday';
    } else {
      dayInfo.isWorkingDay = true;
    }

    const month = date.getMonth() + 1;
    const day = date.getDate();

    // Example static holidays
    if (month === 8 && day === 15) {
      dayInfo.isHoliday = true;
      dayInfo.isReligiousDay = true;
      dayInfo.isWorkingDay = false;
      dayInfo.status = 'Holiday';
    }
    if (month === 10 && day === 2) {
      dayInfo.isHoliday = true;
      dayInfo.isReligiousDay = true;
      dayInfo.isWorkingDay = false;
      dayInfo.status = 'Holiday';
    }
    if (month === 12 && day === 25) {
      dayInfo.isHoliday = true;
      dayInfo.isReligiousDay = true;
      dayInfo.isWorkingDay = false;
      dayInfo.status = 'Holiday';
    }
    if (month === 1 && day === 26) {
      dayInfo.isHoliday = true;
      dayInfo.isReligiousDay = true;
      dayInfo.isWorkingDay = false;
      dayInfo.status = 'Holiday';
    }

    if (dayInfo.isWorkingDay) {
      const statuses = ['Present', 'Leave', 'AB'];
      dayInfo.status = statuses[day % 3];
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

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full overflow-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{dayInfo.date}</h3>
        <p className="text-gray-600">{dayInfo.dayOfWeek}</p>
      </div>

      {/* Working Day Info */}
      {dayInfo.isWorkingDay && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Working Day</span>
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
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Events:</h4>
        {loading ? (
          <p className="text-xs text-gray-500">Loading events...</p>
        ) : events.length > 0 ? (
          <div className="space-y-1">
            {events.map((event, index) => (
              <div key={index} className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                <span className="font-medium">{event.title}</span>: {event.description}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No events available</p>
        )}
      </div>
    </div>
  );
};

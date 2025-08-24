// components/DayInfoCard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../../api/axios';

export const DayInfoCard = ({ selectedDate }) => {
  const [events, setEvents] = useState([]);
  const [holiday, setHoliday] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingHoliday, setLoadingHoliday] = useState(false);

  // Format date like 24-aug-2025
  const formatQueryDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(/ /g, '-').toLowerCase();
  };

  useEffect(() => {
    if (!selectedDate) return;

    const queryDate = formatQueryDate(selectedDate);

    // Fetch events
    const fetchEvents = async () => {
      setLoadingEvents(true);
      try {
        const res = await axios.get(`/api/events/today?today=${queryDate}`);
        if (res.data?.success) setEvents(res.data.events || []);
        else setEvents([]);
      } catch (err) {
        console.error("Error fetching events:", err);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };

    // Fetch holiday info
    const fetchHoliday = async () => {
      setLoadingHoliday(true);
      try {
        const res = await axios.get(`/api/holidays/today?today=${queryDate}`);
        if (res.data?.success && res.data.data.length > 0) {
          setHoliday(res.data.data[0]); // take first holiday if multiple
        } else {
          setHoliday(null);
        }
      } catch (err) {
        console.error("Error fetching holiday:", err);
        setHoliday(null);
      } finally {
        setLoadingHoliday(false);
      }
    };

    fetchEvents();
    fetchHoliday();
  }, [selectedDate]);

  if (!selectedDate) {
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

  const isHoliday = holiday || selectedDate.getDay() === 0 || selectedDate.getDay() === 6; // Sunday or Saturday

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full overflow-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </h3>
        <p className="text-gray-600">{selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
      </div>

      {/* Holiday Info */}
      {isHoliday && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Holiday</span>
          </div>
          {holiday && (
            <div className="ml-5 text-xs text-gray-600">
              <div>Name: {holiday.name}</div>
              <div>Applicable To: {holiday.applicableTo}</div>
            </div>
          )}
        </div>
      )}

      {/* Working Day Info */}
      {!isHoliday && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Working Day</span>
          </div>
        </div>
      )}

      {/* Events */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Events:</h4>
        {loadingEvents ? (
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

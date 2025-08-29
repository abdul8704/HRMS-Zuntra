// components/DayInfoCard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';

export const DayInfoCard = ({ selectedDate, userRole }) => {
  const [events, setEvents] = useState([]);
  const [holiday, setHoliday] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingHoliday, setLoadingHoliday] = useState(false);
  const [hoveredEventIndex, setHoveredEventIndex] = useState(null);
  const [hoveredHoliday, setHoveredHoliday] = useState(false);

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
        const res = await api.get(`/api/events/today?today=${queryDate}`);
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
        const res = await api.get(`/api/holidays/today?today=${queryDate}`);
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

  const canEdit = userRole && (userRole.toLowerCase() === 'hr' || userRole.toLowerCase() === 'ceo');

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

  const isHoliday = holiday || selectedDate.getDay() === 0; 

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full overflow-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </h3>
        <p className="text-gray-600">{selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}</p>
      </div>

      {/* Holiday Info - Now styled like Event Card */}
      {isHoliday && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Holiday</span>
          </div>
          {holiday && (
            <div className="ml-5">
              <div 
                className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1 pr-12 relative group hover:bg-gray-100 transition-colors"
                onMouseEnter={() => setHoveredHoliday(true)}
                onMouseLeave={() => setHoveredHoliday(false)}
              >
                <span className="font-medium">{holiday.name}</span>
                {canEdit && hoveredHoliday && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1 bg-white rounded shadow-sm border px-1 py-0.5">
                    <button className="text-blue-500 hover:text-blue-700 p-0.5 hover:bg-blue-50 rounded">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                    <button className="text-red-500 hover:text-red-700 p-0.5 hover:bg-red-50 rounded">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                )}
              </div>
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

      {/* Events - With light green background */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Events:</h4>
        {loadingEvents ? (
          <p className="text-xs text-gray-500">Loading events...</p>
        ) : events.length > 0 ? (
          <div className="space-y-1">
            {events.map((event, index) => (
              <div 
                key={index} 
                className="text-xs text-gray-600 bg-green-50 rounded px-2 py-1 pr-12 border border-green-100 relative group hover:bg-green-100 transition-colors"
                onMouseEnter={() => setHoveredEventIndex(index)}
                onMouseLeave={() => setHoveredEventIndex(null)}
              >
                <span className="font-medium">{event.title}</span>: {event.description}
                {canEdit && hoveredEventIndex === index && (
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex gap-1 bg-white rounded shadow-sm border px-1 py-0.5">
                    <button className="text-blue-500 hover:text-blue-700 p-0.5 hover:bg-blue-50 rounded">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                    <button className="text-red-500 hover:text-red-700 p-0.5 hover:bg-red-50 rounded">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                )}
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
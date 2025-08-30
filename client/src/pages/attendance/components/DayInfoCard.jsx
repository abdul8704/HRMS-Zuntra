// components/DayInfoCard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';

export const DayInfoCard = ({ selectedDate, userRole }) => {
  const [events, setEvents] = useState([]);
  const [holiday, setHoliday] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingHoliday, setLoadingHoliday] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);

  // Format date like 24-aug-2025
  const formatQueryDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).replace(/ /g, '-').toLowerCase();
  };

  // Fetch events and holidays
  useEffect(() => {
    if (!selectedDate) return;

    const queryDate = formatQueryDate(selectedDate);

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

    const fetchHoliday = async () => {
      setLoadingHoliday(true);
      try {
        const res = await api.get(`/api/holidays/today?today=${queryDate}`);
        if (res.data?.success && res.data.data.length > 0) {
          setHoliday(res.data.data[0]);
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

  // Debug logging - remove after fixing
  console.log('DayInfoCard Debug:');
  console.log('userRole:', userRole);
  console.log('userRole type:', typeof userRole);
  console.log('canEdit:', canEdit);

  const handleEditEvent = (event) => {
    setEditingEvent(event);
  };

  const handleDeleteEvent = async (eventId) => {
    setDeletingEvent(eventId);
  };

  const confirmDelete = async () => {
    if (deletingEvent) {
      try {
        await api.delete(`/api/events/${deletingEvent}`);
        setEvents(prev => prev.filter(e => e._id !== deletingEvent));
        setDeletingEvent(null);
      } catch (err) {
        console.error('Failed to delete event:', err);
        setDeletingEvent(null);
      }
    }
  };

  const handleSaveEvent = async (event) => {
    try {
      const updatedEvent = { ...event };
      const res = await api.put(`/api/events/${event._id}`, updatedEvent);
      const updatedEvents = events.map((e) => (e._id === event._id ? res.data.updatedEvent : e));
      setEvents(updatedEvents);
      setEditingEvent(null);
    } catch (err) {
      console.error("Failed to save event:", err);
    }
  };

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
        <p className="text-gray-600">
          {selectedDate.toLocaleDateString('en-US', { weekday: 'long' })}
        </p>
      </div>

      {/* Holiday */}
      {isHoliday && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Holiday</span>
          </div>
          {holiday && (
            <div className="ml-5 group relative">
              <div className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1 pr-16 hover:bg-gray-100 transition-colors cursor-pointer">
                <span className="font-medium">{holiday.name}</span>
              </div>
              {canEdit && (
                <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 flex gap-1 bg-white rounded shadow-sm border px-1 py-0.5 z-50 transition-opacity">
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
          )}
        </div>
      )}

      {/* Working Day */}
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
              <div
                key={event._id || index}
                className="group relative text-xs text-gray-600 bg-green-50 rounded px-2 py-1 pr-16 border border-green-100 hover:bg-green-100 transition-colors cursor-pointer"
              >
                <span className="font-medium">{event.title}</span>: {event.description}

                {/* Always show debug info to see what's happening */}
                <div className="absolute -top-8 right-0 bg-red-500 text-white px-2 py-1 text-xs rounded z-50">
                  Role: {userRole || 'undefined'} | CanEdit: {canEdit ? 'YES' : 'NO'}
                </div>

                {/* Edit/Delete Icons with Improved Hover */}
                {canEdit ? (
                  <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 flex gap-1 bg-white rounded shadow-sm border px-1 py-0.5 z-50 transition-opacity">
                    <button
                      className="text-blue-500 hover:text-blue-700 p-0.5 hover:bg-blue-50 rounded transition-colors"
                      onClick={() => handleEditEvent(event)}
                      title="Edit Event"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-0.5 hover:bg-red-50 rounded transition-colors"
                      onClick={() => handleDeleteEvent(event._id)}
                      title="Delete Event"
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                      </svg>
                    </button>
                  </div>
                ) : (
                  <div className="absolute right-1 top-1 bg-yellow-500 text-black px-2 py-1 text-xs rounded z-50">
                    NO EDIT ACCESS
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No events available</p>
        )}
      </div>

      {/* Modal for Editing Event */}
      {editingEvent && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-xl mb-4">Edit Event</h3>
            <input
              type="text"
              value={editingEvent.title}
              onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              placeholder="Event Title"
            />
            <textarea
              value={editingEvent.description}
              onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
              placeholder="Event Description"
            />
            <div className="flex gap-2">
              <button onClick={() => handleSaveEvent(editingEvent)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Save
              </button>
              <button onClick={() => setEditingEvent(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Delete Confirmation */}
      {deletingEvent && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h3 className="text-xl mb-4">Confirm Deletion</h3>
            <p className="text-sm mb-4">Are you sure you want to delete this event?</p>
            <div className="flex gap-2">
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">
                Yes, Delete
              </button>
              <button onClick={() => setDeletingEvent(null)} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
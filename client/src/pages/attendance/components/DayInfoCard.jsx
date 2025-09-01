// components/DayInfoCard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';

export const DayInfoCard = ({ selectedDate, userRole }) => {
  const [events, setEvents] = useState([]);
  const [holiday, setHoliday] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingHoliday, setLoadingHoliday] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [deletingHoliday, setDeletingHoliday] = useState(null);
  

  // Format date like 24-aug-2025
  const formatQueryDate = (date) => {
    return date
      .toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
      .replace(/ /g, '-')
      .toLowerCase();
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
        console.error('Error fetching events:', err);
        setEvents([]);
      } finally {
        setLoadingEvents(false);
      }
    };

    console.log("events", events);

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
        console.error('Error fetching holiday:', err);
        setHoliday(null);
      } finally {
        setLoadingHoliday(false);
      }
    };

    fetchEvents();
    fetchHoliday();
  }, [selectedDate]);

  console.log("holiday", holiday);

  const canEdit =
    userRole &&
    (userRole.toLowerCase() === 'hr' || userRole.toLowerCase() === 'ceo');

  // check if selectedDate is in future (tomorrow or later)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const isFutureDate = selectedDate >= tomorrow;

  // ------------------- Event Handlers -------------------

  const handleEditEvent = (event) => {
    setEditingEvent({ ...event });
  };

  const handleSaveEvent = async (event) => {
    try {
      const updatedEvent = {
        title: event.title.trim(),
        description: event.description?.trim(),
        dates: event.dates,
      };

      // TODO: change route if needed
      const res = await api.put(`/api/events/${event._id}`, updatedEvent);

      const updatedEvents = events.map((e) =>
        e._id === event._id
          ? res.data.updatedEvent || res.data.event || { ...e, ...updatedEvent }
          : e
      );
      setEvents(updatedEvents);
      setEditingEvent(null);
    } catch (err) {
      console.error('Failed to save event:', err);
      alert('Failed to save event. Please try again.');
    }
  };

  const handleDeleteEvent = (eventId) => {
    setDeletingEvent(eventId);
  };

  const confirmDeleteEvent = async () => {
    if (deletingEvent) {
      try {
        // TODO: change route if needed
        await api.delete(`/api/events/${deletingEvent}`);
        setEvents((prev) => prev.filter((e) => e._id !== deletingEvent));
        setDeletingEvent(null);
      } catch (err) {
        console.error('Failed to delete event:', err);
        alert('Failed to delete event. Please try again.');
        setDeletingEvent(null);
      }
    }
  };

  // ------------------- Holiday Handlers -------------------

  const handleEditHoliday = (holiday) => {
    setEditingHoliday({ ...holiday });
  };

  const handleSaveHoliday = async (holiday) => {
    try {
      const updatedHoliday = {
        name: holiday.name.trim(),
        dates: holiday.dates,
        applicableTo: holiday.applicableTo,
      };

      // TODO: change route if needed
      const res = await api.patch(
        `/api/holidays/update/${holiday._id}`,
        updatedHoliday
      );

      setHoliday(res.data.updatedHoliday || { ...holiday, ...updatedHoliday });
      setEditingHoliday(null);
    } catch (err) {
      console.error('Failed to save holiday:', err);
      alert('Failed to save holiday. Please try again.');
    }
  };

  const handleDeleteHoliday = (holidayId) => {
    setDeletingHoliday(holidayId);
  };

  const confirmDeleteHoliday = async () => {
    if (deletingHoliday) {
      try {
        // TODO: change route if needed
        await api.delete(`/api/holidays/delete/${deletingHoliday}`);
        setHoliday(null);
        setDeletingHoliday(null);
      } catch (err) {
        console.error('Failed to delete holiday:', err);
        alert('Failed to delete holiday. Please try again.');
        setDeletingHoliday(null);
      }
    }
  };

  // ------------------- Validation -------------------
  const isEventValid = (event) => {
    return event && event.title && event.title.trim().length > 0;
  };

  const isHolidayValid = (holiday) => {
    return holiday && holiday.name && holiday.name.trim().length > 0;
  };

  if (!selectedDate) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center h-full flex items-center justify-center">
        <div>
          <div className="text-4xl mb-2">📅</div>
          <p className="text-gray-500">Select a date to view day information</p>
          <p className="text-xs text-gray-400 mt-1">
            Click on any date in the calendar
          </p>
        </div>
      </div>
    );
  }

  const isHoliday = holiday || selectedDate.getDay() === 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full overflow-auto">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">
          {selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
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
            <div className="group relative">
              <div className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between">
                <span className="font-medium">{holiday.name}</span>
                {canEdit && isFutureDate && (
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
                    <button
                      className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Edit Holiday"
                      onClick={() => handleEditHoliday(holiday)}
                    >
                      ✏️
                    </button>
                    <button
                      className="text-gray-500 hover:text-gray-700 p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Delete Holiday"
                      onClick={() => handleDeleteHoliday(holiday._id)}
                    >
                      🗑️
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Working Day */}
      {!isHoliday && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">
              Working Day
            </span>
          </div>
        </div>
      )}

      {/* Events */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Events:</h4>
        {loadingEvents ? (
          <p className="text-xs text-gray-500">Loading events...</p>
        ) : events.length > 0 ? (
          <div className="space-y-2">
            {events.map((event, index) => (
              <div
                key={event._id || index}
                className="group relative text-xs text-gray-600 bg-green-50 rounded px-2 py-2 border border-green-100 hover:bg-green-100 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <span className="font-medium block">{event.title}</span>
                    {event.description && (
                      <span className="text-gray-500 block mt-1">
                        {event.description}
                      </span>
                    )}
                  </div>

                  {/* Edit/Delete Icons */}
                  {canEdit && isFutureDate && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 ml-2">
                      <button
                        className="text-gray-500 hover:text-gray-700 p-1 rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditEvent(event);
                        }}
                        title="Edit Event"
                      >
                        ✏️
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700 p-1 rounded transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteEvent(event._id);
                        }}
                        title="Delete Event"
                      >
                        🗑️
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500">No events available</p>
        )}
      </div>

      {/* ------------------- Event Modal ------------------- */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-[90vw] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Edit Event</h3>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title *</label>
                <input
                  type="text"
                  value={editingEvent.title || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingEvent.description || ""}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-vertical"
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              {/* Toggle Single / Range */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Date Type:</label>
                <select
                  value={editingEvent.dates?.length > 1 ? "range" : "single"}
                  onChange={(e) => {
                    if (e.target.value === "single") {
                      setEditingEvent({ ...editingEvent, dates: [editingEvent.dates?.[0] || new Date().toISOString()] });
                    } else {
                      const today = new Date().toISOString();
                      setEditingEvent({ ...editingEvent, dates: [today, today] });
                    }
                  }}
                  className="p-2 border rounded-md"
                >
                  <option value="single">Single Day</option>
                  <option value="range">Date Range</option>
                </select>
              </div>

              {/* Date Picker(s) */}
              {editingEvent.dates?.length === 1 ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={editingEvent.dates[0]?.split("T")[0] || ""}
                    onChange={(e) => setEditingEvent({ ...editingEvent, dates: [e.target.value] })}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="date"
                      value={editingEvent.dates?.[0]?.split("T")[0] || ""}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, dates: [e.target.value, editingEvent.dates?.[1]] })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="date"
                      value={editingEvent.dates?.[1]?.split("T")[0] || ""}
                      onChange={(e) =>
                        setEditingEvent({ ...editingEvent, dates: [editingEvent.dates?.[0], e.target.value] })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={() => setEditingEvent(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveEvent(editingEvent)}
                disabled={!isEventValid(editingEvent)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ------------------- Holiday Modal ------------------- */}
      {editingHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-[90vw] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Edit Holiday</h3>

            <div className="space-y-4">
              {/* Holiday Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Holiday Name *
                </label>
                <input
                  type="text"
                  value={editingHoliday.name || ""}
                  onChange={(e) =>
                    setEditingHoliday({ ...editingHoliday, name: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter holiday name"
                />
              </div>

              {/* Toggle Single / Range */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Date Type:</label>
                <select
                  value={editingHoliday.dates?.length > 1 ? "range" : "single"}
                  onChange={(e) => {
                    if (e.target.value === "single") {
                      setEditingHoliday({
                        ...editingHoliday,
                        dates: [editingHoliday.dates?.[0] || new Date().toISOString()],
                      });
                    } else {
                      const today = new Date().toISOString();
                      setEditingHoliday({ ...editingHoliday, dates: [today, today] });
                    }
                  }}
                  className="p-2 border rounded-md"
                >
                  <option value="single">Single Day</option>
                  <option value="range">Date Range</option>
                </select>
              </div>

              {/* Date Picker(s) */}
              {editingHoliday.dates?.length === 1 ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={editingHoliday.dates[0]?.split("T")[0] || ""}
                    onChange={(e) =>
                      setEditingHoliday({ ...editingHoliday, dates: [e.target.value] })
                    }
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="date"
                      value={editingHoliday.dates?.[0]?.split("T")[0] || ""}
                      onChange={(e) =>
                        setEditingHoliday({ ...editingHoliday, dates: [e.target.value, editingHoliday.dates?.[1]] })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="date"
                      value={editingHoliday.dates?.[1]?.split("T")[0] || ""}
                      onChange={(e) =>
                        setEditingHoliday({ ...editingHoliday, dates: [editingHoliday.dates?.[0], e.target.value] })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              {/* Applicable To Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Applicable To</label>
                <select
                  value={editingHoliday.applicableTo || "all"}
                  onChange={(e) =>
                    setEditingHoliday({ ...editingHoliday, applicableTo: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="hindu">Hindu</option>
                  <option value="muslim">Muslim</option>
                  <option value="christian">Christian</option>
                  <option value="all">All</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className="flex gap-3 mt-6 justify-end">
              <button
                onClick={() => setEditingHoliday(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveHoliday(editingHoliday)}
                disabled={!isHolidayValid(editingHoliday)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ------------------- Delete Confirmation ------------------- */}
      {deletingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Event Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this event? This action cannot be
              undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingEvent(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteEvent}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingHoliday && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Confirm Holiday Deletion
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this holiday? This action cannot
              be undone.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingHoliday(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteHoliday}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
              >
                Delete Holiday
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

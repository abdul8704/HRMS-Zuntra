// components/DayInfoCard.jsx
import React, { useEffect, useState } from 'react';
import api from '../../../api/axios';
import { Edit3, Trash2 } from "lucide-react";


export const DayInfoCard = ({ selectedDate, userRole }) => {
  const [events, setEvents] = useState([]);
  const [holiday, setHoliday] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [loadingHoliday, setLoadingHoliday] = useState(false);

  const [editingEvent, setEditingEvent] = useState(null);
  const [editingHoliday, setEditingHoliday] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [deletingHoliday, setDeletingHoliday] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null); // { type: 'event'|'holiday', id: string }

  // ---------------- Helpers ----------------

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

  const expandDateRange = (startStr, endStr) => {
    const dates = [];
    let current = new Date(startStr);
    const end = new Date(endStr);

    while (current <= end) {
      dates.push(new Date(current).toISOString());
      current.setUTCDate(current.getUTCDate() + 1);
    }
    return dates;
  };

  const toISODate = (yyyyMMdd) => {
    if (!yyyyMMdd) return null;
    return new Date(yyyyMMdd + 'T00:00:00.000Z').toISOString();
  };

  const toDateInputValue = (isoDate) => {
    if (!isoDate) return '';
    return isoDate.split('T')[0];
  };

  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString();
  };

  const getDayAfter = (fromDate) => {
    const d = new Date(fromDate);
    d.setDate(d.getDate() + 1);
    return d.toISOString();
  };

  // ---------------- Fetch ----------------

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

  // ---------------- Permissions ----------------

  const canEdit =
    userRole &&
    (userRole.toLowerCase() === 'hr' || userRole.toLowerCase() === 'ceo');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const isFutureDate = selectedDate >= tomorrow;

  // ---------------- Event Handlers ----------------

  const handleEditEvent = (event) => {
    let dates = event.dates || [];
    if (dates.length > 1) {
      dates = [dates[0], dates[dates.length - 1]];
    }
    setEditingEvent({ ...event, dates });
  };

  const handleSaveEvent = async (event) => {
    try {
      let expandedDates = [];

      if (event.dates.length === 1) {
        expandedDates = [toISODate(toDateInputValue(event.dates[0]))];
      } else if (event.dates.length === 2) {
        expandedDates = expandDateRange(
          toISODate(toDateInputValue(event.dates[0])),
          toISODate(toDateInputValue(event.dates[1]))
        );
      }

      const updatedEvent = {
        eventId: event._id,
        title: event.title.trim(),
        description: event.description?.trim(),
        dates: expandedDates,
      };

      const res = await api.patch(`/api/events/edit`, updatedEvent);

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
 const handleEditHoliday = (holiday) => {
  let dates = holiday.dates || [];
  if (dates.length > 1) {
    dates = [dates[0], dates[dates.length - 1]];
  }
  setEditingHoliday({ ...holiday, dates });
};

const handleSaveHoliday = async (holiday) => {
  try {
    let expandedDates = [];

    if (holiday.dates.length === 1) {
      expandedDates = [toISODate(toDateInputValue(holiday.dates[0]))];
    } else if (holiday.dates.length === 2) {
      expandedDates = expandDateRange(
        toISODate(toDateInputValue(holiday.dates[0])),
        toISODate(toDateInputValue(holiday.dates[1]))
      );
    }

    const updatedHoliday = {
      holidayId: holiday._id,
      name: holiday.name.trim(),
      applicableTo: holiday.applicableTo || "all",
      dates: expandedDates,
    };

    const res = await api.patch(`/api/holidays/edit`, updatedHoliday);

    setHoliday(res.data.updatedHoliday || res.data.holiday || updatedHoliday);
    setEditingHoliday(null);
  } catch (err) {
    console.error("Failed to save holiday:", err);
    alert("Failed to save holiday. Please try again.");
  }
};

  const handleDelete = (type, id) => {
    setShowDeleteConfirm({ type, id });
  };

  const confirmDelete = async () => {
    if (!showDeleteConfirm) return;

    const { type, id } = showDeleteConfirm;

    try {
      if (type === 'event') {
        await api.delete(`/api/events/delete`, { params: { eventId: id } });
        setEvents((prev) => prev.filter((e) => e._id !== id));
      } else if (type === 'holiday') {
        await api.delete(`/api/holidays/delete/${id}`);
        setHoliday(null);
      }
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error(`Failed to delete ${type}:`, err);
      alert(`Failed to delete ${type}. Please try again.`);
      setShowDeleteConfirm(null);
    }
  };

  // ---------------- Validation ----------------

  const isEventValid = (event) => event && event.title && event.title.trim().length > 0;
  const isHolidayValid = (holiday) =>
    holiday && holiday.name && holiday.name.trim().length > 0;

  // ---------------- Render ----------------

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
      {/* --- Header --- */}
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

      {/* --- Holiday Display --- */}
      {isHoliday && holiday && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Holiday</span>
          </div>
          <div className="group relative">
            <div className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1 hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-between">
              <span className="font-medium">{holiday.name}</span>
             {canEdit && isFutureDate && (
  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity ml-2">
    <button
      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-all duration-200"
      title="Edit Holiday"
      onClick={() => handleEditHoliday(holiday)}
    >
      <Edit3 size={14} />
    </button>
    <button
      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-all duration-200"
      title="Delete Holiday"
      onClick={() => handleDelete('holiday', holiday._id)}
    >
      <Trash2 size={14} />
    </button>
  </div>
)}



            </div>
          </div>
        </div>
      )}

      {/* --- Working Day Display --- */}
      {!isHoliday && (
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
            <span className="text-sm font-medium text-gray-700">Working Day</span>
          </div>
        </div>
      )}

      {/* --- Events --- */}
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
                      <span className="text-gray-500 block mt-1">{event.description}</span>
                    )}
                  </div>
                  {canEdit && isFutureDate && (
  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0 ml-2">
    <button
      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-all duration-200"
      onClick={(e) => {
        e.stopPropagation();
        handleEditEvent(event);
      }}
      title="Edit Event"
    >
      <Edit3 size={14} />
    </button>
    <button
      className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-all duration-200"
      onClick={(e) => {
        e.stopPropagation();
        handleDelete('event', event._id);
      }}
      title="Delete Event"
    >
      <Trash2 size={14} />
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

      {/* --- Event Modal --- */}
      {editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 max-w-[90vw] max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Edit Event</h3>
            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title *
                </label>
                <input
                  type="text"
                  value={editingEvent.title || ''}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter event title"
                />
              </div>
              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={editingEvent.description || ''}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, description: e.target.value })
                  }
                  className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 resize-vertical"
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>

              {/* ------------------- Date Type Radio ------------------- */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Date Type:</span>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="eventDateType"
                    value="single"
                    checked={editingEvent.dates?.length === 1}
                    onChange={() =>
                      setEditingEvent({ ...editingEvent, dates: [getTomorrow()] })
                    }
                  />
                  Single Day
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="eventDateType"
                    value="range"
                    checked={editingEvent.dates?.length > 1}
                    onChange={() =>
                      setEditingEvent({
                        ...editingEvent,
                        dates: [getTomorrow(), getDayAfter(getTomorrow())],
                      })
                    }
                  />
                  Date Range
                </label>
              </div>

              {/* Date Picker(s) */}

              {editingEvent.dates?.length === 1 ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={toDateInputValue(editingEvent.dates[0])}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, dates: [toISODate(e.target.value)] })
                    }
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    min={toDateInputValue(getTomorrow())}
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                    <input
                      type="date"
                      value={toDateInputValue(editingEvent.dates?.[0])}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          dates: [toISODate(e.target.value), editingEvent.dates?.[1]],
                        })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      min={toDateInputValue(getTomorrow())}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="date"
                      value={toDateInputValue(editingEvent.dates?.[1])}
                      onChange={(e) =>
                        setEditingEvent({
                          ...editingEvent,
                          dates: [editingEvent.dates?.[0], toISODate(e.target.value)],
                        })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      min={toDateInputValue(editingEvent.dates?.[0] || getTomorrow())}
                    />
                  </div>
                </div>
              )}
            </div>

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
                className="px-4 py-2 bg-[#BBD3CC] text-[#2d423b] rounded-md hover:[bg-[#BBD3CC] disabled:bg-gray-300"
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

              {/* Radio Buttons for Holiday Date Type */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Date Type:</span>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="holidayDateType"
                    value="single"
                    checked={editingHoliday.dates?.length === 1}
                    onChange={() =>
                      setEditingHoliday({ ...editingHoliday, dates: [getTomorrow()] })
                    }
                  />
                  Single Day
                </label>
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="holidayDateType"
                    value="range"
                    checked={editingHoliday.dates?.length > 1}
                    onChange={() =>
                      setEditingHoliday({
                        ...editingHoliday,
                        dates: [getTomorrow(), getDayAfter(getTomorrow())],
                      })
                    }
                  />
                  Date Range
                </label>
              </div>

              {editingHoliday.dates?.length === 1 ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={editingHoliday.dates[0]?.split("T")[0] || ""}
                    onChange={(e) =>
                      setEditingHoliday({
                        ...editingHoliday,
                        dates: [`${e.target.value}T00:00:00.000Z`],
                      })
                    }
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    min={toDateInputValue(getTomorrow())}
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
                        setEditingHoliday({
                          ...editingHoliday,
                          dates: [`${e.target.value}T00:00:00.000Z`, editingHoliday.dates?.[1]],
                        })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      min={toDateInputValue(getTomorrow())}
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <input
                      type="date"
                      value={editingHoliday.dates?.[1]?.split("T")[0] || ""}
                      onChange={(e) =>
                        setEditingHoliday({
                          ...editingHoliday,
                          dates: [editingHoliday.dates?.[0], `${e.target.value}T00:00:00.000Z`],
                        })
                      }
                      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                      min={
                        editingHoliday.dates?.[0]?.split("T")[0] || toDateInputValue(getTomorrow())
                      }
                    />
                  </div>
                </div>
              )}

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
                className="px-4 py-2 bg-[#BBD3CC] text-[#2d423b] rounded-md hover:bg-[#A6C4BA] disabled:bg-gray-300"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------- Delete Confirmation Modal ------------------- */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 max-w-[90vw]">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Confirm Delete</h3>
            <p className="text-sm text-gray-700 mb-6">
              Are you sure you want to delete this {showDeleteConfirm.type}?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-[#BBD3CC] text-[#2d423b]  rounded-md hover:bg-[#A6C4BA]"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

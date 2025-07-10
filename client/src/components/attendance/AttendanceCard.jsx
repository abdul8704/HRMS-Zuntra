import React, { useState, useEffect } from "react";

const getStatus = () => {
  const statuses = ["ontime", "late", "absent", "remote"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const statusStyles = {
  ontime: "bg-green-400 text-white",
  late: "bg-orange-400 text-white",
  absent: "bg-red-400 text-white",
  remote: "bg-blue-400 text-white",
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const AttendanceCard = () => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const [filteredDates, setFilteredDates] = useState([]);

  const parseDate = (str) => {
    const [day, month, year] = str.split("/").map(Number);
    return new Date(year, month - 1, day);
  };

  const formatDisplayDate = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const monthName = months[d.getMonth()];
    return `${monthName} ${day}`;
  };

  const formatForInput = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const generateDateRange = () => {
    const start = parseDate(fromDate);
    const end = parseDate(toDate);
    const dates = [];
    let current = new Date(start);

    while (current <= end) {
      dates.push({
        date: new Date(current),
        status: getStatus(),
      });
      current.setDate(current.getDate() + 1);
    }
    setFilteredDates(dates);
  };

  const applyDefaultDates = () => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    setFromDate(formatForInput(first));
    setToDate(formatForInput(now));
  };

  useEffect(() => {
    if (!fromDate || !toDate) {
      applyDefaultDates();
    } else {
      generateDateRange();
    }
  }, [fromDate, toDate]);

  const headingMonth = filteredDates[0]
    ? months[filteredDates[0].date.getMonth()]
    : months[new Date().getMonth()];
  const headingYear = filteredDates[0]
    ? filteredDates[0].date.getFullYear()
    : new Date().getFullYear();

  return (
    <div className="w-full h-full bg-purple-100 p-4 rounded-xl overflow-hidden relative">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        {/* Left Title */}
        <div className="text-left">
          <h2 className="text-base font-bold tracking-wide text-gray-800">
            ATTENDANCE RECORD
          </h2>
        </div>

        {/* Centered Month-Year */}
        <div className="text-center mb-4">
          <p className="text-sm text-gray-700 font-medium">
            {headingMonth.toUpperCase()} {headingYear}
          </p>
        </div>

        {/* Right Filter Button */}
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="p-1 hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path
              fill="#000"
              d="M20 16.606a.75.75 0 0 1-.75.75h-5.1a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h7.74a2.93 2.93 0 0 1 5.66 0h5.1a.75.75 0 0 1 .75.75Zm0-13.21a.75.75 0 0 1-.75.75H16.8a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h10.39a2.93 2.93 0 0 1 5.66 0h2.45a.74.74 0 0 1 .75.75Zm0 6.6a.741.741 0 0 1-.75.75H7.55a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h1.14a2.93 2.93 0 0 1 5.66 0h11.7a.75.75 0 0 1 .75.75Z"
            />
          </svg>
        </button>
      </div>
      {/* filter drop down  */}
      {showFilter && (
        <div className="flex gap-4 mb-3 mt-2">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              From
            </label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold text-gray-600 whitespace-nowrap">
              To
            </label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-1 border rounded text-sm"
            />
          </div>
        </div>
      )}


      {/* Table Header */}
      <div className="grid grid-cols-2 bg-purple-300 px-4 py-1.5 rounded font-semibold text-sm mb-1">
        <div>Date</div>
        <div>Report</div>
      </div>

      {/* Attendance Data */}
      <div className="h-full overflow-y-auto">
        {filteredDates.map((entry, idx) => (
          <div
            key={idx}
            className="grid grid-cols-2 items-center px-4 py-2 border-b border-purple-100 text-sm"
          >
            <div>{formatDisplayDate(entry.date)}</div>
            <div>
              <span className={`px-3 py-1 rounded text-xs ${statusStyles[entry.status]}`}>
                {entry.status === "ontime"
                  ? "On Time"
                  : entry.status === "late"
                    ? "Off Time"
                    : entry.status === "absent"
                      ? "Absent"
                      : "Remote"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

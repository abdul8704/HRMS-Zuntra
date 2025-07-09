import React, { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

const getStatus = () => {
  const statuses = ["ontime", "late", "absent", "remote"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const statusStyles = {
  ontime: "bg-green-400 text-white",
  late: "bg-orange-400 text-white",
  absent: "bg-red-400 text-white",
  remote: "bg-blue-400 text-white"
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
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
        status: getStatus()
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
    <div className="w-full h-full bg-purple-100 p-6 rounded-xl shadow-xl overflow-hidden">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-2 relative">
        <div className="text-center w-full">
          {/* UPDATED FONT STYLE FOR ATTENDANCE RECORD */}
          <h2 className="text-base font-bold tracking-wide text-gray-800">
            ATTENDANCE RECORD
          </h2>
          <p className="text-sm text-gray-700 font-medium mt-1">
            {headingMonth.toUpperCase()} {headingYear}
          </p>
        </div>

        <div className="absolute top-0 right-0">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="p-2 rounded-full bg-white shadow hover:bg-purple-200"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* From-To Date Inputs (toggle visible with filter) */}
      {showFilter && (
        <div className="flex gap-4 mb-3 mt-4">
          <div>
            <label className="text-sm font-semibold block mb-1 text-gray-600">From</label>
            <input
              type="text"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="px-3 py-1 border rounded w-full text-sm"
              placeholder="DD/MM/YYYY"
            />
          </div>
          <div>
            <label className="text-sm font-semibold block mb-1 text-gray-600">To</label>
            <input
              type="text"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="px-3 py-1 border rounded w-full text-sm"
              placeholder="DD/MM/YYYY"
            />
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="grid grid-cols-2 bg-purple-300 px-4 py-1.5 rounded font-semibold text-sm mb-1 mt-2">
        <div>Date</div>
        <div>Report</div>
      </div>

      {/* Scrollable Report Table */}
      <div className="max-h-[180px] overflow-y-auto">
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

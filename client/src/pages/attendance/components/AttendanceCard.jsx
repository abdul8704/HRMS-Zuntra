

import React, { useState, useEffect } from "react";
import api from '../../../api/axios';
import { Loader } from "lucide-react";

const overlayBgColors = {
  ontime: "bg-green-100",
  late: "bg-orange-100",
  absent: "bg-red-100",
  remote: "bg-blue-100",
  present: "bg-green-200",
  holiday: "bg-yellow-100",
};

const textColors = {
  ontime: "text-green-700",
  late: "text-orange-700",
  absent: "text-red-700",
  remote: "text-blue-700",
  present: "text-green-800",
  holiday: "text-yellow-700",
};

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const formatDisplayDate = (date) => {
  const d = new Date(date);
  const day = d.getDate();
  const monthName = months[d.getMonth()];
  return `${monthName} ${day}`;
};

// Always return ISO (YYYY-MM-DD)
const formatForInput = (d) => {
  if (!d) return "";
  // if already in YYYY-MM-DD format, just return
  if (/^\d{4}-\d{2}-\d{2}$/.test(d)) return d;

  // if it's an ISO string, strip the time part
  if (typeof d === "string" && d.includes("T")) {
    return d.split("T")[0];
  }

  // fallback for raw Date objects
  const date = new Date(d);
  return date.toISOString().split("T")[0];
};


// Parse ISO -> JS Date (safe for API calls)
const parseDate = (isoStr, isEnd = false) => {
  const [year, month, day] = isoStr.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  if (isEnd) {
    date.setHours(23, 59, 59, 999);
  } else {
    date.setHours(0, 0, 0, 0);
  }
  return date;
};


const convertMinutesToHours = (text) => {
  const match = text.match(/(\d+)\s*minutes?/);
  if (!match) return text;
  const minutes = parseInt(match[1]);
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return text.replace(
    /\d+\s*minutes?/,
    `${hours} hr${hours !== 1 ? "s" : ""} ${mins} min${mins !== 1 ? "s" : ""}`
  );
};

export const AttendanceCard = ({ data }) => {
  // if (!data)
  //   return <Loader />
  const { userid, startDate, endDate } = data;

  const [fromDate, setFromDate] = useState(formatForInput(startDate)); // ISO
  const [toDate, setToDate] = useState(formatForInput(endDate));       // ISO

  const [showFilter, setShowFilter] = useState(false);
  const [filteredDates, setFilteredDates] = useState([]);
  const [summary, setSummary] = useState({
    presentCount: 0,
    absentCount: 0,
    remoteCount: 0,
    holidayCount: 0,
    totalDaysCount: 0,
  });

  const headingDate = new Date(fromDate);
  const headingMonth = months[headingDate.getMonth()];
  const headingYear = headingDate.getFullYear();

  const getAttendanceData = async (from, to) => {
    try {
      console.log("fromDate is ", from)
      const response = await api.get('/api/employee/attendance/attendance-data', {
        params: {
          startDate: from,
          endDate: to,
          userid,
        },
      });

      const rawData = response.data.attendanceData.attendanceData;
      const stats = response.data.attendanceData.stats;

      console.log(stats)

      const transformed = rawData.map(entry => {
        const [main, info] = entry.status.split(" - ");
        let readableStatus = "Absent";
        if (main === "present") readableStatus = "Present";
        else if (main === "remote") readableStatus = "Remote";
        else if (main === "holiday") readableStatus = "Holiday";

        return {
          date: new Date(entry.date),
          status: readableStatus,
          info: info
            ? convertMinutesToHours(info.charAt(0).toUpperCase() + info.slice(1))
            : "—",
        };
      });

      setFilteredDates(transformed);
      setSummary({
        presentCount: stats.presentCount,
        absentCount: stats.absentCount,
        remoteCount: stats.remoteCount,
        holidayCount: stats.holidayCount,
        totalDaysCount: stats.totalDaysCount,
      });
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  useEffect(() => {
    if (!fromDate || !toDate || !userid) return;

    const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    getAttendanceData(fromDate, toDate > today ? today : toDate);
  }, [fromDate, toDate, userid]);

  return (
    <div className="w-full h-full flex flex-col bg-purple-200 p-4 rounded-xl overflow-hidden">
      <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
        <h2 className="text-base font-bold tracking-wide text-gray-800">
          ATTENDANCE RECORD
        </h2>
        <p className="text-sm text-gray-700 font-medium">
          {headingMonth.toUpperCase()} {headingYear}
        </p>
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

      <div className="flex flex-col flex-grow min-h-0 overflow-hidden rounded-md">
        {showFilter && (
          <div className="flex gap-4 px-4 py-1 border-b border-purple-200 flex-wrap bg-transparent">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-600">From</label>
              <input
                type="date"
                value={fromDate}              // ISO string
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-1 bg-black/10 text-black border rounded text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-600">To</label>
              <input
                type="date"
                value={toDate}                // ISO string
                max={formatForInput(new Date())}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-1 bg-black/10 text-black border rounded text-sm"
              />
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 bg-black/10 px-4 py-2 font-semibold text-sm flex-shrink-0">
          <div>Date</div>
          <div>Status</div>
          <div>Info</div>
        </div>

        <div className="overflow-y-auto flex-grow min-h-0">
          {filteredDates.map((entry, idx) => (
            <div key={idx} className="relative py-2">
              <div className="absolute inset-0 bg-transparent z-0" />
              <div
                className={`absolute top-1 bottom-1 left-0 right-0 opacity-90 z-10 ${overlayBgColors[entry.status.toLowerCase()] || "bg-gray-100"
                  }`}
              />
              <div className="relative z-20 grid grid-cols-3 items-center px-4 text-sm">
                <div className="text-black">{formatDisplayDate(entry.date)}</div>
                <div>
                  <span className={`inline-block text-xs font-medium ${textColors[entry.status.toLowerCase()] || "text-gray-700"
                    }`}>
                    {entry.status}
                  </span>
                </div>
                <div className="text-xs text-gray-800 font-medium">
                  {entry.info}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredDates.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          <div className="bg-purple-100 px-3 py-2 rounded text-center min-w-[120px] whitespace-nowrap">
            Total Days: {summary.totalDaysCount}
          </div>
          <div className="bg-yellow-100 px-3 py-2 rounded text-center min-w-[100px]">
            Holiday: {summary.holidayCount}
          </div>
          <div className="bg-green-100 px-3 py-2 rounded text-center min-w-[100px]">
            Present: {summary.presentCount}
          </div>
          <div className="bg-blue-100 px-3 py-2 rounded text-center min-w-[100px]">
            Remote: {summary.remoteCount}
          </div>
          <div className="bg-red-100 px-3 py-2 rounded text-center min-w-[100px]">
            Absent: {summary.absentCount}
          </div>
        </div>
      )}
    </div>
  );
};

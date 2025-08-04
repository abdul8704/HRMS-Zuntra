import React, { useState, useEffect } from "react";
import api from '../../../api/axios'

const getStatus = () => {
  const statuses = ["ontime", "late", "absent", "remote"];
  return statuses[Math.floor(Math.random() * statuses.length)];
};

const overlayBgColors = {
  ontime: "bg-green-100",
  late: "bg-orange-100",
  absent: "bg-red-100",
  remote: "bg-blue-100",
  present: "bg-green-200",
};

const textColors = {
  ontime: "text-green-700",
  late: "text-orange-700",
  absent: "text-red-700",
  remote: "text-blue-700",
  present: "text-green-800",
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
  const [attendanceData, setAttendanceData] = useState([]);
  const [startDate, setStartDate] = useState(new Date("21 July 2025"))
  const [endDate, setEndDate] = useState(new Date("15 aug 2025"))
  const [userid, setUserid] = useState("687dceb3fc671e86d4c1959a")
 
  useEffect(() => {
    const getAttendanceData = async () => {
      const response = await api.get('api/employee/attendance/attendance-data', {
        params: {
          userid,
          startDate,
          endDate
        }
      })

      const data = response.data.attendanceData.attendanceData;
      setAttendanceData(data);

     const parsedData = data.map((entry) => {
  const statusText = entry.status?.toLowerCase() || "";

  let status = "present";
  if (statusText.startsWith("remote")) {
    status = "remote";
  } else if (statusText.includes("absent")) {
    status = "absent";
  } else if (statusText.includes("late")) {
    status = "late";
  } else if (statusText.includes("early")) {
    status = "ontime";
  }

  return {
    date: new Date(entry.date),
    status,
    report: entry.status, // keep the original for display
  };
});

      setFilteredDates(parsedData);
    }

    getAttendanceData();
  }, [])

  const parseDate = (str) => {
    const [year, month, day] = str.split("-").map(Number);
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
    return `${year}-${month}-${day}`;
  };

  const generateDateRange = () => {
    const parsedData = attendanceData.map((entry) => ({
      date: new Date(entry.date),
      status: entry.status,
    }));
    setFilteredDates(parsedData);
  };

  const applyDefaultDates = () => {
    const now = new Date();
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    setFromDate(formatForInput(first));
    setToDate(formatForInput(now));
  };

  const headingMonth = filteredDates[0]
    ? months[filteredDates[0].date.getMonth()]
    : months[new Date().getMonth()];
  const headingYear = filteredDates[0]
    ? filteredDates[0].date.getFullYear()
    : new Date().getFullYear();

    console.log("filtered", filteredDates)

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

      {/* Filter */}
      <div className="flex flex-col flex-grow min-h-0 overflow-hidden rounded-md">
        {showFilter && (
          <div className="flex gap-4 px-4 py-1 border-b border-purple-200 flex-wrap bg-transparent">
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-600">From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="px-3 py-1 bg-black/10 text-black border rounded text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-semibold text-gray-600">To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="px-3 py-1 bg-black/10 text-black border rounded text-sm"
              />
            </div>
          </div>
        )}

        {/* Table header */}
        <div className="grid grid-cols-2 bg-black/10 px-4 py-2 font-semibold text-sm flex-shrink-0">
          <div>Date</div>
          <div>Report</div>
        </div>

        {/* Table rows */}
        <div className="overflow-y-auto flex-grow min-h-0">
          {filteredDates.map((entry, idx) => (
            <div key={idx} className="relative py-2">
              <div className="absolute inset-0 bg-transparent z-0" />
              <div
                className={`absolute top-1 bottom-1 left-0 right-0 opacity-90 z-10 ${overlayBgColors[entry.status]}`}
              />
              <div className="relative z-20 grid grid-cols-2 items-center px-4 text-sm">
                <div className="text-black">{formatDisplayDate(entry.date)}</div>
                <div>
                 <span className={`inline-block text-xs font-medium ${textColors[entry.status]}`}>
  {entry.report}
</span>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

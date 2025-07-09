import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const weekData = {
  Week1: [
    { day: 'SUN', 'To Do': 10, 'In Review': 35, 'Completed': 5 },
    { day: 'MON', 'To Do': 20, 'In Review': 5, 'Completed': 40 },
    { day: 'TUE', 'To Do': 30, 'In Review': 22, 'Completed': 10 },
    { day: 'WED', 'To Do': 10, 'In Review': 38, 'Completed': 25 },
    { day: 'THU', 'To Do': 25, 'In Review': 40, 'Completed': 5 },
    { day: 'FRI', 'To Do': 5, 'In Review': 20, 'Completed': 33 },
    { day: 'SAT', 'To Do': 25, 'In Review': 5, 'Completed': 15 },
  ],
  Week2: [
    { day: 'SUN', 'To Do': 5, 'In Review': 15, 'Completed': 10 },
    { day: 'MON', 'To Do': 8, 'In Review': 10, 'Completed': 5 },
    { day: 'TUE', 'To Do': 12, 'In Review': 30, 'Completed': 15 },
    { day: 'WED', 'To Do': 18, 'In Review': 25, 'Completed': 20 },
    { day: 'THU', 'To Do': 20, 'In Review': 18, 'Completed': 12 },
    { day: 'FRI', 'To Do': 4, 'In Review': 12, 'Completed': 10 },
    { day: 'SAT', 'To Do': 2, 'In Review': 6, 'Completed': 8 },
  ],
  Week3: [
    { day: 'SUN', 'To Do': 3, 'In Review': 12, 'Completed': 14 },
    { day: 'MON', 'To Do': 10, 'In Review': 8, 'Completed': 6 },
    { day: 'TUE', 'To Do': 7, 'In Review': 15, 'Completed': 10 },
    { day: 'WED', 'To Do': 5, 'In Review': 18, 'Completed': 9 },
    { day: 'THU', 'To Do': 22, 'In Review': 14, 'Completed': 11 },
    { day: 'FRI', 'To Do': 1, 'In Review': 9, 'Completed': 13 },
    { day: 'SAT', 'To Do': 0, 'In Review': 11, 'Completed': 7 },
  ],
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium text-gray-800">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ProgressStatus = () => {
  const [selectedWeek, setSelectedWeek] = useState('Week1');

  return (
    <div className="w-full h-full bg-[#DDB3DD] rounded-xl p-3">
      {/* Header Row with Filter Icon */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <p className="text-[clamp(0.8rem,1vw,0.9rem)] font-bold text-black">
            Progress
          </p>
        </div>
        {/* Filter Icon */}
        <div className="cursor-pointer hover:scale-110 transition-transform duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            fill="none"
            viewBox="0 0 24 24"
            className="w-4 h-4"
          >
            <path
              fill="#000"
              d="M20 16.606a.75.75 0 0 1-.75.75h-5.1a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h7.74a2.93 2.93 0 0 1 5.66 0h5.1a.75.75 0 0 1 .75.75Zm0-13.21a.75.75 0 0 1-.75.75H16.8a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h10.39a2.93 2.93 0 0 1 5.66 0h2.45a.74.74 0 0 1 .75.75Zm0 6.6a.741.741 0 0 1-.75.75H7.55a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h1.14a2.93 2.93 0 0 1 5.66 0h11.7a.75.75 0 0 1 .75.75Z"
            />
          </svg>
        </div>
      </div>

      {/* Week Dropdown */}
      {/* <div className="flex justify-end mb-2">
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
          className="bg-[#E9C6E9] px-3 py-[2px] rounded-md text-sm text-black outline-none focus:ring-0 focus:outline-none cursor-pointer"
        >
          <option value="Week1">WEEK 1</option>
          <option value="Week2">WEEK 2</option>
          <option value="Week3">WEEK 3</option>
        </select>
      </div> */}

      {/* Chart */}
      <div className="w-full h-[180px] flex items-center justify-center">
        <ResponsiveContainer width="95%" height="100%">
          <LineChart
            data={weekData[selectedWeek]}
            margin={{ top: 0, right: 20, bottom: 80, left: -30 }}
          >
            <XAxis
              dataKey="day"
              axisLine={true}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', dy: 1 }}
            />
            <YAxis
              domain={[0, 50]}
              axisLine={true}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280', dx: -5 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="linear"
              dataKey="To Do"
              stroke="#EF4444"
              strokeWidth={3}
              dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#EF4444' }}
            />
            <Line
              type="linear"
              dataKey="In Review"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3B82F6' }}
            />
            <Line
              type="linear"
              dataKey="Completed"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#10B981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <style>{`
        .recharts-surface:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
};

export default ProgressStatus;

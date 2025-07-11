import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const WorkBreakComposition = () => {
  const [selectedOption, setSelectedOption] = useState("this-week");
  const [showFilters, setShowFilters] = useState(false);

  const data = {
    "this-week": [
      { name: "SUN", work: 0, break: 6 },
      { name: "MON", work: 7, break: 1 },
      { name: "TUE", work: 4, break: 4 },
      { name: "WED", work: 3, break: 3 },
      { name: "THU", work: 10, break: 0 },
      { name: "FRI", work: 0, break: 8 },
      { name: "SAT", work: 10, break: 0 },
    ],
    "this-month": [
      { name: "Week 1", work: 75, break: 15 },
      { name: "Week 2", work: 30, break: 10 },
      { name: "Week 3", work: 28, break: 12 },
      { name: "Week 4", work: 32, break: 8 },
    ],
    "last-year": [
      { name: "Jan", work: 120, break: 40 },
      { name: "Feb", work: 110, break: 50 },
      { name: "Mar", work: 135, break: 35 },
      { name: "Apr", work: 125, break: 45 },
      { name: "May", work: 140, break: 30 },
      { name: "Jun", work: 130, break: 40 },
      { name: "Jul", work: 145, break: 25 },
      { name: "Aug", work: 128, break: 42 },
      { name: "Sep", work: 132, break: 38 },
      { name: "Oct", work: 138, break: 32 },
      { name: "Nov", work: 142, break: 28 },
      { name: "Dec", work: 135, break: 35 },
    ],
  };

  const getYAxisMax = () => {
    const currentData = data[selectedOption];
    const maxWork = Math.max(...currentData.map((item) => item.work));
    const maxBreak = Math.max(...currentData.map((item) => item.break));
    return Math.ceil(Math.max(maxWork, maxBreak) * 1.2);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-800">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === "work" ? "Work" : "Break"}: {entry.value} hours
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const filterOptions = [
    { value: "this-week", label: "Last Week" },
    { value: "this-month", label: "Last Month" },
    { value: "last-year", label: "Last Year" },
  ];

  return (
    <>
    <div className="relative w-full h-full rounded-2xl flex flex-col text-[clamp(0.7rem,1.2vw,1rem)] p-[clamp(0.5rem,1vw,1rem)] bg-pink-100">
  {/* Header */}
  <div className="flex items-center justify-between font-semibold text-[1.1rem] mb-2">
    <span className="font-semibold text-gray-800 text-[clamp(0.9rem,1.5vw,0.3rem)]">
      Work Break Composition
    </span>

    {/* Filter Icon */}
    <button
      onClick={() => setShowFilters(true)}
      className="cursor-pointer p-1 hover:scale-110 transition-transform duration-200"
    >
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
    </button>
  </div>

  {/* Chart content goes here */}


  {/* Your chart or content goes here */}


        {/* Chart */}
        <div className="flex w-full  h-full items-center justify-center">
          <ResponsiveContainer width="90%" height="90%">
            <LineChart
              data={data[selectedOption]}
              margin={{ top: 0, right: 20, bottom: 0, left: -30 }}
            >
              <XAxis
                dataKey="name"
                axisLine={true}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280",  dy: 8}}
              />
              <YAxis
                domain={[0, getYAxisMax()]}
                axisLine={true}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280",dx: -10 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                dataKey="work"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#10B981" }}
              />
              <Line
                dataKey="break"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, fill: "#EF4444" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Sidebar Overlay */}
        <div
          className={`absolute top-0 right-0 h-full w-48 rounded-l-xl backdrop-blur-md bg-white/30 border-l border-white/40 shadow-lg transition-transform duration-300 z-30 ${
            showFilters ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-white/30 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-800">Filter</h2>
            <button
              onClick={() => setShowFilters(false)}
              className="text-gray-600 hover:text-gray-900 text-sm"
            >
              ✕
            </button>
          </div>
          <div className="p-4 space-y-2">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setSelectedOption(option.value);
                  setShowFilters(false);
                }}
                className={`w-full text-left p-2 text-sm rounded-lg transition-all duration-200 ${
                  selectedOption === option.value
                    ? "bg-purple-100 border border-purple-300 text-purple-800"
                    : "hover:bg-white/50 border border-transparent text-gray-700"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .recharts-surface:focus {
          outline: none;
        }
      `}</style>
    </>
  );
};

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const dayLabels = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export const WorkBreakComposition = ({ data }) => {
  const [selectedOption, setSelectedOption] = useState("this-week");
  const [showFilters, setShowFilters] = useState(false);

  const currentData = (data?.[selectedOption] || []).map((item, index) => ({
    ...item,
    work: item.work ?? 0,
    break: item.break ?? 0,
    label: selectedOption === "this-week" ? dayLabels[index] : item.name,
    tooltipLabel: item.name, // keep original date for tooltip
  }));

  const getYAxisMax = () => {
    const maxWork = Math.max(...currentData.map((item) => item.work));
    const maxBreak = Math.max(...currentData.map((item) => item.break));
    return Math.ceil(Math.max(maxWork, maxBreak) * 1.2);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload?.length) {
      const originalLabel = payload[0].payload.tooltipLabel;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-800">{originalLabel}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === "work" ? "Work" : "Break"}: {entry.value} min
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="relative w-full h-full rounded-2xl flex flex-col p-4 bg-pink-100 overflow-hidden text-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-800 text-lg">Work Break Composition</span>
        <button onClick={() => setShowFilters(true)}>
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
            <path
              fill="currentColor"
              d="M20 16.606a.75.75 0 0 1-.75.75h-5.1a2.93 2.93 0 0 1-5.66 0H.75a.75.75 0 0 1 0-1.5h7.74a2.93 2.93 0 0 1 5.66 0h5.1a.75.75 0 0 1 .75.75Z"
            />
          </svg>
        </button>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={currentData}>
          <XAxis dataKey="label" tick={{ fontSize: 12 }} />
          <YAxis domain={[0, getYAxisMax()]} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="work" stroke="#10B981" strokeWidth={3} dot />
          <Line type="monotone" dataKey="break" stroke="#EF4444" strokeWidth={3} dot />
        </LineChart>
      </ResponsiveContainer>

      {/* Filter Sidebar */}
      <div
      
        className={`absolute top-0 right-0 h-full w-48 bg-white/80 backdrop-blur-md rounded-l-xl transition-transform duration-300 z-30 ${
          showFilters ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
          <span className="font-medium">Filter</span>
          <button onClick={() => setShowFilters(false)}>✕</button>
        </div>
        <div className="p-4 space-y-2">
          {[
            { value: "this-week", label: "This Week" },
            { value: "this-month", label: "This Month" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setSelectedOption(opt.value);
                setShowFilters(false);
              }}
              className={`w-full p-2 rounded-lg text-left ${
                selectedOption === opt.value
                  ? "bg-purple-100 text-purple-800 font-medium"
                  : "hover:bg-purple-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

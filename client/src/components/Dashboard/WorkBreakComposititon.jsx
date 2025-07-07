import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChevronDown } from "lucide-react";

const WorkBreakComposition = () => {
  const [selectedOption, setSelectedOption] = useState("this-week");

  const data = {
    "this-week": [
      { name: "SUN", work: 0, break: 0 },
      { name: "MON", work: 7, break: 1 },
      { name: "TUE", work: 4, break: 4 },
      { name: "WED", work: 3, break: 3 },
      { name: "THU", work: 0, break: 0 },
      { name: "FRI", work: 0, break: 0 },
      { name: "SAT", work: 0, break: 0 },
    ],
    "this-month": [
      { name: "Week 1", work: 25, break: 15 },
      { name: "Week 2", work: 30, break: 10 },
      { name: "Week 3", work: 28, break: 12 },
      { name: "Week 4", work: 32, break: 8 },
    ],
    "last-6-months": [
      { name: "Jan", work: 120, break: 40 },
      { name: "Feb", work: 110, break: 50 },
      { name: "Mar", work: 135, break: 35 },
      { name: "Apr", work: 125, break: 45 },
      { name: "May", work: 140, break: 30 },
      { name: "Jun", work: 130, break: 40 },
    ],
  };

  const getYAxisMax = () => {
    const currentData = data[selectedOption];
    const maxWork = Math.max(...currentData.map((item) => item.work));
    const maxBreak = Math.max(...currentData.map((item) => item.break));
    return Math.ceil(Math.max(maxWork, maxBreak) * 1.2);
  };

  return (
    <div className="w-full h-full bg-transparent p-4 flex flex-col gap-4">
      <h2 className="font-semibold text-gray-800 text-[clamp(0.9rem,1.5vw,0.3rem)]">
        Work Break Composition
      </h2>

      <div className="flex items-center gap-4">
  
  {/* Chart Container */}
  <div className="bg-white/1 backdrop-blur-sm rounded-2xl p-2 flex flex-col h-[250px] w-[70%] relative">
  
  {/* Legends inside Chart */}
 {/* Legends inside Chart */}
<div className="absolute top-2 right-4 flex flex-col gap-2 z-10">
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">WORK</span>
  </div>
  <div className="flex items-center gap-2">
    <div className="w-3 h-3 rounded-full bg-red-500"></div>
    <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">BREAK</span>
  </div>
</div>

  {/* Chart */}
  <ResponsiveContainer width="100%" height="70%">
    <LineChart
      data={data[selectedOption]}
      margin={{ top: 10, right: 20, left: -10, bottom: 0 }}
    >
      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
      <YAxis domain={[0, getYAxisMax()]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} tickMargin={10} />
      <Line dataKey="work" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: "#10B981" }} />
      <Line dataKey="break" stroke="#EF4444" strokeWidth={3} dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: "#EF4444" }} />
    </LineChart>
  </ResponsiveContainer>
</div>

  {/* Legends and Dropdown */}
  <div className="flex flex-col justify-between h-[250px] w-[30%]">
    {/* Dropdowns */}
<div className="flex flex-col gap-2">
  <div className="relative">
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className="appearance-none bg-white/30 backdrop-blur-sm text-gray-700 font-medium text-[clamp(0.5rem,0.7vw,0.7rem)] px-3 py-2 pr-10 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:bg-white/40 cursor-pointer uppercase tracking-wide"
    >
      <option value="this-week" className="bg-white text-gray-800 normal-case">
        This Week
      </option>
    </select>
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
  </div>

  <div className="relative">
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className="appearance-none bg-white/30 backdrop-blur-sm text-gray-700 font-medium text-[clamp(0.5rem,0.7vw,0.7rem)] px-3 py-2 pr-10 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:bg-white/40 cursor-pointer uppercase tracking-wide"
    >
      <option value="this-month" className="bg-white text-gray-800 normal-case">
        This Month
      </option>
      <option value="last-6-months" className="bg-white text-gray-800 normal-case">
        Last 6 Months
      </option>
    </select>
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
  </div>

  <div className="relative">
    <select
      value={selectedOption}
      onChange={(e) => setSelectedOption(e.target.value)}
      className="appearance-none bg-white/30 backdrop-blur-sm text-gray-700 font-medium text-[clamp(0.5rem,0.7vw,0.7rem)] px-3 py-2 pr-10 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 focus:border-transparent transition-all duration-200 hover:bg-white/40 cursor-pointer uppercase tracking-wide"
    >
      <option value="last-12-months" className="bg-white text-gray-800 normal-case">
        Last 12 Months
      </option>
    </select>
    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
  </div>
</div>
</div>
</div>
 </div>
  );
};

export default WorkBreakComposition;

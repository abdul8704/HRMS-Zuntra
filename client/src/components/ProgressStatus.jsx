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
    { day: 'SUN', value: 0 },
    { day: 'MON', value: 15 },
    { day: 'TUE', value: 9 },
    { day: 'WED', value: 10 },
    { day: 'THU', value: 25 },
    { day: 'FRI', value: 0 },
    { day: 'SAT', value: 0 },
  ],
  Week2: [
    { day: 'SUN', value: 5 },
    { day: 'MON', value: 8 },
    { day: 'TUE', value: 12 },
    { day: 'WED', value: 18 },
    { day: 'THU', value: 20 },
    { day: 'FRI', value: 4 },
    { day: 'SAT', value: 2 },
  ],
  Week3: [
    { day: 'SUN', value: 3 },
    { day: 'MON', value: 10 },
    { day: 'TUE', value: 7 },
    { day: 'WED', value: 5 },
    { day: 'THU', value: 22 },
    { day: 'FRI', value: 1 },
    { day: 'SAT', value: 0 },
  ],
};

const ProgressStatus = () => {
  const [selectedWeek, setSelectedWeek] = useState('Week1');

  const handleWeekChange = (e) => {
    setSelectedWeek(e.target.value);
  };

  return (
    <div className="w-full h-full bg-[#DDB3DD] rounded-xl p-4 focus:outline-none">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-[16px] font-bold text-black">Progress</p>
        <select
          value={selectedWeek}
          onChange={handleWeekChange}
          className="bg-[#E9C6E9] px-3 py-[2px] rounded-md text-sm text-black outline-none focus:ring-0 focus:outline-none cursor-pointer"
        >
          <option value="Week1">WEEK 1</option>
          <option value="Week2">WEEK 2</option>
          <option value="Week3">WEEK 3</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={140} className="outline-none focus:outline-none">
        <LineChart data={weekData[selectedWeek]}>
          <XAxis dataKey="day" stroke="#000" />
          <YAxis stroke="#000" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="blue"
            strokeWidth={2}
            dot={{ r: 3, stroke: '#fff', strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProgressStatus;

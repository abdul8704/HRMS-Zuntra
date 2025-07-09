import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { day: 'SUN', value: 0 },
  { day: 'MON', value: 15 },
  { day: 'TUE', value: 9 },
  { day: 'WED', value: 10 },
  { day: 'THU', value: 25 },
  { day: 'FRI', value: 0 },
  { day: 'SAT', value: 0 },
];

const ProgressStatus = () => {
  return (
    <div className="w-full h-full bg-[#DDB3DD] rounded-xl p-4">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-2">
        <p className="text-[16px] font-bold text-black">Progress</p>
        <div className="bg-[#E9C6E9] px-4 py-[2px] rounded-md text-sm text-black">
          WEEK ▼
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={data}>
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

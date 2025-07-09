import React, { useState } from 'react';
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
  const [selected, setSelected] = useState('WEEK');
  const [open, setOpen] = useState(false);

  const options = ['WEEK', 'MONTH'];

  return (
    <div className="w-full h-full bg-[#DDB3DD] rounded-xl p-4 flex flex-col justify-between relative">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-2 relative">
        <h2 className="text-[14px] font-semibold text-black">Progress</h2>

        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="text-xs bg-[#E9C6E9] px-3 py-[2px] rounded-md text-black"
          >
            {selected} ▼
          </button>

          {open && (
            <div className="absolute right-0 mt-1 bg-white border rounded shadow-md z-10">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelected(option);
                    setOpen(false);
                  }}
                  className="px-4 py-1 text-sm text-black hover:bg-[#E9C6E9] cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Line Chart */}
      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
            <XAxis dataKey="day" stroke="#000" tick={{ fontSize: 10 }} />
            <YAxis stroke="#000" tick={{ fontSize: 10 }} />
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
    </div>
  );
};

export default ProgressStatus;

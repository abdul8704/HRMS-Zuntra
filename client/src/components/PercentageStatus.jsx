import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const PercentageStatus = () => {
  const data = [
    { label: 'Completed', value: 55, color: '#22c55e' },   // Green
    { label: 'In Review', value: 10, color: '#3b82f6' },   // Blue
    { label: 'To Do', value: 35, color: '#ef4444' },       // Red
  ];

  return (
    <div className="h-full w-full bg-[#C3C3C3] p-4 rounded-xl flex justify-around items-center">
      {data.map((item, index) => (
        <div key={index} className="w-[100px] h-[100px] flex items-center justify-center">
          <CircularProgressbarWithChildren
            value={item.value}
            styles={buildStyles({
              pathColor: item.color,
              trailColor: '#e5e7eb',
            })}
          >
            <div className="text-center">
              <div className="text-[20px] font-bold text-black leading-none">
                {item.value}%
              </div>
              <div className="text-[12px] text-gray-500 leading-none">
                {item.label}
              </div>
            </div>
          </CircularProgressbarWithChildren>
        </div>
      ))}
    </div>
  );
};

export default PercentageStatus;

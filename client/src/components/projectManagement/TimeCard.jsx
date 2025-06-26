import React from 'react';
import {BreakTime} from "../attendance/BreakTime"


export const TimeCard = ({ icon, time, label, bgColor }) => {
  return (
    <>
      <div className="time-card" style={{ backgroundColor: bgColor }}>
          <BreakTime/>
      </div>

      <style>
        {`
          .time-card {
            display: flex;
            align-items: center;
            border-radius: 20px;
            height: 100%;
            width: 100%;
          }

          .icon {
            font-size: 2rem;
            margin-right: 1rem;
          }

          .time-section {
            display: flex;
            flex-direction: column;
          }

          .time {
            font-size: 1.5rem;
            font-weight: bold;
          }

          .label {
            font-size: 0.9rem;
            color: #555;
          }
        `}
      </style>
    </>
  );
};

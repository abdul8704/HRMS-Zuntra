import React from 'react';
import { TimeCard } from '../dashboard/TimeCard';
import { AttendanceCalendar } from '../attendance/AttendanceCalendar';
import ProgressCard from '../attendance/ProgressCard';
import { AttendanceCard } from '../attendance/AttendanceCard';

export const EmployeeDetailsAssignment = () => {
  return (
    <div className="flex-1 grid grid-cols-8 grid-rows-12 gap-2 h-full w-full gap-[1rem]">
      <div className="col-start-1 row-start-1 row-end-3">
        <TimeCard state="in" time="09:20" showLabel={false} color={true} />
      </div>

      <div className="col-start-1 row-start-3 row-end-5">
        <TimeCard state="out" time="09:20" showLabel={false} color={true} />
      </div>

      <div className="col-start-2 row-start-1 row-end-3">
        <TimeCard state="work" time="09:20" showLabel={false} color={true} />
      </div>

      <div className="col-start-2 row-start-3 row-end-5">
        <TimeCard state="break" time="09:20" showLabel={false} color={true} />
      </div>

      <div className="col-start-3 col-end-6 row-start-1 row-end-5 bg-gray-100 rounded-lg p-4">
        LEAVE SPACE FOR CHART
      </div>

      <div className="bg-black/20 col-start-6 col-end-10 row-start-1 row-end-7 rounded-lg ">
            {/* Attendance Calendar */}
          <AttendanceCard />
      </div>

      <div className="bg-black/20 col-start-6 col-end-10 row-start-7 row-end-13 min-h-0 rounded-lg p-4">
          Leave
      </div>

      {/* <div className="col-start-1 col-end-5 row-start-6 row-end-9 min-h-0 overflow-hidden">
        <div className="h-full overflow-auto">
          <ProgressCard />
        </div>
      </div> */}

      <div className=" bg-[#FFFF00] col-start-1 col-end-6 row-start-5 row-end-13 rounded-lg">
        {/* Attendance Report */}
        {/* <div className="h-full overflow-auto"> */}
          <AttendanceCalendar/>
        {/* </div> */}
      </div>
    </div>
  );
};

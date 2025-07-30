import React, { useState, useEffect } from "react";
import { TimeCard } from '../../dashboard/components/TimeCard';
import { AttendanceCalendar } from '../../attendance/components/AttendanceCalendar';
import { AttendanceCard } from '../../attendance/components/AttendanceCard';
import { WorkBreakComposition } from '../../dashboard/components/WorkBreakComposititon'
import api from '../../../api/axios';

export const EmployeeDetailsAssignment = ({userid}) => {
  const [calendarData, setcalendarData] = useState([]);
  useEffect(() => {
    const fetchCalendarData = async () => {
      const now = new Date();
      const endDate = now.toISOString();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startDate = startOfMonth.toISOString();

      try {
        const response = await api.get('/api/employee/attendance/calendar', {
          params: {
            startDate,
            endDate,
            userid,
          }
        });

        setcalendarData(response.data.calendarData);

        console.log('Calendar Data:', response.data.calendarData);
      } catch (err) {
        console.error('Error fetching calendar data:', err);
      }
    };

    fetchCalendarData();
  }, [userid]);

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

      <div className="bg-black/10 col-start-3 col-end-6 row-start-1 row-end-5 rounded-lg overflow-hidden">
        <WorkBreakComposition />
      </div>

      <div className="col-start-6 col-end-10 row-start-1 row-end-7 rounded-lg ">
        {/* Attendance Calendar */}
        <AttendanceCard />
      </div>

      <div className="bg-black/20 col-start-6 col-end-10 row-start-7 row-end-12 min-h-0 rounded-lg p-4">
        Leave
      </div>

      {/* <div className="col-start-1 col-end-5 row-start-6 row-end-9 min-h-0 overflow-hidden">
        <div className="h-full overflow-auto">
          <ProgressCard />
        </div>
      </div> */}

      <div className="col-start-1 col-end-6 row-start-5 row-end-12 rounded-lg">
        {/* Attendance Report */}
        {/* <div className="h-full overflow-auto"> */}
        <AttendanceCalendar calendarData={calendarData} />
        {/* </div> */}
      </div>
    </div>
  );
};

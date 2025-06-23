import React from "react";
import ProfileSidebar from "../components/employeeManagement/EmpSideBar";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import AttendanceCard from "../components/attendance/AttendanceCard";
import InTime from "../components/attendance/InTime";
import OutTime from "../components/attendance/OutTime";
import WorkTime from "../components/attendance/WorkTime";
import BreakTime from "../components/attendance/BreakTime";
import ProgressCard from "../components/attendance/ProgressCard";
import TabNavigationCard from "../components/attendance/TabNavigationCard";
// import ProgressCard from "../components/attendance/ProgressCard";
/**
 * ┌───────────────┬───────────────────────────────┐
 * │               │                               │
 * │  1a  1b       │  2  (AttendanceCalendar)      │  ← 60 % height
 * │  1c  1d       │                               │
 * ├───────────────┼───────────────────────────────┤
 * │               │                               │
 * │  3 (AttendanceCard) │ 4 (ProgressCard)        │  ← 40 % height
 * │               │                               │
 * └───────────────┴───────────────────────────────┘
 * (1a = InTime, 1b = OutTime, 1c = WorkTime, 1d = BreakTime)
 */
export const HrEmployeeDetail = () => {
  return (
    <div className="attendance-page">
      <ProfileSidebar />

      <div className="attendance-container">
        {/* optional header / tabs */}
        <TabNavigationCard />

        {/* 6 : 4  –  50 : 50 grid */}
        <div className="dashboard-grid">
          {/* 1st position, itself a 2×2 grid */}
          <div className="time-card-grid">
            <InTime />
            <OutTime />
            <WorkTime />
            <BreakTime />
          </div>

          {/* 2nd position */}
          <div className="calendar-wrapper">
            <AttendanceCalendar />
          </div>

          {/* 3rd position */}
          <div className="attendance-card-wrapper">
            <AttendanceCard />
          </div>

          {/* 4th position */}
          <div className="progress-card-wrapper">
            <ProgressCard />
          </div>
        </div>
      </div>

      <style jsx>{`
        /* --- overall sidebar + main column --- */
        .attendance-page {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }
        /* sidebar comes first; keep your existing sidebar styles */

        /* --- main column --- */
        .attendance-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
          padding: 24px;
          overflow: hidden; /* grid will scroll internally */
        }

        /* --- large 2×2 grid (60/40 height, 50/50 width) --- */
        .dashboard-grid {
          flex: 1;                       /* fill remaining space */
          display: grid;
          grid-template-columns: 1fr 1fr; /* 50 : 50 */
          grid-template-rows: 6fr 4fr;    /* 60 : 40 */
          gap: 24px;
          overflow: auto;
        }

        /* assign areas for clarity (optional) */
        .time-card-grid         { grid-area: 1 / 1 / 2 / 2; }
        .calendar-wrapper       { grid-area: 1 / 2 / 2 / 3; }
        .attendance-card-wrapper{ grid-area: 2 / 1 / 3 / 2; }
        .progress-card-wrapper  { grid-area: 2 / 2 / 3 / 3; }

        /* --- inner 2×2 grid for the four time cards --- */
        .time-card-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          grid-template-rows: repeat(2, 1fr);
          gap: 16px;
        }
      `}</style>
    </div>
  );
};

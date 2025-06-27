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

/**
 * 8x7 Grid Layout:
 * ┌────┬────┬────┬────┬────┬────┬────┐
 * │1a  │1a  │1b  │1b  │LEAVE│CAL │CAL │
 * ├────┼────┼────┼────┼SPACE│ENDER│ENDER│
 * │1c  │1c  │1d  │1d  │FOR │CAL │CAL │
 * ├────┼────┼────┼────┼CHART│ENDER│ENDER│
 * │    │    │    │    │    │CAL │CAL │
 * ├────┼────┼────┼────┼────┼ENDER│ENDER│
 * │    │    │    │    │    │CAL │CAL │
 * ├────┼────┼────┼────┼────┼────┼────│
 * │PROGRESS│PROGRESS│ATTENDANCE│ATTEN│
 * ├CARD   │CARD    │CARD      │DANCE│
 * │PROGRESS│PROGRESS│ATTENDANCE│CARD │
 * └────────┴────────┴──────────┴─────┘
 */

export const HrEmployeeDetail = () => {
  return (
    <div className="attendance-page">
      <ProfileSidebar />
      
      <div className="attendance-container">
        {/* Optional header / tabs */}
        <TabNavigationCard />
        
        {/* 8x7 Grid Layout */}
        <div className="dashboard-grid-8x7">
          {/* 1a - InTime (spans 2x1) */}
          <div className="in-time-wrapper">
            <InTime />
          </div>
          
          {/* 1b - OutTime (spans 2x1) */}
          <div className="out-time-wrapper">
            <OutTime />
          </div>
          
          {/* 1c - WorkTime (spans 2x1) */}
          <div className="work-time-wrapper">
            <WorkTime />
          </div>
          
          {/* 1d - BreakTime (spans 2x1) */}
          <div className="break-time-wrapper">
            <BreakTime />
          </div>
          
          {/* Leave Space for Chart (spans 1x4) */}
          <div className="leave-chart-space">
            {/* You can add your leave chart component here */}
            <div className="placeholder-content">LEAVE SPACE FOR CHART</div>
          </div>
          
          {/* Calendar Card (spans 2x6) */}
          <div className="calendar-wrapper">
            <AttendanceCalendar />
          </div>
          
          {/* Progress Card (spans 2x4) */}
          <div className="progress-card-wrapper">
            <ProgressCard />
          </div>
          
          {/* Attendance Card (spans 2x3) */}
          <div className="attendance-card-wrapper">
            <AttendanceCard />
          </div>
        </div>
      </div>

      <style>{`
        /* --- Overall sidebar + main column --- */
        .attendance-page {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        /* --- Main column --- */
        .attendance-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px;
          overflow: hidden;
        }

        /* --- 8x7 Grid Layout --- */
        .dashboard-grid-8x7 {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(8, 1fr);
          gap: 8px;
          height: 100%;
          overflow: hidden;
        }

        /* --- Grid positioning for each component --- */
        
        /* 1a - InTime: column 1, rows 1-2 */
        .in-time-wrapper {
          grid-column: 1 / 1;
          grid-row: 1 / 2;
          min-height: 0;
        }
        
        /* 1c - WorkTime: column 1, row 3 */
        .work-time-wrapper {
          grid-column: 1 / 2;
          grid-row: 3 / 2;
          min-height: 0;
        }
        
        /* 1b - OutTime: column 1, row 4 */
        .out-time-wrapper {
          grid-column: 1 / 2;
          grid-row: 4 / 3;
          min-height: 0;
        }
        
        /* 1d - BreakTime: column 1, row 5 */
        .break-time-wrapper {
          grid-column: 1 / 2;
          grid-row: 5 / 4;
          min-height: 0;
          
        }
        
        /* Leave Space for Chart: columns 2-4, rows 1-5 */
        .leave-chart-space {
          grid-column: 2 / 5;
          grid-row: 1 / 5;
          min-height: 0;
          background: #f3f4f6;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: #6b7280;
          text-align: center;
          padding: 16px;
        }
        
        /* Calendar: columns 5-7, rows 1-5 */
        .calendar-wrapper {
          grid-column: 5 / 8;
          grid-row: 1/ 6;
          min-height: 0;
          overflow: hidden;
        }
        
        /* Progress Card: columns 1-4, rows 6-8 */
        .progress-card-wrapper {
          grid-column: 1 / 5;
          grid-row: 5/ 9;
          min-height: 0;
          overflow: hidden;
        }
        
        /* Attendance Card: columns 5-7, rows 6-8 */
        .attendance-card-wrapper {
          grid-column: 5 / 8;
          grid-row: 5/ 9;
          min-height: 0;
          overflow: hidden;
        }

        /* --- Component styling adjustments for compact view --- */
        .in-time-wrapper > *,
        .out-time-wrapper > *,
        .work-time-wrapper > *,
        .break-time-wrapper > * {
          height: 100%;
          font-size: 0.875rem;
          padding: 8px;
        }
        
        /* Calendar - Non-scrollable with reduced size */
        .calendar-wrapper > * {
          height: 100%;
          overflow: hidden;
          transform: scale(0.75);
          transform-origin: top left;
          width: 133.33%; /* Compensate for scale */
          max-height: 100%;
        }
        
        .calendar-wrapper {
          padding: 8px;
        }
        
        .progress-card-wrapper > *,
        .attendance-card-wrapper > * {
          height: 100%;
          overflow: auto;
        }
        
        .placeholder-content {
          font-weight: 500;
        }

        /* --- Responsive adjustments --- */
        @media (max-width: 1200px) {
          .dashboard-grid-8x7 {
            gap: 6px;
          }
          
          .attendance-container {
            gap: 12px;
            padding: 12px;
          }
        }
        
        @media (max-width: 992px) {
          .dashboard-grid-8x7 {
            gap: 4px;
          }
          
          .attendance-container {
            gap: 8px;
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};
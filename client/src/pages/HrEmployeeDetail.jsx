import React from "react";
import ProfileSidebar from "../components/employeeManagement/EmpSideBar";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import AttendanceCard from "../components/attendance/AttendanceCard";
import ProgressCard from "../components/attendance/ProgressCard";
import TabNavigationCard from "../components/attendance/TabNavigationCard";
import { TimeCard } from "../components/Dashboard/TimeCard"; // ✅ Imported TimeCard

export const HrEmployeeDetail = () => {
  const [tabVariable, setTabVariable] = React.useState(0);

  return (
    <div className="attendance-page">
      <ProfileSidebar />

      <div className="attendance-container">
        <TabNavigationCard
          tabVariable={tabVariable}
          setTabVariable={setTabVariable}
        />

        {tabVariable === 0 && (
          <div className="dashboard-grid-8x7">
            {/* Replaced time components with TimeCard */}
            <div className="in-time-wrapper">
              <TimeCard state="in" time="09:00" showLabel />
            </div>

            <div className="out-time-wrapper">
              <TimeCard state="out" time="18:00" showLabel />
            </div>

            <div className="work-time-wrapper">
              <TimeCard state="work" time="8h 30m" showLabel />
            </div>

            <div className="break-time-wrapper">
              <TimeCard state="break" time="1h 00m" showLabel />
            </div>

            <div className="leave-chart-space">
              <div className="placeholder-content">LEAVE SPACE FOR CHART</div>
            </div>

            <div className="calendar-wrapper">
              <AttendanceCalendar />
            </div>

            <div className="progress-card-wrapper">
              <ProgressCard />
            </div>

            <div className="attendance-card-wrapper">
              <AttendanceCard />
            </div>
          </div>
        )}

        {tabVariable === 1 && (
          <div className="completed-courses">
            <h1>Completed Courses</h1>
          </div>
        )}
      </div>

      <style>{`
        .attendance-page {
          display: flex;
          height: 100vh;
          overflow: hidden;
        }

        .attendance-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 16px;
          overflow: hidden;
        }

        .dashboard-grid-8x7 {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          grid-template-rows: repeat(8, 1fr);
          gap: 8px;
          height: 100%;
          overflow: hidden;
        }

        .in-time-wrapper {
          grid-column: 1 / 1;
          grid-row: 1 / 2;
          min-height: 0;
        }

        .work-time-wrapper {
          grid-column: 1 / 2;
          grid-row: 3 / 2;
          min-height: 0;
        }

        .out-time-wrapper {
          grid-column: 1 / 2;
          grid-row: 4 / 3;
          min-height: 0;
        }

        .break-time-wrapper {
          grid-column: 1 / 2;
          grid-row: 5 / 4;
          min-height: 0;
        }

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

        .calendar-wrapper {
          grid-column: 5 / 8;
          grid-row: 1/ 6;
          min-height: 0;
          overflow: hidden;
        }

        .progress-card-wrapper {
          grid-column: 1 / 5;
          grid-row: 5/ 9;
          min-height: 0;
          overflow: hidden;
        }

        .attendance-card-wrapper {
          grid-column: 5 / 8;
          grid-row: 5/ 9;
          min-height: 0;
          overflow: hidden;
        }

        .in-time-wrapper > *,
        .out-time-wrapper > *,
        .work-time-wrapper > *,
        .break-time-wrapper > * {
          height: 100%;
          font-size: 0.875rem;
          padding: 8px;
        }

        .calendar-wrapper > * {
          height: 100%;
          overflow: hidden;
          transform: scale(0.75);
          transform-origin: top left;
          width: 133.33%;
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

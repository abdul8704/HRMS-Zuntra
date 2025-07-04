import React from "react";

export const ReminderCard = () => {
  return (
    <>
      <div className="reminder-card">
        <div className="reminder-header">
          <span className="reminder-title">Reminder</span>
          <span className="reminder-icon">❕</span>
          <span className="add-icon">➕</span>
        </div>

        <div className="reminder-body">
          <ul>
            <li>Today is payroll day, must have to give pay to employee’s 1</li>
            <li>Today is payroll day, must have to give pay to employee’s 2</li>
            <li>Today is payroll day, must have to give pay to employee’s 3</li>
            <li>Today is payroll day, must have to give pay to employee’s 4</li>
          </ul>
        </div>
      </div>

      <style>{`
        .reminder-card {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .reminder-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: bold;
          font-size: 1.1rem;
          margin-bottom: 0.5rem;
        }

        .reminder-title {
          font-size: 1.2rem;
        }

        .reminder-icon {
          margin-left: 0.3rem;
        }

        .add-icon {
          cursor: pointer;
          font-size: 1.2rem;
        }

        .reminder-body {
          overflow-y: auto;
          flex: 1;
        }

        .reminder-body ul {
          list-style-type: disc;
          padding-left: 1rem;
          margin: 0;
        }

        .reminder-body li {
          font-size: 0.95rem;
          color: #555;
          margin-bottom: 0.5rem;
        }

        /* Dark Grey Scrollbar Styling */
        .reminder-body::-webkit-scrollbar {
          width: 6px;
        }

        .reminder-body::-webkit-scrollbar-track {
          background: transparent;
        }

        .reminder-body::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
};

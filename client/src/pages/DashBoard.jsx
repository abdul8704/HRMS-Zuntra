import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { ProjectDeadline } from "../components/projectManagement/ProjectDeadline";
import { UserGreetings } from "../components/projectManagement/UserGreetings";
import { TimeCard } from "../components/attendance/TimeCard";
import { jwtDecode } from 'jwt-decode';
import { Remainder } from '../components/Remainder';

export const DashBoard = () => {
  const token = localStorage.getItem('accessToken');
  const userDetails = jwtDecode(token);
  const [showReminderForm, setShowReminderForm] = useState(false);
  const [reminderText, setReminderText] = useState('');
  const [reminderDate, setReminderDate] = useState('');

  const toggleReminderForm = () => {
    setReminderText('');
    setReminderDate('');
    setShowReminderForm(prev => !prev);
  };

  return (
    <>
      <div className="website-container">
        <Sidebar />
        <div className="website-module">
          <div className='dash-grid'>
            <div className='greetings'>
              <UserGreetings name={userDetails.username} profileImageURL={userDetails.profilePicture} />
            </div>
            <div className='intime'>
              <TimeCard state="in" time={"9:20"} />
            </div>
            <div className='worktime'>
              <TimeCard state="work" time={"9:20"} />
            </div>
            <div className='outtime'>
              <TimeCard state="out" time={"9:20"} />
            </div>
            <div className='breaktime'>
              <TimeCard state="break" time={"9:20"} />
            </div>
            <div className='remainder'>
              <Remainder onAddReminder={toggleReminderForm} />
              {showReminderForm && (
                <div className="remainder-popup-overlay">
                  <div className="remainder-popup-container">
                    <h2 className="remainder-popup-title">Add New Reminder</h2>

                    <input
                      type="text"
                      placeholder="Reminder"
                      value={reminderText}
                      onChange={(e) => setReminderText(e.target.value)}
                      className="remainder-popup-input"
                    />

                    <input
                      type="date"
                      value={reminderDate}
                      onChange={(e) => setReminderDate(e.target.value)}
                      className="remainder-popup-input"
                    />

                    <div className="remainder-popup-actions">
                      <button className="remainder-popup-btn add" >Add</button>
                      <button className="remainder-popup-btn cancel" onClick={() => setShowReminderForm(false)}>Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className='workbreak'>Work Break Composition</div>
            <div className='deadline'>
              <ProjectDeadline />
            </div>
            <div className='notification'>Notification</div>
            <div className='leave'>Employee on Leave</div>
          </div>
        </div>
      </div>

      <style>
        {`
          .dash-grid {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            grid-template-rows: repeat(9, 1fr);
            place-content: center;
            gap: 1rem;
            width: 100%;
            height: 100%;
          }
          .greetings {
            grid-column: 1/5;
            grid-row: 1/2;
            border-radius: 20px;
          }
          .intime {
            grid-column: 1/3;
            grid-row: 2/3;
            background-color: #C1E8BD;
            border-radius: 20px;
          }
          .outtime {
            grid-column: 1/3;
            grid-row: 3/4;
            background-color: #E1BEC5;
            border-radius: 20px;
          }
          .worktime {
            grid-column: 3/5;
            grid-row: 2/3;
            background-color: #C3E4EE;
            border-radius: 20px;
          }
          .breaktime {
            grid-column: 3/5;
            grid-row: 3/4;
            background-color: #DECEB9;
            border-radius: 20px;
          }
          .remainder {
            grid-column: 1/6;
            grid-row: 4/7;
            background-color: #BFBFF7;
            border-radius: 20px;
          }
          .workbreak {
            grid-column: 1/4;
            grid-row: 7/10;
            background-color: #DDB3DD;
            border-radius: 20px;
          }
          .deadline {
            grid-column: 5/10;
            grid-row: 1/4;
            background-color: #F2C3B9;
            border-radius: 20px;
          }
          .notification {
            grid-column: 6/10;
            grid-row: 4/7;
            background-color: #F6E0BF;
            border-radius: 20px;
          }
          .leave {
            grid-column: 4/10;
            grid-row: 7/10;
            background-color: #ADC0DA;
            border-radius: 20px;
          }
          .greetings,
          .workbreak,
          .deadline,
          .notification,
          .leave {
            padding: 1rem;
          }
                    .remainder-popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 999;
        }

        .remainder-popup-container {
          background: #ffffff;
          padding: 2rem;
          border-radius: 12px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .remainder-popup-title {
          margin: 0;
          font-size: 1.5rem;
          font-weight: 600;
          color: #1f2937;
        }

        .remainder-popup-input {
          padding: 0.5rem 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
        }

        .remainder-popup-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.5rem;
        }

        .remainder-popup-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .remainder-popup-btn.add {
          background-color: #3b82f6;
          color: white;
        }

        .remainder-popup-btn.add:hover {
          background-color: #2563eb;
        }

        .remainder-popup-btn.cancel {
          background-color: #e5e7eb;
          color: #111827;
        }

        .remainder-popup-btn.cancel:hover {
          background-color: #d1d5db;
        }
        `}
      </style>
    </>
  );
};
import React from 'react';
import { Sidebar } from "../components/Sidebar";
import { ProjectDeadline } from "../components/projectManagement/ProjectDeadline";
import { UserGreetings } from "../components/projectManagement/UserGreetings";
import { TimeCard } from "../components/attendance/TimeCard";
import { jwtDecode } from 'jwt-decode';

export const DashBoard = () => {
  const token = localStorage.getItem('accessToken');
  const userDetails = jwtDecode(token);

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
            <div className='remainder'>Remainder</div>
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
          .remainder,
          .workbreak,
          .deadline,
          .notification,
          .leave {
            padding: 1rem;
          }
        `}
      </style>
    </>
  );
};

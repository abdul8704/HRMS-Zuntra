import React, { useEffect, useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { ProjectDeadline } from "../components/projectManagement/ProjectDeadline";
import { UserGreetings } from "../components/projectManagement/UserGreetings";
import { TimeCard } from "../components/projectManagement/TimeCard";
import { jwtDecode } from 'jwt-decode'
import api from "../api/axios";

export const DashBoard = () => {
  const [projectDate, setProjectdate] = useState(new Date());
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const token = localStorage.getItem('accessToken');
  const userDetails=jwtDecode(token);
  const formatDateDDMMYYYY = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}${month}${year}`;
  };

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const formatted = formatDateDDMMYYYY(projectDate);
        const res = await api.get(`/api/project/all/date/${formatted}`);
        if (res.data.success) {
          setProjects(Array.isArray(res.data.data) ? res.data.data : []);
        } else {
          setApiMessage(res.data.message || "Something went wrong.");
          setProjects([]);
        }
      } catch (error) {
        setApiMessage("Error fetching projects.");
        setProjects([]);
      }
      finally {
      setLoading(false);
    }
  };

  fetchTasks();
}, [projectDate]);
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
            <TimeCard icon="&#10145;" time="09:02" label="Today's in time" bgColor="#C1E8BD" />
          </div>
          <div className='worktime'>
            <TimeCard icon="&#128188;" time="07:28" label="Total work time" bgColor="#C3E4EE" />
          </div>
          <div className='outtime'>
            <TimeCard icon="&#11013;" time="18:02" label="Today's out time" bgColor="#E1BEC5" />
          </div>
          <div className='breaktime'>
            <TimeCard icon="&#9749;" time="01:32" label="Total break time" bgColor="#DECEB9" />
          </div>
          <div className='remainder'>Remainder</div>
          <div className='workbreak'>Work Break Composition</div>
          <div className='deadline'>
            <ProjectDeadline
              projects={projects}
              projectDate={projectDate}
              setProjectDate={setProjectdate}
            />
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
            border: 1rem;
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
          .intime,
          .outtime,
          .worktime,
          .breaktime,
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

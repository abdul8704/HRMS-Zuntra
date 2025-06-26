import React, { useState, useEffect } from 'react';
import { Sidebar } from "../components/Sidebar";
import { TaskCard } from '../components/projectManagement/TaskCard';
import { TaskNavbar } from '../components/projectManagement/TaskNavbar';
import { ProjectPopup } from '../components/projectManagement/ProjectPopup';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export const HrProjectDetails = () => {
  const { navId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const projectId = "685be94f58890382fc68b610"; 

  useEffect(() => {
    const fetchTasks = async () => {
      if (navId && navId !== "overview") {
        setLoading(true);
        try {
          const res = await axios.get(
            `http://localhost:5000/api/task/${projectId}/${navId}`,
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFib29kb29vbCIsInVzZXJpZCI6IjY4NTQzNjI3OTM4YmRjNTFlMzYwYTkxOSIsInJvbGUiOiJ1bmFzc2lnbmVkIiwiaWF0IjoxNzUwODI0MjUwLCJleHAiOjE3NTA5MTA2NTB9.XVFJUxW5ahwKNG3OOENb3Nznn6NTEWqK-ZQ7b9250nU", 
              },
            }
          );
          setTasks(res.data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
          setTasks([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTasks();
  }, [navId]);

  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />

        <div className="website-module flex-grow">
          <TaskNavbar />
          <div className="project-cards-container">
            {navId === "overview" && (
              <div
                style={{
                  padding: "3rem 5rem",
                  borderRadius: "1.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  textAlign: "center",
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                <style>
                  {`
                    @keyframes pulse {
                      0%, 100% {
                        text-shadow: 0 0 10px #BBD3CC, 0 0 20px #BBD3CC;
                      }
                      50% {
                        text-shadow: 0 0 20px #BBD3CC, 0 0 40px #BBD3CC;
                      }
                    }
                  `}
                </style>

                <h1
                  style={{
                    fontSize: "5rem",
                    fontWeight: "700",
                    color: "rgb(153, 153, 153) ",
                    textShadow: "0 0 10px #BBD3CC, 0 0 20px #BBD3CC",
                    animation: "pulse 2s infinite ease-in-out",
                    margin: 0,
                  }}
                >
                  🚀 Under Development, Coming Soon
                </h1>
              </div>
            )}

            {!loading && navId !== "overview" && tasks.map((task, i) => (
              <TaskCard key={i} taskStatus={navId} taskData={task} />
            ))}

            {loading && <p>Loading tasks...</p>}
          </div>
        </div>
      </div>

      <ProjectPopup />

      <style>{`
        .project-cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          align-items: center;
          margin-top: 1.5rem;
          max-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Sidebar } from "../components/Sidebar";
import { TaskCard } from './project/components/TaskCard';
import { TaskNavbar } from './project/components/TaskNavbar';
import { ProjectPopup } from './project/components/ProjectPopup';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const HrProjectDetails = () => {
  const { navId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const projectId = "685be94f58890382fc68b610";

  useEffect(() => {
    const validTabs = ["overview", "todo", "inprogress", "review", "completed"];
    if (!validTabs.includes(navId)) {
      navigate("/404");
      return;
    }

    if (navId === "overview") return;

    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/task/${projectId}/${navId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphaSBBdGl0aHlhIEEiLCJ1c2VyaWQiOiI2ODVjYzYwMzE5NWEyOGVmNTAyMGU1MjUiLCJyb2xlIjoidW5hc3NpZ25lZCIsImlhdCI6MTc1MDkxNTE0NiwiZXhwIjoxNzUxMDAxNTQ2fQ.m2O3qAfk7a4hq9eWDGmeAbgY-5-DUjOf7TiQUndDo2g",
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
    };

    fetchTasks();
  }, [navId, navigate]);
  const aadhi={
    title:"medical survey",
    description: "Conduct a survey on 200 people from different families and generate a report on blood sugar levels in adults",
    name: "Ezhil",
    role: "researcher",
    timeLeft: "36 hours"
  }

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
                    color: "rgb(153, 153, 153)",
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
              <TaskCard key={i} taskData={aadhi} taskStatus={navId} isHR={true} cardColor={"  #cceec7"} />
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

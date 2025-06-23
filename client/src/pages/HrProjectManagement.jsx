import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { ProjectCard } from '../components/projectManagement/ProjectCard';
import { ProjectNavbar } from '../components/projectManagement/ProjectNavbar';
import { TaskCard } from '../components/projectManagement/TaskCard';
import { TaskNavbar } from '../components/projectManagement/TaskNavbar';
import { ProjectPopup } from '../components/projectManagement/ProjectPopup';
import { TaskcardReview } from '../components/projectManagement/TaskcardReview';
import { useParams } from 'react-router-dom';

export const HrProjectManagement = () => {
  const [active, setActive] = useState(1);
  const { navId } = useParams();
  console.log(navId)

  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />

        <div className="website-module flex-grow">
          {active === 0 && <ProjectNavbar />}
          {active === 1 && <TaskNavbar />}

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
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#ffffff",
                    textShadow: "0 0 10px #BBD3CC, 0 0 20px #BBD3CC",
                    animation: "pulse 2s infinite ease-in-out",
                    margin: 0,
                  }}
                >
                  🚀 Coming Soon
                </h1>
              </div>
            )}

            {navId === "todo" && <ProjectCard />}
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

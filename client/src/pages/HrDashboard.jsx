import React from 'react';
import { Sidebar } from "../components/Sidebar";
import { useParams } from 'react-router-dom';
import { ProjectPopup } from "../components/projectManagement/ProjectPopup";

export const HrDashboard = () => {
  const { navId } = useParams();

  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />

        <div className="website-module flex-grow flex justify-center items-center">
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
            <style>{`
              @keyframes pulse {
                0%, 100% {
                  text-shadow: 0 0 10px #BBD3CC, 0 0 20px #BBD3CC;
                }
                50% {
                  text-shadow: 0 0 20px #BBD3CC, 0 0 40px #BBD3CC;
                }
              }
            `}</style>

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
              🚀 Coming Soon
            </h1>
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

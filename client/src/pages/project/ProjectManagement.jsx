import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectPopup } from "./components/ProjectPopup";

export const ProjectManagement = () => {
  const { navId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const dummyData = [
    {
      _id: "1",
      projectTitle: "AI Chatbot Development",
      teamName: "AI Wizards",
      projectDesc: "Developing a smart chatbot using NLP and GPT models.",
      teamLeader: "John Doe",
      teamLeaderRole: "Project Manager",
      teamLeaderProfile: "https://i.pravatar.cc/100?img=1",
      color: "#A3E4D7",
      startDate: "2025-07-01",
      deadline: "2025-09-30",
      clientName: "TechNova Inc.",
    },
    {
      _id: "2",
      projectTitle: "E-Commerce Revamp",
      teamName: "Pixel Creators",
      projectDesc: "Redesigning UI/UX for an online store.",
      teamLeader: "Jane Smith",
      teamLeaderRole: "Lead Designer",
      teamLeaderProfile: "https://i.pravatar.cc/100?img=2",
      color: "#FADBD8",
      startDate: "2025-06-15",
      deadline: "2025-08-15",
      clientName: "ShopMaster",
    },
  ];

  useEffect(() => {
    const validTabs = ["ongoing", "finished"];
    if (!validTabs.includes(navId)) {
      navigate("/404");
      return;
    }

    if (navId !== "overview") {
      setProjects(dummyData);
    }
  }, [navId, navigate]);

  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />
        <div className="website-module flex-grow">
          <Navbar type="projectManagement" />

          {navId === "completed" ? (
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
                🚀 Under Development, Coming Soon
              </h1>
            </div>
          ) : (
            <div className="project-cards-container">
              {projects.map((project, index) => (
                <ProjectCard
                  key={index}
                  projectData={{
                    _id: project._id,
                    title: project.projectTitle,
                    subtitle: project.teamName,
                    description: project.projectDesc,
                    user: {
                      name: project.teamLeader,
                      role: project.teamLeaderRole,
                      avatar: project.teamLeaderProfile,
                    },
                    color: project.color,
                    startDate: project.startDate,
                    deadline: project.deadline,
                    clientName: project.clientName,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ProjectPopup />

      <style>{`
        .project-cards-container {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          justify-content: center;
          align-items: flex-start;
          margin-top: 1.5rem;
          height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

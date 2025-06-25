import axios from "axios";
import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { ProjectCard } from "../components/projectManagement/ProjectCard";
import { ProjectNavbar } from "../components/projectManagement/ProjectNavbar";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectPopup } from "../components/projectManagement/ProjectPopup";
import { Loading } from "../components/Loading";

export const HrProjectManagement = () => {
  const { navId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiMessage, setApiMessage] = useState("");

  useEffect(() => {
    const validTabs = ["overview", "ongoing", "finished"];
    if (!validTabs.includes(navId)) {
      navigate("/404");
      return;
    }

    if (navId === "overview") return;

    setLoading(true);
    setApiMessage("");

    axios
      .get(`http://localhost:5000/api/project/all/${navId}`, {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFib29kb29vbCIsInVzZXJpZCI6IjY4NTQzNjI3OTM4YmRjNTFlMzYwYTkxOSIsInJvbGUiOiJ1bmFzc2lnbmVkIiwiaWF0IjoxNzUwODI0MjUwLCJleHAiOjE3NTA5MTA2NTB9.XVFJUxW5ahwKNG3OOENb3Nznn6NTEWqK-ZQ7b9250nU",
        },
      })
      .then((res) => {
        if (res.data.success) {
          setProjects(Array.isArray(res.data.data) ? res.data.data : []);
        } else {
          setApiMessage(res.data.message || "Something went wrong.");
          setProjects([]);
        }
      })
      .catch(() => {
        setApiMessage("Error fetching projects.");
        setProjects([]);
      })
      .finally(() => setLoading(false));
  }, [navId, navigate]);

  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />
        <div className="website-module flex-grow">
          <ProjectNavbar />

          {navId === "overview" ? (
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
              {loading ? (
                <Loading />
              ) : apiMessage ? (
                <p
                  style={{
                    fontSize: "1.25rem",
                    color: "#888",
                    marginTop: "2rem",
                  }}
                >
                  {apiMessage}
                </p>
              ) : (
                projects.map((project, index) => (
                  <ProjectCard
                    key={index}
                    projectData={{
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
                ))
              )}
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

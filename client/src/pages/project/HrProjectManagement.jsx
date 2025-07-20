import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// Sidebar, Navbar, and Loading
import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { Loading } from "../utils/Loading";

// Project-specific components
import { ProjectCard } from "./components/ProjectCard";
import { ProjectPopup } from "./components/ProjectPopup";

// Axios instance
import api from "../../api/axios";

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

    const fetchProjects = async () => {
      setLoading(true);
      setApiMessage("");

      try {
        const res = await api.get(`/api/project/all/${navId}`);
        if (res.data.success) {
          setProjects(Array.isArray(res.data.data) ? res.data.data : []);
        } else {
          setApiMessage(res.data.message || "Something went wrong.");
          setProjects([]);
        }
      } catch (error) {
        setApiMessage("Error fetching projects.");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

  }, [navId, navigate]);


  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />
        <div className="website-module flex-grow">
          <Navbar
            type="projectManagement"
            role="hr"
          />

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

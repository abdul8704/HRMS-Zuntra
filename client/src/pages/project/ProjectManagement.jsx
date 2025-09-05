import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Sidebar } from "../../components/Sidebar";
import { Navbar } from "../../components/Navbar";
import { ProjectCard } from "./components/ProjectCard";
import { ProjectPopup } from "./components/ProjectPopup";
import TeamCard from '../teams/TeamCard';

export const ProjectManagement = () => {
  const { navId } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([
    {
      teamName: "AI Wizards",
      teamDescription: "Developing a smart chatbot using NLP and GPT models for enhanced user interaction.",
      teamLeaderName: "John Doe",
      profileImage: "https://i.pravatar.cc/100?img=1",
      teamLeaderId: "john-123"
    },
    {
      teamName: "Pixel Creators", 
      teamDescription: "Redesigning UI/UX for an online store to improve user experience and conversion rates.",
      teamLeaderName: "Jane Smith",
      profileImage: "https://i.pravatar.cc/100?img=2",
      teamLeaderId: "jane-456"
    },
    {
      teamName: "Data Analytics Team",
      teamDescription: "Analyzing business data to provide insights and recommendations for strategic decisions.",
      teamLeaderName: "Mike Johnson",
      profileImage: "https://i.pravatar.cc/100?img=3",
      teamLeaderId: "mike-789"
    }
  ]);
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
    const validTabs = ["ongoing", "completed", "add", "teams"];
    if (!validTabs.includes(navId)) {
      navigate("/404");
      return;
    }

    if (navId !== "overview") {
      setProjects(dummyData);
    }
  }, [navId, navigate]);
  const handleImageUpdate = (teamLeaderId, newImageUrl) => {
    setTeams(prevTeams => 
      prevTeams.map(team => 
        team.teamLeaderId === teamLeaderId 
          ? { ...team, profileImage: newImageUrl }
          : team
      )
    );
    
    // Optional: Save to backend
    console.log(`Updated image for ${teamLeaderId}: ${newImageUrl}`);
  };

  const containerStyle = {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  };

  const contentStyle = {
    flex: 1,
    padding: '20px',
    marginLeft: '0',
    overflowX: 'auto'
  };

  const titleStyle = {
    color: '#2c3e50',
    marginBottom: '30px',
    fontSize: '32px',
    fontWeight: '600',
    paddingLeft: '10px'
  };

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    justifyContent: 'flex-start',
    paddingLeft: '10px'
  };

  return (
    <>
      <div className="flex w-screen h-screen">
        <Sidebar />
        <div className="flex gap-[1rem] flex-col flex-1 p-[1rem] h-screen">
          <Navbar type="projectManagement" />
          {navId === "teams" && (
<div style={contentStyle}>
        <h1 style={titleStyle}>Teams Dashboard</h1>
        <div style={gridStyle}>
          {teams.map((team, index) => (
            <TeamCard
              key={`team-${index}`}
              teamName={team.teamName}
              teamDescription={team.teamDescription}
              teamLeaderName={team.teamLeaderName}
              profileImage={team.profileImage}
              teamLeaderId={team.teamLeaderId}
              onImageUpdate={handleImageUpdate} // Pass the update handler
            />
          ))}
        </div>
      </div>

          )}
          {navId === "completed" && (
            <div className="relative flex-1 overflow-y-auto">
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
          {navId==="ongoing" && (
            <div className="relative flex-1 overflow-y-auto">
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
    </>
  );
};

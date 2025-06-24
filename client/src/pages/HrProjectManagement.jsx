import React from 'react';
import { Sidebar } from "../components/Sidebar";
import { ProjectCard } from '../components/projectManagement/ProjectCard';
import { ProjectNavbar } from '../components/projectManagement/ProjectNavbar';
import { Link, useParams } from 'react-router-dom';
import { ProjectPopup } from '../components/projectManagement/ProjectPopup';
import { TaskCard } from '../components/projectManagement/TaskCard';

export const HrProjectManagement = () => {
  const { navId } = useParams();

 const projects = [
  {
    title: "Project 1",
    subtitle: "Data Drifters",
    description: "Analyzing large datasets to uncover trends and patterns. Data is the new oil!",
    user: {
      name: "Abish DM",
      role: "Full Stack Developer",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
  },
  {
    title: "Project 2",
    subtitle: "Code Blazers",
    description: "Building resilient APIs for high-traffic platforms with Node.js and Express.",
    user: {
      name: "Elena Morris",
      role: "Backend Developer",
      avatar: "https://i.pravatar.cc/100?img=6",
    },
  },
  {
    title: "Project 3",
    subtitle: "UI Surge",
    description: "Creating user interfaces that are both beautiful and intuitive using React.",
    user: {
      name: "Ravi Kumar",
      role: "UI/UX Designer",
      avatar: "https://i.pravatar.cc/100?img=7",
    },
  },
  {
    title: "Project 4",
    subtitle: "Bug Busters",
    description: "Squashing bugs and improving test coverage across the codebase.",
    user: {
      name: "Sarah Lee",
      role: "QA Engineer",
      avatar: "https://i.pravatar.cc/100?img=8",
    },
  },
  {
    title: "Project 5",
    subtitle: "AI Innovators",
    description: "Designing ML models that learn and adapt with minimal supervision.",
    user: {
      name: "Vikram Patel",
      role: "ML Engineer",
      avatar: "https://i.pravatar.cc/100?img=9",
    },
  },
  {
    title: "Project 6",
    subtitle: "Cloud Surfers",
    description: "Migrating legacy systems to scalable cloud infrastructure using AWS.",
    user: {
      name: "Tina Ray",
      role: "Cloud Architect",
      avatar: "https://i.pravatar.cc/100?img=10",
    },
  },
  {
    title: "Project 7",
    subtitle: "Security Squad",
    description: "Implementing authentication, authorization, and encryption protocols.",
    user: {
      name: "Harsh Mehta",
      role: "Security Engineer",
      avatar: "https://i.pravatar.cc/100?img=11",
    },
  },
  {
    title: "Project 8",
    subtitle: "DevOps Ninjas",
    description: "CI/CD pipelines, monitoring, and automated deployments across environments.",
    user: {
      name: "Lily Thomas",
      role: "DevOps Engineer",
      avatar: "https://i.pravatar.cc/100?img=12",
    },
  },
  {
    title: "Project 9",
    subtitle: "Visioneers",
    description: "Working on computer vision projects to identify objects in real-time.",
    user: {
      name: "Ankit Sharma",
      role: "Computer Vision Specialist",
      avatar: "https://i.pravatar.cc/100?img=13",
    },
  },
  {
    title: "Project 10",
    subtitle: "VoiceVerse",
    description: "Building voice recognition engines for multilingual support.",
    user: {
      name: "Nisha Rao",
      role: "Speech Engineer",
      avatar: "https://i.pravatar.cc/100?img=14",
    },
  },
];

  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />
        <div className="website-module flex-grow">
          <ProjectNavbar />
<div className="project-cards-container">
  {projects.map((project, index) => (
    <Link to="/project/overview" key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
      <ProjectCard projectData={project} />
    </Link>
  ))}
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

import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { ProjectCard } from '../components/projectManagement/ProjectCard';
import { ProjectNavbar } from '../components/projectManagement/ProjectNavbar';
import { useParams } from 'react-router-dom';
import { ProjectPopup } from '../components/projectManagement/ProjectPopup';

export const HrProjectManagement = () => {
  const { navId } = useParams();
  return (
    <div className="relative">
      <div className="website-container flex">
        <Sidebar />
        <div className="website-module flex-grow">
          <ProjectNavbar />
          <div className="project-cards-container">
            <ProjectCard />
          </div>
        </div>
      </div>
      <ProjectPopup/>
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

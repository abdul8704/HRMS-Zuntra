import React, { useState } from 'react';
import { Sidebar } from "../components/Sidebar";
import { ProjectCard } from '../components/projectManagement/ProjectCard';
import { ProjectNavbar } from '../components/projectManagement/ProjectNavbar';
import { TaskCard } from '../components/projectManagement/TaskCard';
import { TaskNavbar } from '../components/projectManagement/TaskNavbar';
import {ProjectPopup} from '../components/projectManagement/ProjectPopup'; 
import {TaskcardReview} from '../components/projectManagement/TaskcardReview';

export const HrProjectManagement = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="relative">
     
      <div className="website-container flex">
        <Sidebar />

        <div className="website-module flex-grow">
       
          {active === 0 && <ProjectNavbar />}
          {active === 1 && <TaskNavbar />}

         
          <div className="project-cards-container">
            <ProjectCard />
            <TaskCard />
            <TaskCard />
            <TaskCard />
            <TaskcardReview />
          </div>
        </div>
      </div>

      <ProjectPopup />

      <style jsx>{`
        .project-cards-container {
          display: flex;
          flex-wrap: wrap;
          max-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
};

import React, { useState } from 'react'; 
import { Sidebar } from "../components/Sidebar"
import  { ProjectCard }  from '../components/projectManagement/ProjectCard'
import { ProjectNavbar } from '../components/projectManagement/ProjectNavbar'
import { TaskCard } from '../components/projectManagement/TaskCard'
import { TaskNavbar } from '../components/projectManagement/TaskNavbar'
export const HrProjectManagement = () => {
   const[active,setActive]=useState(0);
  return (
    <div>
    
    <div className="website-container">
      <Sidebar />

      
    <div className="website-module">
      {active === 0 && <ProjectNavbar/>}
      {active === 1 && <TaskNavbar/>}
        <div className="project-cards-container">
          <ProjectCard />
          <TaskCard />
          <TaskCard />
          <TaskCard />
        </div>
        <style jsx>{`
        .project-cards-container{
          display: flex;
          flex-wrap: wrap;
          max-height: 100%;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
      </div>
    </div>
  </div>
  )
}

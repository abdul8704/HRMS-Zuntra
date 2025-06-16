import React from 'react'
import { Sidebar } from "../components/Sidebar"
import { ProjectCard } from '../components/projectManagement/ProjectCard'
import { ProjectNavbar } from '../components/projectManagement/ProjectNavbar'
import { TaskCard } from '../components/projectManagement/TaskCard'
export const HrProjectManagement = () => {
  return (
    <div className="website-container">
      <Sidebar />
      <div className="website-module">
        <ProjectNavbar />
        <div className="project-cards-container">
          <ProjectCard />
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
  )
}

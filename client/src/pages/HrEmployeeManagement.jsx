import React from 'react'
import { Sidebar } from "../components/Sidebar"

import { EmpNavbar } from '../components/employeeManagement/EmpNavbar'
import { EmpCard } from '../components/employeeManagement/EmpCard'
export const HrEmployeeManagement = () => {
  return (
    <div className="website-container">
      <Sidebar />
      <div className="website-module">
        <EmpNavbar />
        <div className="project-cards-container">
          <EmpCard/>
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

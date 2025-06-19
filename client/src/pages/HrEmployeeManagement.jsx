import React from 'react';
import { Sidebar } from "../components/Sidebar";
import { EmpNavbar } from '../components/employeeManagement/EmpNavbar';
import { EmpCard } from '../components/employeeManagement/EmpCard';

export const HrEmployeeManagement = () => {
  return (
    <div className="website-container flex">
      <Sidebar />
      <div className="website-module flex-1">
        <EmpNavbar />
        <div className="project-cards-container flex flex-wrap max-h-full overflow-y-auto overflow-x-hidden gap-4 p-4">
          <EmpCard
            name="Jai Atithya A"
            email="jaiatithya@zuntra.com"
            phone="+91 1234567890"
            date="10-06-2025"
            image="https://randomuser.me/api/portraits/men/30.jpg"
            bgColor="bg-purple-200"
            STATUS= "0"
          />
        </div>
      </div>
    </div>
  );
};

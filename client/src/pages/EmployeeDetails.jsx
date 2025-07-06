import React from "react";
import SidebarDetails from "../components/SidebarDetails";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import AttendanceCard from "../components/attendance/AttendanceCard";
import ProgressCard from "../components/attendance/ProgressCard";
import { Navbar } from "../components/Navbar";
import { TimeCard } from "../components/dashboard/TimeCard";
import { CourseCard } from "../components/coursemanagement/CourseCard";
import { EmployeeDetailsAssignment } from "../components/employeeManagement/EmployeeDetailsAssignment";
import { useParams } from "react-router-dom";

export const EmployeeDetails = () => {
  const { navId } = useParams();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarDetails />

      <div className="flex flex-col flex-1 gap-[1rem] p-[1rem]">      
        <Navbar type="employeeDetails" showFilter={false}/>


        {navId === "attendance" && (
          <EmployeeDetailsAssignment />
        )}
        {navId === "project" && (
          <p>PROJECT</p>
        )}
        {navId === "courses" && (
          <p>Courses</p>
        )}


      </div>
    </div>
  );
};

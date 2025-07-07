import React from "react";
import SidebarDetails from "../components/SidebarDetails";
import AttendanceCalendar from "../components/attendance/AttendanceCalendar";
import AttendanceCard from "../components/attendance/AttendanceCard";
import ProgressCard from "../components/attendance/ProgressCard";
import { Navbar } from "../components/Navbar";
import { TimeCard } from "../components/dashboard/TimeCard";
import { CourseCard } from "../components/coursemanagement/CourseCard";
import { EmployeeDetailsAssignment } from "../components/employeeManagement/EmployeeDetailsAssignment";
import { EmpProfile } from "../components/employeeManagement/EmpProfile";
import { useParams } from "react-router-dom";

const roleProfiles = [
  {
    name: "Ananya Rao",
    role: "Manager",
    avatar: "https://randomuser.me/api/portraits/women/75.jpg",
    tl: true,
    color: "#DFF6FF",
  },
  {
    name: "Arjun Mehta",
    role: "Senior Developer",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    tl: false,
    color: "#FEE2E2",
  },
  {
    name: "Kavya Iyer",
    role: "UX Designer",
    avatar: "https://randomuser.me/api/portraits/women/41.jpg",
    tl: false,
    color: "#E9D5FF",
  },
];

export const EmployeeDetails = ({ type }) => {
  const { navId } = useParams();

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarDetails type={type} />

      <div className="flex flex-col flex-1 gap-[1rem] p-[1rem]">
        {type === "user" && (
          <>
            <Navbar type="employeeDetails" showFilter={false} />


            {navId === "attendance" && (
              <EmployeeDetailsAssignment />
            )}
            {navId === "project" && (
              <p>PROJECT</p>
            )}
            {navId === "courses" && (
              <p>Courses</p>
            )}
          </>
        )}

        {type === "role" && (
          <div>
            <div className="flex flex-col gap-4">
              {roleProfiles.map((profile, idx) => (
                <EmpProfile
                  key={idx}
                  name={profile.name}
                  role={profile.role}
                  avatar={profile.avatar}
                  tl={profile.tl}
                  color={profile.color}
                />
              ))}
            </div>
          </div>
        )}



      </div>
    </div>
  );
};

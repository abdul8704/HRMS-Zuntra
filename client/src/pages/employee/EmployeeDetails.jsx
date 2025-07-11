import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import SidebarDetails from "../../components/SidebarDetails";
import { Navbar } from "../../components/Navbar";
import { TimeCard } from "../../components/dashboard/TimeCard";
import { AttendanceCalendar } from "../attendance/components/AttendanceCalendar";
import { AttendanceCard } from "../attendance/components/AttendanceCard";
import ProgressCard from "../attendance/components/ProgressCard";
import { CourseCard } from "../../components/coursemanagement/CourseCard";
import { EmployeeDetailsAssignment } from "../../components/employeeManagement/EmployeeDetailsAssignment";
import { EmpProfile } from "../../components/employeeManagement/EmpProfile";


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

const fetchUsersOfRole = async (roleId) => {
  const response = await api.get(`api/employee/role/${roleId}`);
  return response.data.employees;
};

export const EmployeeDetails = ({ type }) => {
  console.log(type);
  const { roleId, navId } = useParams();
  console.log(roleId, navId);
  const [roleProfiles, setRolesProfiles] = useState([]);

  if (type === "role") {
    useEffect(() => {
      try {
        const fetchData = async () => {
          if (!roleId) {
            console.error("Role ID is not provided");
            return;
          }
          const data = await fetchUsersOfRole(roleId);
          setRolesProfiles(data);
        };
        fetchData();
      } catch (error) {
        console.log("Error fetching role profiles:", error);
      }
    }, [roleId]);
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <SidebarDetails type={type} />

      <div className="flex flex-col flex-1 gap-[1rem] p-[1rem]">
        {type === "user" && (
          <>
            <Navbar type="employeeDetails" showFilter={false} />

            {navId === "attendance" && (
              <>
                <EmployeeDetailsAssignment />
                {/* <AttendanceCard /> */}
              </>
            )}
            {navId === "project" && <p>PROJECT</p>}
            {navId === "courses" && <p>Courses</p>}
          </>
        )}

        {type === "role" && (
          <div>
            <div className="flex flex-col gap-4">
              {roleProfiles.map((profile, idx) => (
                <EmpProfile
                  key={idx}
                  name={profile.username}
                  role={profile.role.role}
                  avatar={profile.profilePicture}
                  tl={profile.role.role === "Team Leader"}
                  color={profile.role.color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

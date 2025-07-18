import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";

import SidebarDetails from "../../components/SidebarDetails";
import { Navbar } from "../../components/Navbar";
import { EmployeeDetailsAssignment } from "./components/EmployeeDetailsAssignment";
import { EmpProfile } from "./components/EmpProfile";
import { AssignCoursePopup } from "./components/AssignCoursePopup";
import { EmployeeCourseProgress } from "./components/EmployeeCourseProgress";


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
  const [showAssignCourse, setShowAssignCourse] = useState(false);

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
            {navId === "courses" && (
              <>
                <p>Courses</p>
                <div className="h-[9rem] w-full sm:w-[24rem]">
                  <EmployeeCourseProgress />
                </div>


                <button
                  className="fixed bottom-8 right-20 w-14 h-14 bg-[#BBD3CC] text-[#6c6c6c] rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 hover:bg-[#A6C4BA] transition-transform z-[1000]"
                  onClick={() => setShowAssignCourse(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="2rem" viewBox="0 -960 960 960" width="2rem" fill="#000000">
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                  </svg>
                </button>
                {showAssignCourse && (
                  <AssignCoursePopup
                    isOpen={showAssignCourse}
                    onClose={() => setShowAssignCourse(false)}
                    onAssign={(data) => {
                      console.log('Assigned:', data);
                    }}
                  />
                )}

              </>
            )}
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

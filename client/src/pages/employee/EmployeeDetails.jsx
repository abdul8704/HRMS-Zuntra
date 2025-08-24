import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { SidebarDetails } from "../utils/SidebarDetails";
import { Navbar } from "../../components/Navbar";
import { EmployeeDetailsAssignment } from "./components/EmployeeDetailsAssignment";
import { AssignCoursePopup } from "./components/AssignCoursePopup";
import { EmployeeCourseProgress } from "./components/EmployeeCourseProgress";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../utils/Loading";
import api from "../../api/axios";
import { BASE_URL } from '../../api/axios'

// Import EmployeeCard
import { EmployeeCard } from "../employee/components/EmployeeCard"; // adjust the path if needed

export const EmployeeDetails = ({ type }) => {
  const { user, loading } = useAuth();
  const { empId, navId, roleId } = useParams(); // ✅ roleId added here
  const [roleProfiles, setRolesProfiles] = useState([]);
  const [showAssignCourse, setShowAssignCourse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (type === "role") {
      const fetchRoleEmployees = async () => {
        setIsLoading(true);
        try {
          const res = await api.get(`/api/employee/role/${roleId}`);
          if (res.data.success) {
            setRolesProfiles(res.data.employees || []);
          }
        } catch (err) {
          console.error(
            "Error fetching employees by role:",
            err?.response?.data?.message || err.message
          );
        } finally {
          setIsLoading(false);
        }
      };
      if (!loading) {
        fetchRoleEmployees();
      }
    } else {
      const fetchEmployeeDetails = async () => {
        setIsLoading(true);
        try {
          const [empRes, courseRes] = await Promise.all([
            api.get(`/api/employee/${empId}`),
            api.get(`/api/course/enrolledCourses`),
          ]);
          if (empRes.data.success) {
            setRolesProfiles(empRes.data.employeeDetail || empRes.data.data);
          }
        } catch (err) {
          console.error(
            "Error fetching employee details:",
            err?.response?.data?.message || err.message
          );
        } finally {
          setIsLoading(false);
        }
      };

      if (!loading) {
        fetchEmployeeDetails();
      }
    }
  }, [type, loading, empId, roleId]);

  return (
    <div className="flex h-screen overflow-hidden">
      {loading || isLoading ? (
        <Loading />
      ) : (
        <>
          <SidebarDetails type={type} empId={empId} />

          <div className="flex flex-col flex-1 gap-[1rem] p-[1rem]">
            {type === "user" && (
              <>
                <Navbar type="employeeDetails" showFilter={false} />

                {navId === "attendance" && (
                  <EmployeeDetailsAssignment userid={empId} />
                )}

                {navId === "project" && <p>PROJECT</p>}

                {navId === "courses" && (
                  <>
                    <p>Courses</p>
                    <div className="h-[9rem] w-full sm:w-[24rem]">
                      <EmployeeCourseProgress type={"course"} />
                    </div>

                    <button
                      className="fixed bottom-8 right-20 w-14 h-14 bg-[#BBD3CC] text-[#6c6c6c] rounded-full flex items-center justify-center text-2xl font-bold cursor-pointer hover:scale-110 hover:bg-[#A6C4BA] transition-transform z-[1000]"
                      onClick={() => setShowAssignCourse(true)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="2rem"
                        viewBox="0 -960 960 960"
                        width="2rem"
                        fill="#000000"
                      >
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                      </svg>
                    </button>

                    {showAssignCourse && (
                      <AssignCoursePopup
                        isOpen={showAssignCourse}
                        onClose={() => setShowAssignCourse(false)}
                        onAssign={(data) => {
                          console.log("Assigned:", data);
                        }}
                      />
                    )}
                  </>
                )}
              </>
            )}

            {type === "role" && (
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {roleProfiles.map((profile) => (
    <EmployeeCard
      key={profile._id}
      name={profile.username}
      email={profile.email || "---"}
      phone={profile.phoneNumber || "---"}
      role={profile.role.role}
      image={`${BASE_URL}/uploads/profilePictures/${profile._id}.png`}
      option={1}
      bgColor={profile.role.color}
    />
  ))}
</div>

            )}
          </div>
        </>
      )}
    </div>
  );
};

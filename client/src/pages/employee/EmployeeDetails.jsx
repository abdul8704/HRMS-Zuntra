import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { SidebarDetails } from "../utils/SidebarDetails";
import { Navbar } from "../../components/Navbar";
import { EmployeeDetailsAssignment } from "./components/EmployeeDetailsAssignment";
import { AssignCoursePopup } from "./components/AssignCoursePopup";
import { EmployeeCourseProgress } from "./components/EmployeeCourseProgress";
import { useAuth } from "../../context/AuthContext";
import { Loading } from "../utils/Loading";
import api, { BASE_URL } from "../../api/axios";
import { EmployeeCard } from "../employee/components/EmployeeCard";

export const EmployeeDetails = ({ type }) => {
  const { user, loading } = useAuth();
  const { empId, navId, roleId } = useParams();
  const [roleProfiles, setRolesProfiles] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]); // ✅ state for courses
  const [showAssignCourse, setShowAssignCourse] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      if (!loading) fetchRoleEmployees();
    } else {
      const fetchEmployeeDetails = async () => {
        setIsLoading(true);
        try {
          const empRes = await api.get(`/api/employee/${empId}`);
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

      if (!loading) fetchEmployeeDetails();
    }
  }, [type, loading, empId, roleId]);

  // ✅ Fetch course progress when navId = courses
  useEffect(() => {
    const fetchCourseProgress = async () => {
      if (navId !== "courses" || !empId) return;
      setIsLoading(true);
      try {
        const res = await api.get(`/api/course/progress/${empId}`);
        if (res.data.success) {
          setCourseProgress(res.data.data || []);
        }
      } catch (err) {
        console.error(
          "Error fetching course progress:",
          err?.response?.data?.message || err.message
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!loading) fetchCourseProgress();
  }, [navId, empId, loading]);

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
                    <p className="text-lg font-semibold mb-2">Courses</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {courseProgress.length > 0 ? (
                        courseProgress.map((course) => (
                          <EmployeeCourseProgress
                            key={course.courseId}
                            data={course} // ✅ pass the full course data as prop
                          />
                        ))
                      ) : (
                        <p className="text-gray-500">No courses found.</p>
                      )}
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
              <>
                {roleProfiles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto">
                    {roleProfiles.map((profile) => (
                      <div
                        key={profile._id}
                        onClick={() =>
                          navigate(`/employee/${profile._id}/details/attendance`)
                        }
                        className="cursor-pointer"
                      >
                        <EmployeeCard
                          name={profile.username}
                          email={profile.email || "---"}
                          phone={profile.phoneNumber || "---"}
                          role={profile.role.role}
                          image={`${BASE_URL}/uploads/profilePictures/${profile._id}.png`}
                          option={1}
                          bgColor={profile.role.color}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <p className="text-sm md:text-base">
                      No employees found for this role.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

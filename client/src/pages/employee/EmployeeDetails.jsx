  import React, { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";

  import { SidebarDetails } from "../utils/SidebarDetails";
  import { Navbar } from "../../components/Navbar";
  import { EmployeeDetailsAssignment } from "./components/EmployeeDetailsAssignment";
  import { EmpProfile } from "./components/EmpProfile";
  import { AssignCoursePopup } from "./components/AssignCoursePopup";
  import { EmployeeCourseProgress } from "./components/EmployeeCourseProgress";
  import { useAuth } from "../../context/AuthContext";
  import { Loading } from "../utils/Loading";
  import api from "../../api/axios";

  export const EmployeeDetails = ({ type }) => {
    const { user, loading } = useAuth();
    const { empId, navId } = useParams();
    const [roleProfiles, setRolesProfiles] = useState([]);
    const [showAssignCourse, setShowAssignCourse] = useState(false);
    

    useEffect(() => {
      console.log(type)
      if (type === "role") {
        const dummyProfiles = [
          {
            username: "Alice Johnson",
            role: { role: "Team Leader", color: "#E57373" },
            profilePicture: "https://via.placeholder.com/150",
          },
          {
            username: "Bob Smith",
            role: { role: "Developer", color: "#64B5F6" },
            profilePicture: "https://via.placeholder.com/150",
          },
        ];
        setRolesProfiles(dummyProfiles);
      }
      else{
        const fetchEmployeeDetails = async () => {
        setIsLoading(true);
        try {
          const [empRes, courseRes] = await Promise.all([
            api.get(`/api/employee/${empId}`),
            api.get(`/api/course/enrolledCourses`),
          ]);
          ("Employee Details Response:", empRes.data);
          if (empRes.data.success) {
            setRolesProfiles(empRes.data.employeeDetail || empRes.data.data);
          }
          
        } catch (err) {
          console.error("Error fetching employee details:", err?.response?.data?.message || err.message);
        } finally {
          setIsLoading(false);
        }
      };

      if (!loading) {
        fetchEmployeeDetails();
      }
      }
    }, [type]);

    return (
      <div className="flex h-screen overflow-hidden">
        {(loading) ? (
          <Loading />
        ) : (
          <>
            <SidebarDetails
                type={type}
                empId={empId}
            />
            

            <div className="flex flex-col flex-1 gap-[1rem] p-[1rem]">
              {type === "user" && (
                <>
                  <Navbar type="employeeDetails" showFilter={false} />

                  {navId === "attendance" && (
                    <>
                      <EmployeeDetailsAssignment />
                    </>
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
              )}
            </div>
          </>
        )}
      </div>
    );
  };

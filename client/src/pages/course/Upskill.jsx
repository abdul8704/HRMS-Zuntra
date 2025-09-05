import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { CourseCard } from './components/CourseCard';
import api from '../../api/axios';
import { CompletedCard } from './components/CompletedCard';

export const Upskill = () => {
  const { navId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    if (navId === "create" || navId === "add") return;

    const fetchCourses = async () => {
      setLoading(true);
      setApiMessage("");

      try {
        let res;

        if (navId === "all") {
          res = await api.get(`/api/course/available`);
          const courseList = Array.isArray(res.data?.data) ? res.data.data : [];
          if (courseList.length === 0) {
            setApiMessage("No courses found.");
          }
          setCourses(courseList);
        } else if (["assigned", "enrolled", "completed"].includes(navId)) {
          const typeMap = {
            enrolled: "enrolledCourses",
            assigned: "assignedCourses",
            completed: "completedCourses",
          };

          res = await api.get(`/api/course/${typeMap[navId]}/`);
          const courseList = Array.isArray(res.data?.data) ? res.data.data : [];

          if (courseList.length === 0) {
            setCourses([]);
            setApiMessage("No courses found.");
          } else {
            setCourses(courseList);
          }
        }
      } catch (error) {
        console.error(error);
        setCourses([]);
        setApiMessage("Error fetching courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navId, navigate]);

  return (
    <>
      <div className="flex w-screen h-screen">
        <Sidebar />
        <div className="flex gap-4 flex-col flex-1 p-4 h-screen overflow-auto">
          <Navbar type="upskill" />

          {navId === 'all' && (
            <div className="flex flex-col gap-2 mt-4 flex-1 overflow-hidden">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-semibold">Available Courses</h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <p className="text-center p-4">Loading...</p>
                ) : apiMessage ? (
                  <p className="text-center text-red-500 p-4">{apiMessage}</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                    {courses.map((course, index) => (
                      <div
                        key={index}
                        className="cursor-pointer h-full flex"
                        onClick={() => navigate(`/course/${course._id}/intro`)}
                      >
                        <CourseCard {...course} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {(navId === 'assigned' || navId === 'enrolled') && (
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : apiMessage ? (
                <p className="text-center text-red-500">{apiMessage}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/course/${course._id}/intro`)}
                      className="cursor-pointer h-full flex"
                    >
                      <CourseCard {...course} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {(navId === 'completed') && (
            <div className="flex-1 overflow-y-auto">
              {loading ? (
                <p className="text-center">Loading...</p>
              ) : apiMessage ? (
                <p className="text-center text-red-500">{apiMessage}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4 p-4">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      onClick={() => navigate(`/course/${course._id}/intro`)}
                      className="cursor-pointer h-full flex"
                    >
                      <CompletedCard {...course} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
};
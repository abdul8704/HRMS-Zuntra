import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';
import { CourseCard } from './components/CourseCard';
import api from '../../api/axios';

export const Upskill = () => {
  const { navId } = useParams();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [showArrows, setShowArrows] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const checkOverflow = () => {
      setShowArrows(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();
    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);
    return () => resizeObserver.disconnect();
  }, [courses, navId]);

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

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 540;
    const isAtStart = el.scrollLeft <= 0;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    if (direction === 'left') {
      el.scrollTo({ left: isAtStart ? el.scrollWidth : el.scrollLeft - scrollAmount, behavior: 'smooth' });
    } else {
      el.scrollTo({ left: isAtEnd ? 0 : el.scrollLeft + scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="flex w-screen h-screen">
        <Sidebar />
        <div className="flex gap-4 flex-col flex-1 p-4 h-screen overflow-auto">
          <Navbar type="upskill" />

          {navId === 'all' && (
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-semibold">Available Courses</h2>
              </div>

              <div className="flex items-center gap-4">
                {showArrows && (
                  <button
                    onClick={() => scroll('left')}
                    className="bg-gradient-to-r from-black/10 to-white h-full px-3 py-2 rounded-l-lg"
                  >
                    &#8592;
                  </button>
                )}

                <div
                  ref={scrollRef}
                  className="flex gap-4 overflow-x-auto pb-2 no-scrollbar"
                >
                  {loading ? (
                    <p className="p-4">Loading...</p>
                  ) : apiMessage ? (
                    <p className="p-4 text-red-500">{apiMessage}</p>
                  ) : (
                    courses.map((course, index) => (
                      <div
                        key={index}
                        className="w-64 flex-shrink-0 cursor-pointer"
                        onClick={() => navigate(`/course/${course._id}/intro`)}
                      >
                        <CourseCard {...course} />
                      </div>
                    ))
                  )}
                </div>

                {showArrows && (
                  <button
                    onClick={() => scroll('right')}
                    className="bg-gradient-to-l from-black/10 to-white h-full px-3 py-2 rounded-r-lg"
                  >
                    &#8594;
                  </button>
                )}
              </div>
            </div>
          )}

          {(navId === 'assigned' || navId === 'enrolled' || navId === 'completed') && (
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
        </div>
      </div>

      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </>
  )
};

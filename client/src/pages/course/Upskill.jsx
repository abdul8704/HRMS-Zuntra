import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


import { Sidebar } from '../../components/Sidebar';
import { Navbar } from '../../components/Navbar';

import api from '../../api/axios';


const dummyCourses = [
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'React for Beginners',
    courseInstructor: 'John Doe',
    deadline: 10,
    deadlineUnits: 'days',
    rating: 5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Advanced JavaScript',
    courseInstructor: 'Jane Smith',
    deadline: 2,
    deadlineUnits: 'weeks',
    rating: 4.5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'UI/UX Fundamentals',
    courseInstructor: 'Emily Clark',
    deadline: 5,
    deadlineUnits: 'days',
    rating: 5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Node.js Mastery',
    courseInstructor: 'Mike Jordan',
    deadline: 7,
    deadlineUnits: 'days',
    rating: 4.8,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Database Design',
    courseInstructor: 'Laura Hill',
    deadline: 3,
    deadlineUnits: 'weeks',
    rating: 4.9,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'React for Beginners',
    courseInstructor: 'John Doe',
    deadline: 10,
    deadlineUnits: 'days',
    rating: 5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Advanced JavaScript',
    courseInstructor: 'Jane Smith',
    deadline: 2,
    deadlineUnits: 'weeks',
    rating: 4.5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'UI/UX Fundamentals',
    courseInstructor: 'Emily Clark',
    deadline: 5,
    deadlineUnits: 'days',
    rating: 5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Node.js Mastery',
    courseInstructor: 'Mike Jordan',
    deadline: 7,
    deadlineUnits: 'days',
    rating: 4.8,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Database Design',
    courseInstructor: 'Laura Hill',
    deadline: 3,
    deadlineUnits: 'weeks',
    rating: 4.9,
  },
    {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Database Design',
    courseInstructor: 'Laura Hill',
    deadline: 3,
    deadlineUnits: 'weeks',
    rating: 4.9,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'React for Beginners',
    courseInstructor: 'John Doe',
    deadline: 10,
    deadlineUnits: 'days',
    rating: 5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Advanced JavaScript',
    courseInstructor: 'Jane Smith',
    deadline: 2,
    deadlineUnits: 'weeks',
    rating: 4.5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'UI/UX Fundamentals',
    courseInstructor: 'Emily Clark',
    deadline: 5,
    deadlineUnits: 'days',
    rating: 5,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Node.js Mastery',
    courseInstructor: 'Mike Jordan',
    deadline: 7,
    deadlineUnits: 'days',
    rating: 4.8,
  },
  {
    courseImage: 'https://via.placeholder.com/150',
    courseName: 'Database Design',
    courseInstructor: 'Laura Hill',
    deadline: 3,
    deadlineUnits: 'weeks',
    rating: 4.9,
  },
];

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
      if (el.scrollWidth > el.clientWidth) {
        setShowArrows(true);
      } else {
        setShowArrows(false);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [courses, navId]);

  useEffect(() => {
    if (navId === 'all') return;

    const fetchCourses = async () => {
      setLoading(true);
      setApiMessage('');

      try {
        const res = await api.get(`/api/course/`);
        if (res.data.success) {
          setCourses(Array.isArray(res.data.data) ? res.data.data : []);
        } else {
          setApiMessage(res.data.message || 'Something went wrong.');
          setCourses([]);
        }
      } catch (error) {
        setApiMessage('Error fetching courses.');
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navId]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const scrollAmount = 540;
    const isAtStart = el.scrollLeft <= 0;
    const isAtEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;

    if (direction === 'left') {
      if (isAtStart) {
        el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    } else {
      if (isAtEnd) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
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
                <h2 className="text-xl font-semibold">Recommended Courses</h2>
                <span className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">
                  View all
                </span>
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

                  {(navId === 'all' ? dummyCourses : courses).map((course, index) => (
                    <div key={index} className="w-64 flex-shrink-0">
                      <CourseCard {...course} />
                    </div>
                  ))}
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
        </div>
      </div>

      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {4
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </>
  );
};

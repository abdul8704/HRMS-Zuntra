import React, { useState } from 'react';
import { CourseCard } from '../../course/components/CourseCard.jsx';

// Updated Main AssignCoursePopup Component
export const AssignCoursePopup = ({ isOpen = false, onClose = () => {}, onAssign = () => {} }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedCourses, setAssignedCourses] = useState([]); // Now stores full course objects
  const [showCourseSelection, setShowCourseSelection] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Sample course data - replace with your actual data
  const courses = [
    {
      id: 1,
      courseImage: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
      courseName: 'React Fundamentals',
      courseInstructor: 'John Doe',
      deadline: 8,
      deadlineUnits: 'weeks',
      rating: 5
    },
    {
      id: 2,
      courseImage: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
      courseName: 'Advanced Node.js',
      courseInstructor: 'Jane Smith',
      deadline: 12,
      deadlineUnits: 'weeks',
      rating: 5
    },
    {
      id: 3,
      courseImage: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
      courseName: 'JavaScript Mastery',
      courseInstructor: 'Mike Johnson',
      deadline: 10,
      deadlineUnits: 'weeks',
      rating: 4
    },
    {
      id: 4,
      courseImage: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
      courseName: 'Python for Beginners',
      courseInstructor: 'Sarah Wilson',
      deadline: 0,
      deadlineUnits: '',
      rating: 5
    },
    {
      id: 5,
      courseImage: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
      courseName: 'UI/UX Design Fundamentals',
      courseInstructor: 'Alex Brown',
      deadline: 6,
      deadlineUnits: 'weeks',
      rating: 4
    },
    {
      id: 6,
      courseImage: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
      courseName: 'Database Design',
      courseInstructor: 'Emma Davis',
      deadline: 8,
      deadlineUnits: 'weeks',
      rating: 5
    }
  ];

  // Filter out already assigned courses from the available courses
  const filteredCourses = courses.filter(course => {
    const isAlreadyAssigned = assignedCourses.some(assigned => assigned.id === course.id);
    const matchesSearch = course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.courseInstructor.toLowerCase().includes(searchTerm.toLowerCase());
    return !isAlreadyAssigned && matchesSearch;
  });

  const handleAddCourse = () => {
    if (!selectedCourse.trim()) {
      // If no course is typed, open the course selection popup
      setShowCourseSelection(true);
      return;
    }
    // If course is typed, create a custom course object and add it
    const customCourse = {
      id: `custom-${Date.now()}`,
      courseName: selectedCourse,
      courseInstructor: 'Custom',
      courseImage: 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png',
      deadline: 0,
      deadlineUnits: '',
      rating: 0
    };
    setAssignedCourses(prev => [...prev, customCourse]);
    setSelectedCourse('');
  };

  const handleCourseSelect = (course) => {
    // Add the full course object to assigned courses
    setAssignedCourses(prev => [...prev, course]);
    setSelectedCourse('');
  };

  const handleAssign = () => {
    if (assignedCourses.length === 0 || !deadline) return;
    onAssign({ courses: assignedCourses, deadline });
    onClose();
  };

  const handleRemoveCourse = (courseId) => {
    setAssignedCourses(prev => prev.filter(course => course.id !== courseId));
  };

  const handleCloseAll = () => {
    setShowCourseSelection(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        {/* Container for both popups with dynamic positioning */}
        <div 
  className="flex gap-6 max-w-7xl w-full px-4 h-full items-center justify-center transition-all duration-500 ease-in-out"
>

          {/* Assign Course Popup - Animated positioning */}
          <div 
            className={`bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative flex-shrink-0 transition-all duration-500 ease-in-out ${
              showCourseSelection ? 'translate-x-0' : 'translate-x-0'
            }`}
          >
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-6">Assign Course</h2>

            <div className="flex gap-3 mb-4">
              <div className="flex items-center bg-gray-100 rounded-md flex-1 px-3 py-2">
                <input
                  type="text"
                  placeholder="Select Course"
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-gray-700 placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={handleAddCourse}
                  className="ml-2 rounded-full bg-[#DDEAE5] hover:bg-[#c3dad3] p-1 transition-all"
                  title="Add course or browse courses"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 24 24" width="16" fill="currentColor">
                    <path d="M12 5v14m7-7H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <div className="bg-gray-100 rounded-md px-3 py-2 flex items-center w-[120px]">
                <input
                  type="date"
                  placeholder="dd-mm-yy"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="bg-transparent outline-none w-full text-gray-700 placeholder-gray-500"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 0 0 2-2V7H3v10a2 2 0 0 0 2 2Z"/>
                </svg>
              </div>
            </div>

            {/* Enhanced Courses Display Area */}
            <div className="bg-gray-100 rounded-md p-4 h-[300px] overflow-y-auto mb-6">
              {assignedCourses.length === 0 ? (
                <p className="text-gray-400 text-center py-8">No courses assigned yet...</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {assignedCourses.map((course) => (
                    <div key={course.id} className="relative">
                      {/* Remove button */}
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        className="absolute top-2 right-2 z-10 text-red-500 hover:text-red-700 bg-white rounded-full p-1 shadow-sm hover:shadow-md transition-all"
                        title="Remove course"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                      
                      {/* Full CourseCard */}
                      <div className="h-full">
                        <CourseCard
                          courseImage={course.courseImage}
                          courseName={course.courseName}
                          courseInstructor={course.courseInstructor}
                          deadline={course.deadline}
                          deadlineUnits={course.deadlineUnits}
                          rating={course.rating}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-center gap-6">
              <button
                onClick={handleCloseAll}
                className="border border-[#BBD3CC] text-[#2d423b] px-5 py-2 rounded-full text-sm hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={assignedCourses.length === 0 || !deadline}
                className="bg-[#BBD3CC] text-[#2d423b] px-5 py-2 rounded-full text-sm hover:bg-[#A6C4BA] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Assign
              </button>
            </div>
          </div>

          {/* Course Selection Popup - Right Side with fade-in animation */}
          {showCourseSelection && (
            <div 
              className={`bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col relative transition-all duration-500 ease-in-out ${
                showCourseSelection ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                animation: showCourseSelection ? 'slideInFromRight 0.5s ease-out' : 'none'
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Add Courses</h2>
                <button
                  onClick={() => setShowCourseSelection(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Search Bar */}
              <div className="p-6 pb-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-10 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-gray-700"
                  />
                  <svg
                    className="absolute right-3 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Course Cards Grid */}
              <div className="flex-1 px-6 pb-6 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredCourses.map((course) => (
                    <div
                      key={course.id}
                      className="cursor-pointer transform hover:scale-[1.02] transition-all duration-200 hover:shadow-lg rounded-xl"
                      onClick={() => handleCourseSelect(course)}
                    >
                      <div className="h-full">
                        <CourseCard
                          courseImage={course.courseImage}
                          courseName={course.courseName}
                          courseInstructor={course.courseInstructor}
                          deadline={course.deadline}
                          deadlineUnits={course.deadlineUnits}
                          rating={course.rating}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredCourses.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-2">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <p className="text-gray-500 text-lg">
                      {assignedCourses.length > 0 ? 'All available courses have been assigned!' : 'No courses found matching your search.'}
                    </p>
                    <p className="text-gray-400 text-sm mt-1">
                      {assignedCourses.length > 0 ? 'Remove assigned courses to see them here again.' : 'Try adjusting your search terms'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add CSS animation keyframes */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            transform: translateX(100px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};
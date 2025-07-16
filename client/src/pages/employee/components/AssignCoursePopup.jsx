import React, { useState } from 'react';

export const AssignCoursePopup = ({ isOpen = false, onClose = () => {}, onAssign = () => {} }) => {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [deadline, setDeadline] = useState('');
  const [assignedCourses, setAssignedCourses] = useState([]);

  const handleAddCourse = () => {
    if (!selectedCourse.trim()) return;
    setAssignedCourses(prev => [...prev, selectedCourse]);
    setSelectedCourse('');
  };

  const handleAssign = () => {
    if (assignedCourses.length === 0 || !deadline) return;
    onAssign({ courses: assignedCourses, deadline });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 relative">
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

        <div className="bg-gray-100 rounded-md px-3 py-2 min-h-[100px] text-gray-500 text-sm mb-6">
          {assignedCourses.length === 0 ? (
            <p className="text-gray-400">Courses...</p>
          ) : (
            <ul className="list-disc list-inside text-gray-700">
              {assignedCourses.map((course, index) => (
                <li key={index}>{course}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex justify-center gap-6">
          <button
            onClick={onClose}
            className="border border-[#BBD3CC] text-[#2d423b] px-5 py-2 rounded-full text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            className="bg-[#BBD3CC] text-[#2d423b] px-5 py-2 rounded-full text-sm hover:bg-[#A6C4BA]"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );
};

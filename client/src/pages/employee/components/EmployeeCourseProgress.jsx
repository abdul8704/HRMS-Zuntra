import React, { useState } from "react";

export function EmployeeCourseProgress() {
  const [viewType, setViewType] = useState("employee"); // "employee" or "course"

  // Sample data
  const employeeData = {
    name: "Jai Atithya A",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "jaiatithya@zuntra.com",
    phone: "+91 1234567890",
    role: "Embedded & IoT Developer",
    progress: 40
  };

  const courseData = {
    name: "Advanced React Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop&crop=center",
    instructor: "Dr. Sarah Johnson",
    role: "React Specialist",
    progress: 65
  };

  const currentData = viewType === "employee" ? employeeData : courseData;

  return (
    <div className="space-y-4">
      {/* Toggle Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewType("employee")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewType === "employee"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Employee View
        </button>
        <button
          onClick={() => setViewType("course")}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            viewType === "course"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Course View
        </button>
      </div>

      {/* Main Card */}
      <div className="flex items-center bg-[#eef8f8] p-4 rounded-xl w-[500px] shadow-md">
        {/* Profile/Course Image */}
        <img
          src={currentData.image}
          alt={viewType === "employee" ? "Profile" : "Course"}
          className="w-24 h-24 rounded-full object-cover mr-4"
        />

        {/* Info Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900">{currentData.name}</h2>

          {viewType === "employee" ? (
            <>
              {/* Email */}
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="12"
                  fill="none"
                  viewBox="0 0 15 12"
                  className="mr-2"
                >
                  <path
                    fill="#000"
                    fillOpacity=".5"
                    d="M1.5 11.243c-.413 0-.765-.135-1.059-.406A1.283 1.283 0 0 1 0 9.861V1.569C0 1.19.147.864.441.594.735.324 1.088.188 1.5.188h12c.412 0 .766.135 1.06.406.294.27.44.596.44.975v8.292c0 .38-.147.705-.44.976a1.508 1.508 0 0 1-1.06.406h-12Zm6-4.837 6-3.455V1.57l-6 3.455-6-3.455v1.382l6 3.455Z"
                  />
                </svg>
                {currentData.email}
              </div>

              {/* Phone */}
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="12"
                  fill="none"
                  viewBox="0 0 11 12"
                  className="mr-2"
                >
                  <path
                    fill="#000"
                    fillOpacity=".5"
                    d="M2.212 5.074A9.28 9.28 0 0 0 6.24 9.12l1.344-1.35a.605.605 0 0 1 .623-.148 6.94 6.94 0 0 0 2.182.35c.336 0 .611.277.611.615v2.143a.614.614 0 0 1-.611.614C4.65 11.344 0 6.67 0 .904 0 .564.275.288.611.288H2.75c.336 0 .611.276.611.614 0 .768.122 1.505.348 2.193a.619.619 0 0 1-.152.626L2.212 5.074Z"
                  />
                </svg>
                {currentData.phone}
              </div>
            </>
          ) : (
            <>
              {/* Instructor Name */}
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                  className="mr-2"
                >
                  <path
                    fill="#000"
                    fillOpacity=".5"
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM8 9a5 5 0 0 0-5 5v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a5 5 0 0 0-5-5Z"
                  />
                </svg>
                Instructor: {courseData.instructor}
              </div>

              {/* Course Duration or Additional Info */}
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  viewBox="0 0 16 16"
                  className="mr-2"
                >
                  <path
                    fill="#000"
                    fillOpacity=".5"
                    d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1ZM8 4a.5.5 0 0 1 .5.5v3h2a.5.5 0 0 1 0 1h-2.5a.5.5 0 0 1-.5-.5v-3.5A.5.5 0 0 1 8 4Z"
                  />
                </svg>
                Duration: 6 weeks
              </div>
            </>
          )}

          {/* Role */}
          <div className="mt-2 inline-block bg-teal-100 text-teal-800 px-3 py-1 text-sm rounded-full font-medium">
            {currentData.role}
          </div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-300 rounded-full mt-3 relative">
            <div 
              className="h-2 bg-teal-500 rounded-full absolute top-0 left-0 transition-all duration-300"
              style={{ width: `${currentData.progress}%` }}
            ></div>
          </div>
          
          {/* Progress Text */}
          <div className="text-xs text-gray-600 mt-1">
            {viewType === "employee" ? "Course Progress" : "Completion"}: {currentData.progress}%
          </div>
        </div>
      </div>
    </div>
  );
}
import React from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import { AddCourse } from "../components/coursemanagement/AddCourse"; // ✅ Make sure this path is correct

export const HrCreateCourse = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-grow bg-[#f5f5f5]">
        {/* Top Navbar */}
        <div className="px-4 py-2">
          <CourseNavbar />
        </div>

        {/* Page content */}
        <div className="flex flex-col flex-grow p-4">
          <AddCourse />
        </div>
      </div>
    </div>
  );
};

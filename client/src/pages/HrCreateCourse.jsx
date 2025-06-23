import React from "react";
import { Sidebar } from "../components/Sidebar";
import GoToLoomButton from "../components/coursemanagement/GoToLoomButton";
import InstallLoomExtensionButton from "../components/coursemanagement/InstallLoomExtensionButton";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";

export const HrCreateCourse = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Top Navbar */}
        <div className="px-4 py-2">
          <CourseNavbar />
        </div>

        {/* Page content */}
        <div className="flex flex-col items-center justify-center flex-grow p-8">
          <h1 className="text-4xl font-bold mb-10">Record with Loom</h1>

          {/* Button container: stacked vertically */}
          <div className="flex flex-col gap-6 w-full max-w-sm">
            <GoToLoomButton />
            <InstallLoomExtensionButton />
          </div>
        </div>
      </div>
    </div>
  );
};

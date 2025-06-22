import React from "react";
import { Sidebar } from "../components/Sidebar";
import LoomVideoForm from "../components/coursemanagement/LoomVideoForm";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";

export const HrCreateCourse = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex flex-col flex-grow">
        <div className="px-4 py-2">
          <CourseNavbar />
        </div>

        <div className="flex justify-center items-start px-4 py-6">
          <LoomVideoForm />
        </div>
      </div>
    </div>
  );
}

 
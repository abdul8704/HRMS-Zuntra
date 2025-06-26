import React from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import AddCourse from "../components/coursemanagement/AddCourse";
import Module from "../components/coursemanagement/Module";
import SubModule from "../components/coursemanagement/SubModule";
import AssignmentModule from "../components/coursemanagement/AssignmentModule";
import AddModuleButtons from "../components/coursemanagement/AddModuleButtons";

const HrCreateCourse = () => {
  return (
    <div className="flex min-h-screen overflow-hidden">

      <Sidebar />

      <div className="flex flex-col flex-grow bg-[#D6D6D6] overflow-y-auto">

        <div className="px-4 py-2">
          <CourseNavbar />
        </div>

        <div className="flex flex-col items-center px-4 py-4 space-y-4 max-w-5xl mx-auto">
          <AddCourse />
          <Module />
          <SubModule />
          <AssignmentModule />
          <AddModuleButtons />
        </div>
      </div>
    </div>
  );
};

export default HrCreateCourse;




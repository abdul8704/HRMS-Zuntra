import React, { useState } from "react";
import { UpskillSideBar } from "../components/upskill/UpskillSideBar";
import { VideoPlayer } from "../components/upskill/VideoPlayer";
import { DescriptionSection } from "../components/upskill/DescriptionSection";
import { AssignmentsSection } from "../components/upskill/AssignmentsSection";
import { courseData } from "../data/courseData";

export const CourseLearn = () => {
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [selectedSubmoduleIndex, setSelectedSubmoduleIndex] = useState(null);

  const progressMatrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  const formattedModules = courseData.modules.map((mod) => ({
    title: mod.moduleTitle,
    submodules: mod.submodules.map((sub) => sub.submoduleTitle),
  }));

  const selectedSubmodule =
    selectedModuleIndex !== null && selectedSubmoduleIndex !== null
      ? courseData.modules[selectedModuleIndex]?.submodules[selectedSubmoduleIndex]
      : null;

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden min-h-screen">
      {/* Sidebar */}
      <UpskillSideBar
        modules={formattedModules}
        progressMatrix={progressMatrix}
        onSubmoduleClick={(modIdx, subIdx) => {
          console.log("Clicked submodule:", modIdx, subIdx); // Debug
          setSelectedModuleIndex(modIdx);
          setSelectedSubmoduleIndex(subIdx);
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-4 md:px-6 md:ml-[260px] bg-white font-sans">
        <div className="h-6" />

        <div className="flex items-center text-lg md:text-xl font-bold text-black mb-4">
          <div className="w-1 h-6 bg-[#009688] rounded-sm mr-2" />
          {selectedSubmodule?.submoduleTitle || "Select a submodule"}
        </div>

        {selectedSubmodule ? (
          <>
            <VideoPlayer videoUrl={selectedSubmodule.video.videoUrl} />
            <DescriptionSection description={selectedSubmodule.description} />
            <AssignmentsSection quiz={selectedSubmodule.quiz} />
          </>
        ) : (
          <div className="text-center text-gray-500 mt-20 text-lg">
            📘 Please select a submodule from the sidebar to start learning.
          </div>
        )}
      </div>
    </div>
  );
};

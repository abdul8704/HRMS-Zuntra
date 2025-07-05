import React from "react";
import { UpskillSideBar } from "../components/upskill/UpskillSideBar";
import { VideoPlayer } from "../components/upskill/VideoPlayer";
import { DescriptionSection } from "../components/upskill/DescriptionSection";
import { AssignmentsSection } from "../components/upskill/AssignmentsSection";

export const HrUpskillSideBar = () => {
  const progressMatrix = [
    [1, 1, 1, 1],         // Module 1: complete
    [1, 0, 1],            // Module 2: incomplete
    [1, 1, 1, 1, 1],      // Module 3: complete
    [0, 0, 0, 0, 0],      // Module 4: incomplete
    [1, 1, 0, 1, 1],      // Module 5: incomplete
  ];

  return (
    <div className="flex overflow-x-hidden">
      {/* Sidebar */}
      <UpskillSideBar progressMatrix={progressMatrix} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col px-6 ml-[260px] bg-white font-sans">
        <div className="h-[25px]" />

        <div className="flex items-center text-xl font-bold text-black mb-4">
          <div className="w-1 h-6 bg-[#009688] rounded-sm mr-2" />
          Sub Module 2 Name
        </div>

        <VideoPlayer />
        <DescriptionSection />
        <AssignmentsSection />
      </div>
    </div>
  );
};

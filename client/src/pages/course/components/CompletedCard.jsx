import React from "react";
import { FaStar, FaDownload } from "react-icons/fa";

// Card Component
export const CompletedCard = ({
  courseImage,
  courseName = "DevOps with Docker",
  courseInstructor = "Arjun Mehta",
  date = "10-10-10",
  rating = "3.5",
}) => {
  return (
    <div className="w-[620px] h-[120px] bg-[#F7F7F7] rounded-xl shadow-sm flex overflow-hidden">
      {/* Left - Image */}
      <img
        src={courseImage}
        alt="Course"
        className="w-[38%] h-full object-cover"
      />

      {/* Right - Content */}
      <div className="flex flex-col justify-between flex-grow px-4 py-3">
        {/* Top Row - Title + Rating */}
        <div className="flex justify-between items-start">
          <div className="truncate max-w-[200%]">
            <h3 className="text-[15px] font-semibold text-black leading-tight truncate">
              {courseName}
            </h3>
            <p className="text-[12px] text-gray-600 truncate">
              by {courseInstructor}
            </p>
          </div>
          <div className="flex items-center gap-1 text-[12px] text-gray-800 flex-shrink-0 mt-[2px]">
            <span>{rating}</span>
            <FaStar className="text-yellow-400 text-[14px]" />
          </div>
        </div>

        {/* Bottom Row - Date + Download */}
        <div className="flex justify-between items-center mt-4">
          <span className="bg-[#EADCF9] text-[11px] text-black font-medium px-4 py-[3px] rounded-full whitespace-nowrap truncate">
            Completed on: {date}
          </span>
          <div className="bg-[#C9F6D8] p-[7px] rounded-full cursor-pointer hover:scale-105 transition">
            <FaDownload className="text-[#08BD1D] text-[13px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

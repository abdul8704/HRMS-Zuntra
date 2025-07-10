import React from "react";
import { useEffect, useState } from "react";

export const CourseCard = ({ courseImage, courseName, courseInstructor, deadline, deadlineUnits, rating = 5 }) => {
  const [isSelfPaced, setIsSelfPaced] = useState(false);
  
  useEffect(() => {
    if (deadline === 0) {
      setIsSelfPaced(true);
    }
  }, [deadline]);
  
  const badgeStyle = isSelfPaced
    ? "bg-[#08BD1D1F] text-[#2e7d32]"
    : "bg-[#BD080821] text-[#d35400]";

  return (
    <div className="flex flex-col h-full bg-[#D6D6D6] rounded-xl shadow-md overflow-hidden">
      {/* Image Container with Fixed Aspect Ratio */}
      <div className="w-full aspect-[4/3] flex-shrink-0 overflow-hidden">
        <img
          src={courseImage}
          alt={courseName}
          className="w-full h-full object-cover bg-[#f0f0f0]"
        />
      </div>
      
      {/* Content Container */}
      <div className="flex flex-col justify-between flex-1 p-3 min-h-0">
        {/* Title and Instructor */}
        <div className="flex flex-col mb-3 flex-1">
          <h3 className="text-sm font-semibold mb-1 leading-tight text-left line-clamp-2 min-h-[2.5rem]">
            {courseName}
          </h3>
          <p className="text-xs text-gray-600 text-left line-clamp-1">
            by {courseInstructor}
          </p>
        </div>
        
        {/* Badge and Rating */}
        <div className="flex justify-between items-center gap-2 flex-shrink-0">
          <span
            className={`rounded-xl font-medium px-2 py-1 text-xs flex-shrink-0 ${badgeStyle}`}
          >
            {deadline === 0 ? "At your own pace" : `in ${deadline} ${deadlineUnits}`}
          </span>
          <span className="flex items-center gap-1 flex-shrink-0">
            <span className="font-bold text-xs text-black">
              {rating}
            </span>
            <span className="text-base text-[#f4b400]">★</span>
          </span>
        </div>
      </div>
    </div>
  );
};
import React from "react";
import { useEffect, useState } from "react";

export const CourseCard = ({ courseImage, courseName, courseInstructor, deadline, deadlineUnits, rating = 5 }) => {
  // console.log(courseImage, courseName, courseInstructor, deadline, rating);
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
    <div className="flex flex-col w-full bg-[#D6D6D6] rounded-xl shadow-md overflow-hidden">
      <div className="w-full flex-shrink-0">
        <img
          src={courseImage}
          alt={courseName}
          className="w-full object-cover bg-[#f0f0f0] aspect-[4/3]"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 p-[clamp(0.5rem,2vw,0.75rem)] min-h-0">
        <div className="flex flex-col items-start mb-[clamp(0.5rem,2vw,0.75rem)] flex-1">
          <h3 className="text-[clamp(0.8125rem,3.5vw,1rem)] font-semibold mb-1 leading-snug text-left w-full line-clamp-2">
            {courseName}
          </h3>
          <p className="text-[clamp(0.6875rem,3vw,0.8125rem)] text-gray-600 text-left w-full m-0 leading-tight line-clamp-1">
            by {courseInstructor}
          </p>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-[clamp(0.25rem,1vw,0.5rem)] flex-shrink-0">
          <span
            className={`rounded-xl font-medium whitespace-nowrap px-2 py-1 text-[clamp(0.625rem,2.5vw,0.75rem)] ${badgeStyle}`}
          >
            {deadline === 0 ? "At your own pace" : `in ${deadline} ${deadlineUnits}`}
          </span>
          <span className="flex items-center gap-1">
            <span className="font-bold text-[clamp(0.6875rem,2.5vw,0.8125rem)] text-black">
              {rating}
            </span>
            <span className="text-[clamp(1rem,4vw,1.375rem)] text-[#f4b400]">★</span>
          </span>
        </div>
      </div>
    </div>
  );
};
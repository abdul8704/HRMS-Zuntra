import React from "react";

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  const isSelfPaced = duration.toLowerCase().includes("at your own pace");
  const badgeStyle = isSelfPaced
    ? "bg-[#08BD1D1F] text-[#2e7d32]"
    : "bg-[#BD080821] text-[#d35400]";

  return (
    <div className="flex flex-col flex-1 min-w-[16.25rem] max-w-[21.875rem] w-full min-h-[18.75rem] bg-[#D6D6D6] rounded-xl shadow-md overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full object-cover bg-[#f0f0f0]"
        style={{
          height: "clamp(8.75rem, 40vw, 11.25rem)",
        }}
      />
      <div className="flex flex-col justify-between flex-1 p-[clamp(0.5rem,2vw,0.75rem)]">
        <div className="flex flex-col items-start mb-[clamp(0.5rem,2vw,0.75rem)]">
          <h3 className="text-[clamp(0.8125rem,3.5vw,1rem)] font-semibold mb-1 leading-snug text-left w-full">
            {title}
          </h3>
          <p className="text-[clamp(0.6875rem,3vw,0.8125rem)] text-gray-600 text-left w-full m-0 leading-tight">
            by {instructor}
          </p>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-[clamp(0.25rem,1vw,0.5rem)]">
          <span
            className={`rounded-xl font-medium whitespace-nowrap px-2 py-1 text-[clamp(0.625rem,2.5vw,0.75rem)] ${badgeStyle}`}
          >
            {duration}
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


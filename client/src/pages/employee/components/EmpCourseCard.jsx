import React from "react";

export const EmpCourseCard = ({
  courseName,
  authorName,
  imageUrl,
  onRemove,
  truncateTitle = false,
  inDropdown = false, // NEW PROP
}) => {
  return (
    <div
      className={`relative flex items-center bg-gradient-to-r from-slate-100 to-slate-200 px-4 py-2 gap-3 font-sans rounded-lg ${
        inDropdown ? "w-[220px] h-[64px]" : "w-full"
      }`}
    >
      <img
        src={imageUrl}
        alt="course"
        className="w-8 h-8 rounded-full object-cover"
      />

      <div className="flex flex-col items-start">
        {/* Course name with tooltip */}
        <div className="relative group">
          <span
            className={`text-sm font-semibold text-gray-900 ${
              truncateTitle ? "truncate inline-block max-w-full" : ""
            }`}
          >
            {courseName}
          </span>
          <div className="absolute bottom-full mb-1 left-0 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-50">
            {courseName}
          </div>
        </div>

        {/* Author name with tooltip */}
        <div className="relative group">
          <span
            className={`text-sm text-gray-600 ${
              truncateTitle ? "truncate inline-block max-w-full" : ""
            }`}
          >
            {authorName}
          </span>
          <div className="absolute bottom-full mb-1 left-0 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-md whitespace-nowrap z-50">
            {authorName}
          </div>
        </div>
      </div>

      {onRemove && (
        <div
          className="absolute top-1 right-2 text-gray-600 text-sm cursor-pointer"
          onClick={onRemove}
        >
          ×
        </div>
      )}
    </div>
  );
};

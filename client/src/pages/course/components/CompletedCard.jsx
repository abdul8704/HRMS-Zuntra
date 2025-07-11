import React from "react";
import { FaStar, FaRedoAlt, FaDownload } from "react-icons/fa";

export const CompletedCard = ({ image, title, instructor, date, rating }) => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 rounded-xl overflow-hidden w-full max-w-xl mx-auto mb-4">
      {/* Image */}
      <img
        src={image}
        alt="course"
        className="w-full md:w-40 h-44 object-cover flex-shrink-0"
      />

      {/* Card Body */}
      <div className="flex flex-col justify-between flex-grow p-5">
        {/* Top */}
        <div className="flex justify-between items-start flex-wrap">
          <div>
            <h3 className="text-xl font-semibold mb-1">{title}</h3>
            <p className="text-sm text-gray-600">by {instructor}</p>
          </div>
          <div className="flex items-center gap-1 font-medium mt-1">
            <span>{rating}</span>
            <FaStar className="text-yellow-500" />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-4 flex-wrap gap-2">
          <span className="bg-[#7B08BD21] text-[#7B08BD] text-xs font-medium px-3 py-1 rounded-full">
            Completed on: {date}
          </span>
          <div className="flex gap-3">
            <div className="bg-[#08BD1D21] p-2 rounded-full flex items-center justify-center">
              <FaRedoAlt className="text-[#08BD1D] text-base" />
            </div>
            <div className="bg-[#08BD1D21] p-2 rounded-full flex items-center justify-center">
              <FaDownload className="text-[#08BD1D] text-base" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";

const SubModule = ({ onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-5xl mb-6">
      {/* Header with title and delete icon */}
      <div className="flex justify-between items-center border-l-4 border-cyan-500 pl-3 mb-4">
        <h3 className="text-md font-semibold">Sub Module 1</h3>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          {/* SVG Cross Icon */}
         <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="26"
            fill="none"
            viewBox="0 0 25 26"
          >
            <path
              stroke="red"
              strokeLinecap="round"
              strokeWidth="2"
              d="M23.829 24.28 1.272 1.723m22.557 0L1.272 24.28"
            />
          </svg>
        </button>
      </div>

      {/* Row: Sub Module Name & Video URL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          placeholder="Sub Module Name"
          className="p-3 bg-gray-100 rounded"
        />
        <input
          type="text"
          placeholder="Video URL"
          className="p-3 bg-gray-100 rounded"
        />
      </div>

      {/* Sub Module Description */}
      <div>
        <textarea
          placeholder="Sub Module Description"
          rows={3}
          className="w-full p-3 bg-gray-100 rounded resize-none"
        />
      </div>
    </div>
  );
};

export default SubModule;

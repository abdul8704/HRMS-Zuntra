import React from "react";

const Module = ({ onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-5xl mb-6">
      {/* Header with title and delete icon */}
      <div className="flex justify-between items-center border-l-4 border-cyan-500 pl-3 mb-4">
        <h3 className="text-md font-semibold">Modules</h3>
        <button onClick={onDelete} className="text-red-500 hover:text-red-700">
          {/* SVG cross icon */}
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

      {/* Module Name Input */}
      <input
        type="text"
        placeholder="Module Name"
        className="w-full p-3 bg-gray-100 rounded"
      />
    </div>
  );
};

export default Module;

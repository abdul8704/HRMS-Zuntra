import React from "react";

const AssignmentModule = ({ onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-5xl mb-6">
      {/* Header with title and custom SVG delete icon */}
      <div className="flex justify-between items-center border-l-4 border-cyan-500 pl-3 mb-4">
        <h3 className="text-md font-semibold">Assignment - Sub Module 1</h3>
        <button onClick={onDelete} className="hover:opacity-80">
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

      {/* Question Text */}
      <div className="bg-gray-100 p-3 rounded mb-3 font-semibold">
        What is the answer for question 1?
      </div>

      {/* Options */}
      <div className="space-y-2 mb-4">
        {[1, 2, 3, 4].map((opt, i) => (
          <div key={i} className="flex items-center gap-3">
            <input type="checkbox" defaultChecked={opt === 2} />
            <span>Option {opt}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
          </div>
        ))}
      </div>

      {/* Add Option Section */}
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Enter a choice"
          className="p-2 flex-grow bg-gray-100 rounded"
        />
        <button className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400">
          +
        </button>
        <button className="bg-gray-300 px-3 py-2 rounded hover:bg-gray-400">
          Add Question
        </button>
      </div>
    </div>
  );
};

export default AssignmentModule;


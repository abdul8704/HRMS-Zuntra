import React from "react";

export const PageHeader = () => {
  return (
    <div className="flex items-center justify-between bg-[#bbd3cc] p-4 rounded-xl mb-8 shadow-md">
      {/* Centered Title */}
      <div className="flex-grow text-center">
        <h2 className="m-0 text-xl font-semibold text-gray-900">
          Introduction to course
        </h2>
        <p className="mt-1 text-sm text-gray-800">by Prof.Dr.Diwakar</p>
      </div>

      {/* Right Arrow */}
      <span className="text-[2.6875rem] font-bold text-gray-900 w-6 flex justify-start items-center -translate-x-2.5 ml-5 -mt-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="41"
          height="38"
          fill="none"
          viewBox="0 0 41 38"
        >
          <path
            fill="#000"
            fillOpacity=".5"
            d="M25.65 37.8a1.35 1.35 0 1 0 0-2.7H8.1a5.4 5.4 0 0 1-5.4-5.4V8.1a5.4 5.4 0 0 1 5.4-5.4h17.55a1.35 1.35 0 0 0 0-2.7H8.1A8.1 8.1 0 0 0 0 8.1v21.6a8.1 8.1 0 0 0 8.1 8.1h17.55Zm3.094-29.306a1.35 1.35 0 0 1 1.912 0l9.45 9.45a1.35 1.35 0 0 1 0 1.912l-9.45 9.45a1.351 1.351 0 1 1-1.912-1.912l7.147-7.144H12.15a1.35 1.35 0 1 1 0-2.7h23.741l-7.147-7.144a1.35 1.35 0 0 1 0-1.912Z"
          />
        </svg>
      </span>
    </div>
  );
};

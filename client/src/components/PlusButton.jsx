import React from 'react';

export const PlusButton = () => {
  return (
    <button
      type="button"
      className="fixed bottom-8 right-20 w-16 h-16 bg-[#c2d9d7] rounded-full flex items-center justify-center cursor-pointer group hover:bg-[#b2ccc9] transition-colors duration-300 z-[1000]"
    >
      <svg
        className="w-8 h-8 text-black transform transition-transform duration-300 ease-in-out group-hover:rotate-[180deg]"
        fill="none"
        stroke="currentColor"
        strokeWidth={3}
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
      </svg>
    </button>
  );
};

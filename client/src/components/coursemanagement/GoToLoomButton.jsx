import React from "react";
import { FaSpinner } from "react-icons/fa";

const GoToLoomButton = () => {
  return (
    <a
      href="https://www.loom.com"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-6 py-3 bg-teal-100 hover:bg-teal-200 text-black font-medium rounded-full shadow-sm transition"
    >
      <FaSpinner className="text-purple-600 text-xl" />
      <span>Go to Loom Website</span>
    </a>
  );
};

export default GoToLoomButton;
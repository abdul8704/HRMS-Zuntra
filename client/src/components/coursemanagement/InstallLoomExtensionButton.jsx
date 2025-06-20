import React from "react";
import { FaPuzzlePiece } from "react-icons/fa";

const InstallLoomExtensionButton = () => {
  return (
    <a
      href="https://chrome.google.com/webstore/detail/loom-video-recorder"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-6 py-3 bg-teal-100 hover:bg-teal-200 text-black font-medium rounded-full shadow-sm transition"
    >
      <FaPuzzlePiece className="text-gray-600 text-xl" />
      <span>Install Loom Extension</span>
    </a>
  );
};

export default InstallLoomExtensionButton;

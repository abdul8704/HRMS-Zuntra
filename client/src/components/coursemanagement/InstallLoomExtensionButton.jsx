import React from "react";

const InstallLoomExtensionButton = () => {
  return (
    <a
      href="https://chrome.google.com/webstore/detail/loom-video-recorder"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-6 py-3 bg-teal-100 hover:bg-teal-200 text-black font-medium rounded-full shadow-sm transition"
    >
      {/* Custom SVG Icon */}
      <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" fill="none" viewBox="0 0 29 29">
  <path fill="#fff" d="M28.25 16.563a4.803 4.803 0 0 1-4.125 4.757v4.18a2.75 2.75 0 0 1-2.75 2.75H16.15v-.413a3.712 3.712 0 0 0-3.712-3.712 3.706 3.706 0 0 0-3.713 3.712v.413H3.5A2.75 2.75 0 0 1 .75 25.5v-5.225h.413a3.706 3.706 0 0 0 3.712-3.712 3.706 3.706 0 0 0-3.712-3.713H.75V7.625a2.75 2.75 0 0 1 2.75-2.75h4.18A4.803 4.803 0 0 1 12.438.75a4.803 4.803 0 0 1 4.757 4.125h4.18a2.75 2.75 0 0 1 2.75 2.75v4.18a4.803 4.803 0 0 1 4.125 4.758Zm-6.875 2.062h2.063a2.062 2.062 0 0 0 0-4.125h-2.063V7.625H14.5V5.562a2.062 2.062 0 0 0-4.125 0v2.063H3.5v2.915a6.443 6.443 0 0 1 4.125 6.023A6.463 6.463 0 0 1 3.5 22.584V25.5h2.915a6.463 6.463 0 0 1 6.022-4.125A6.463 6.463 0 0 1 18.46 25.5h2.915v-6.875Z"/>
</svg>


      <span>Install Loom Extension</span>
    </a>
  );
};

export default InstallLoomExtensionButton;

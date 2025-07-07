import React, { useState } from "react";
import zuntraLogo from "../../assets/zuntra.png";
import { Menu } from "lucide-react";

export const UpskillSideBar = ({
  modules = [],
  progressMatrix = [],
  onSubmoduleClick = () => {},
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const isModuleCompleted = (moduleIndex) =>
    progressMatrix[moduleIndex]?.length &&
    progressMatrix[moduleIndex].every((val) => val === 1);

  const isSubmoduleCompleted = (moduleIndex, subIndex) =>
    progressMatrix[moduleIndex]?.[subIndex] === 1;

  return (
    <>
      {/* Toggle Button - Mobile View Only */}
      {!isOpen && (
        <button
          className="fixed top-[0.6rem] left-2 z-[1001] p-1.5 rounded-full bg-[#b3d1cc] shadow-md md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15.5"
            height="15.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
          >
            <polyline points="9,18 15,12 9,6" />
          </svg>
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[260px] bg-[#cde8e6] p-4 overflow-y-auto z-[1000] transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo + Close */}
        <div className="relative">
          {/* Logo */}
          <div className="text-center mb-4">
            <img src={zuntraLogo} alt="Logo" className="w-[130px] mx-auto mb-2" />
            <div className="flex justify-center gap-1">
              <div className="h-[5px] rounded w-[60%]" style={{ backgroundColor: "#2b9c9f" }} />
              <div className="h-[5px] rounded w-[30%]" style={{ backgroundColor: "#e8dcdc" }} />
            </div>
          </div>

          {/* Close Button (mobile only) */}
          <button
            className="absolute top-0 right-0 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Modules */}
        <div>
          {modules.map((module, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex items-center mb-1">
                <span
                  className="w-[4px] h-5 rounded-sm mr-2"
                  style={{
                    backgroundColor: isModuleCompleted(idx) ? "#00cfd1" : "#8C8C8C",
                  }}
                />
                <h4 className="text-sm font-semibold m-0">{module.title}</h4>
              </div>
              <ul className="pl-4 space-y-1">
                {module.submodules.map((sub, subIdx) => (
                  <li
  key={subIdx}
  className="text-sm flex items-center gap-2 cursor-pointer hover:underline"
  onClick={() => onSubmoduleClick(idx, subIdx)}
>
  <span
    className="w-[4px] h-[14px] rounded-sm"
    style={{
      backgroundColor: isSubmoduleCompleted(idx, subIdx)
        ? "#00cfd1"
        : "#B5A6A8",
    }}
  />
  {sub}
</li>

                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

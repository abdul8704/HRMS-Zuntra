import React, { useState } from "react";
import zuntraLogo from "../../../assets/zuntra.png";
import { useNavigate, useParams } from "react-router-dom";

export const UpskillSideBar = ({
  modules = [],
  progressMatrix = [],
  percentComplete,
  onSubmoduleClick = () => {},
}) => {
  const { courseId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [openModules, setOpenModules] = useState([]);
  const navigate = useNavigate();

  const toggleModule = (index) => {
    setOpenModules((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };
  const isModuleCompleted = (moduleIndex) =>
    Array.isArray(progressMatrix[moduleIndex]) &&
    progressMatrix[moduleIndex].length > 0 &&
    progressMatrix[moduleIndex].every((val) => val === true);

  const isSubmoduleCompleted = (moduleIndex, subIndex) =>
    progressMatrix[moduleIndex]?.[subIndex] === true;

  return (
    <>
      {/* Toggle Button - Mobile Only */}
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
        {/* Back Button + Logo */}
        <div className="flex items-center mb-8">
          <button
            className="text-2xl font-bold text-black hover:scale-110 transition"
            onClick={() => navigate(`/course/${courseId}/intro`)}
          >
            ←
          </button>

          <div className="flex flex-col ml-7">
            <img src={zuntraLogo} alt="Logo" className="w-[120px]" />
            <div className="w-full bg-gray-200 rounded h-[5px] overflow-hidden mt-1">
              <div
                className="h-full rounded bg-teal-600 transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>
        </div>

        {/* Close Button - Mobile Only */}
        <button
          className="absolute top-2 right-2 w-9 h-9 rounded-full bg-white shadow-md flex items-center justify-center md:hidden"
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

        {/* Module Accordion */}
        <div>
          {modules.map((module, idx) => (
            <div key={idx} className="mb-6">
              <div
                className="flex items-center justify-between mb-1 cursor-pointer select-none"
                onClick={() => toggleModule(idx)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-[4px] h-5 rounded-sm"
                    style={{
                      backgroundColor: isModuleCompleted(idx)
                        ? "#00cfd1"
                        : "#8C8C8C",
                    }}
                  />
                  <h4 className="text-sm font-semibold m-0">{module.title}</h4>
                </div>
                <span className="text-sm pr-1">
                  {openModules.includes(idx) ? "▼" : "▶"}
                </span>
              </div>

              {openModules.includes(idx) && (
                <ul className="pl-4 space-y-3 leading-tight mt-3">
                  {(module.submodules || []).map((sub, subIdx) => (
                    <li
                      key={subIdx}
                      className="text-sm flex items-center gap-2 cursor-pointer hover:text-teal-700 transition-all"
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
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

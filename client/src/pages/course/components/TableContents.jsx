import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";

export const TableOfContents = ({
  courseId,
  progress = "40%",
  enrolled,
  progressMatrix = [],
  tocContent = [],
}) => {
  const navigate = useNavigate();

  // Normalize progressMatrix to empty array if null
  const normalizedProgressMatrix = progressMatrix ?? [];

  const isModuleCompleted = (moduleIndex) => {
    const row = normalizedProgressMatrix[moduleIndex] || [];
    return Array.isArray(row) && row.length && row.every((val) => val === 1);
  };

  const handleClick = async () => {
    try {
      if (!enrolled) {
        const res = await api.post(`/api/course/${courseId}/enroll`);
        console.log("Enrolled successfully:", res.data);
      }

      navigate(`/course/learn/${courseId}`);
    } catch (error) {
      console.error("Error in Continue Learning:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="bg-gray-200 p-4 rounded-xl font-sans overflow-y-auto flex-1">
        <h3 className="text-xl font-bold mb-4 text-black">Table of contents</h3>
        <div>
          {tocContent.map((module, moduleIndex) => {
            const completed = isModuleCompleted(moduleIndex);
            return (
              <div className="mb-5" key={moduleIndex}>
                <div className="flex items-center gap-2 text-base font-bold text-black">
                  <span
                    className={`w-1 h-6 rounded ${
                      completed ? "bg-[#00cfd1]" : "bg-gray-400"
                    }`}
                  />
                  <span>{module.moduleTitle}</span>
                </div>
                <ul className="list-none pl-5 mt-1.5">
                  {(module.submodules || []).map((sub, subIndex) => (
                    <li
                      key={subIndex}
                      className="text-sm text-black my-1.5 flex items-center gap-2"
                    >
                      <span
                        className={`font-bold ${
                          normalizedProgressMatrix[moduleIndex]?.[subIndex] === 1
                            ? "text-[#00cfd1]"
                            : "text-gray-400"
                        }`}
                      >
                        |
                      </span>
                      <span>{sub.submoduleTitle}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleClick}
        className={`w-full max-w-full text-center text-black font-bold text-lg py-3.5 px-6 rounded-xl cursor-pointer ${
          enrolled ? "" : "bg-gray-200"
        }`}
        style={
          enrolled
            ? {
                background: `linear-gradient(to right, #bbd3cc ${progress}, #e5e5e5 30%)`,
              }
            : {}
        }
      >
        {enrolled ? "Continue Learning" : "Enroll Now"}
      </button>
    </div>
  )
};

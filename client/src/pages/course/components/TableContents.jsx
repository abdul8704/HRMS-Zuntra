import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axios";
import { jwtDecode } from 'jwt-decode';

export const TableOfContents = ({
  courseId,
  progress,
  enrolled,
  courseName,
  progressMatrix = [],
  tocContent = [],
}) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const normalizedProgressMatrix = progressMatrix ?? [];

  const isModuleCompleted = (moduleIndex) => {
    const row = normalizedProgressMatrix[moduleIndex] || [];
    return Array.isArray(row) && row.length && row.every((val) => val === true);
  };

  // const token = localStorage.getItem('accessToken');
  // const userDetails = jwtDecode(token || '{}');

  const handleStartOver = () => {
    navigate(`/course/learn/${courseId}`);
  };

  const handleCertificate = () => {
    alert(
      `🎓 This is to certify that ${userDetails.username} has successfully completed the course ${courseName} 🎉.\n\n📸 Please take a screenshot of this message as proof of completion. SkillIssue kindly adjust for now 💀`
    );
  };

  const handleEnrollOrContinue = async () => {
    try {
      if (!enrolled) {
        setLoading(true);
        await api.post(`/api/course/${courseId}/enroll`);
      }
      navigate(`/course/learn/${courseId}`);
    } catch (error) {
      console.error("Error in Continue Learning:", error);
    } finally {
      setLoading(false);
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
                  <span className={`w-1 h-6 rounded ${completed ? "bg-[#00cfd1]" : "bg-gray-400"}`} />
                  <span>{module.moduleTitle}</span>
                </div>
                <ul className="list-none pl-5 mt-1.5">
                  {(module.submodules || []).map((sub, subIndex) => (
                    <li key={subIndex} className="text-sm text-black my-1.5 flex items-center gap-2">
                      <span className={`font-bold ${normalizedProgressMatrix[moduleIndex]?.[subIndex]
                        ? "text-[#00cfd1]"
                        : "text-gray-400"}`}>
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

      {enrolled && progress === "100%" ? (
        <div className="flex gap-2">
          {/* Start Over Button */}
          <button
            onClick={handleStartOver}
            disabled={loading}
            className={`w-full text-black font-bold text-lg py-3.5 px-6 rounded-xl ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            style={{ backgroundColor: "#e5e5e5" }}
          >
            {loading ? "Please wait..." : "Refer"}
          </button>

          {/* Download Certificate Button */}
          <button
            onClick={handleCertificate}
            className="w-full text-black font-bold text-lg py-3.5 px-6 rounded-xl"
            style={{ backgroundColor: "#bbd3cc" }}
          >
            Download Certificate
          </button>
        </div>
      ) : (
        <button
          onClick={handleEnrollOrContinue}
          disabled={loading}
          className={`w-full text-black font-bold text-lg py-3.5 px-6 rounded-xl ${
            enrolled ? "" : "bg-gray-200"
          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          style={
            enrolled
              ? {
                  background: `linear-gradient(to right, #bbd3cc ${progress}, #e5e5e5 ${progress})`,
                }
              : {}
          }
        >
          {loading
            ? "Please wait..."
            : enrolled
            ? "Continue Learning"
            : "Enroll Now"}
        </button>
      )}
    </div>
  );
};

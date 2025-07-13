import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { UpskillSideBar } from './components/UpskillSideBar';
import { VideoPlayer } from "./components/VideoPlayer";
import { DescriptionSection } from "./components/DescriptionSection";
import { AssignmentsSection } from "./components/AssignmentsSection";
import { PopupCard } from '../../components/PopupCard';
import api from "../../api/axios";


export const CourseLearn = () => {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [selectedSubmoduleIndex, setSelectedSubmoduleIndex] = useState(null);
  const [progressMatrix, setProgressMatrix] = useState(null);
  const [percentComplete, setPercentComplete] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({
    type: "info",
    title: "",
    message: "",
    duration: 3000,
  });

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        // const res = await api.get(`/api/course/content/${courseId}`);
        const [courseRes, progRes] = await Promise.all([
          api.get(`/api/course/content/${courseId}`),
          api.get(`/api/course/${courseId}/progress`),
        ]);
        if (courseRes.data.success) {
          const course = courseRes.data.data[0];
          setCourseData(course);
          if (course.modules.length > 0 && course.modules[0].submodules.length > 0) {
            setSelectedModuleIndex(0);
            setSelectedSubmoduleIndex(0);
          }
        }
        if (progRes.data.success) {
          setProgressMatrix(progRes.data.data.moduleStatus.completedModules);
          setPercentComplete(progRes.data.data.percentComplete);
        }
        else {
          setProgressMatrix(null);
        }
      } catch (err) {
        console.error("Failed to load course content", err);
      }
    };

    if (courseId) {
      fetchCourseContent();
    }
  }, [courseId]);

  const formattedModules = courseData?.modules.map((mod) => ({
    title: mod.moduleTitle,
    submodules: mod.submodules.map((sub) => sub.submoduleTitle),
  })) || [];

  const selectedSubmodule =
    selectedModuleIndex !== null && selectedSubmoduleIndex !== null
      ? courseData?.modules[selectedModuleIndex]?.submodules[selectedSubmoduleIndex]
      : null;
  const handleQuizCompleted = async () => {
    try {
      const res = await api.post(`/api/course/progress/${courseId}/${selectedModuleIndex}/${selectedSubmoduleIndex}`);
      setPopupContent({
        type: "success",
        title: "Submodule Completed",
        message: "You have successfully completed this subModule",
        duration: 5000,
      });
      setShowPopup(true); 
      setProgressMatrix(res.data.data.moduleStatus.completedModules)
      console.log("Course marked as completed", res.data);
    } catch (error) {
      console.error("Failed to mark course as completed", error);
    }
  };
  return (
    <>
      {showPopup && (
        <PopupCard
          isVisible={true}
          onClose={() => setShowPopup(false)}
          type={popupContent.type}
          title={popupContent.title}
          message={popupContent.message}
          duration={popupContent.duration}
        />
      )}
      <div className="flex flex-col md:flex-row overflow-x-hidden min-h-screen">
        {/* Sidebar */}
        <UpskillSideBar
          modules={formattedModules}
          progressMatrix={progressMatrix}
          percentComplete={percentComplete}
          onSubmoduleClick={(modIdx, subIdx) => {
            setSelectedModuleIndex(modIdx);
            setSelectedSubmoduleIndex(subIdx);
          }}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col px-4 md:px-6 md:ml-[260px] bg-white font-sans">
          <div className="h-6" />

          <div className="flex items-center text-lg md:text-xl font-bold text-black mb-4">
            <div className="w-1 h-6 bg-[#009688] rounded-sm mr-2" />
            {selectedSubmodule?.submoduleTitle || "No submodule selected"}
          </div>

          {selectedSubmodule && (
            <>
              <VideoPlayer videoUrl={selectedSubmodule.video.videoUrl} />
              <DescriptionSection description={selectedSubmodule.description} />
              <AssignmentsSection quiz={selectedSubmodule.quiz} markProgress={handleQuizCompleted} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

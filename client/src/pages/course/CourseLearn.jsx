import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
  import { UpskillSideBar } from './components/UpskillSideBar';
import { AssignmentsSection } from "./components/AssignmentsSection";
import { PopupCard } from '../../components/PopupCard';
import api from "../../api/axios";


export const CourseLearn = () => {
  const navigate = useNavigate();
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
      setPercentComplete(res.data.data.percentComplete)
      if (progRes.data.data.percentComplete === 100) {
        navigate(`/course/${courseId}/intro`);
      }
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
            {selectedSubmodule?.submoduleTitle || "Loading..."}
          </div>

          {selectedSubmodule && (
            <>
              {/* Video Section */}
              <div className="w-full flex justify-center my-4">
                <div className="w-full md:w-[80%] lg:w-[70%] aspect-video">
                  <iframe
                    src={selectedSubmodule.video.videoUrl}
                    title="Video"
                    className="w-full h-full rounded-lg shadow-md"
                    allowFullScreen
                  />
                </div>
              </div>
              {/* Description Section */}
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center mb-6">
                  <div className="w-1 h-6 bg-gradient-to-b from-teal-500 to-teal-600 mr-3 rounded-full" />
                  <h4 className="text-xl font-bold text-gray-800">Description</h4>
                </div>

                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {selectedSubmodule.description}
                  </p>
                </div>
              </div>
              <AssignmentsSection quiz={selectedSubmodule.quiz} markProgress={handleQuizCompleted} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

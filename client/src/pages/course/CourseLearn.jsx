import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UpskillSideBar } from "../../components/upskill/UpskillSideBar";
import { VideoPlayer } from "../../components/upskill/VideoPlayer";
import { DescriptionSection } from "../../components/upskill/DescriptionSection";
import { AssignmentsSection } from "../../components/upskill/AssignmentsSection";
import api from "../../api/axios";

export const CourseLearn = () => {
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(null);
  const [selectedSubmoduleIndex, setSelectedSubmoduleIndex] = useState(null);

  // ✅ Hardcoded progress matrix
  const progressMatrix = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ];

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const res = await api.get(`/api/course/content/${courseId}`);
        if (res.data.success) {
          const course = res.data.data[0];
          setCourseData(course);

          // ✅ Set default to first submodule
          if (course.modules.length > 0 && course.modules[0].submodules.length > 0) {
            setSelectedModuleIndex(0);
            setSelectedSubmoduleIndex(0);
          }
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

  return (
    <div className="flex flex-col md:flex-row overflow-x-hidden min-h-screen">
      {/* Sidebar */}
      <UpskillSideBar
        modules={formattedModules}
        progressMatrix={progressMatrix}
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
            <AssignmentsSection quiz={selectedSubmodule.quiz} />
          </>
        )}
      </div>
    </div>
  );
};

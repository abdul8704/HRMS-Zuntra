import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Sidebar } from "../../components/Sidebar";
import { TableOfContents } from "./components/TableContents";
import api from "../../api/axios";

export const CourseIntro = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [tocContent, setTocContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [progressMatrix, setProgressMatrix] = useState(null);
  const [percentComplete, setPercentComplete] = useState(0);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setApiMessage("");

      try {
        const [courseRes, tocRes, progRes] = await Promise.all([
          api.get(`/api/course/details/${courseId}`),
          api.get(`/api/course/toc/content/${courseId}`),
          api.get(`/api/course/${courseId}/progress`),
        ]);

        if (courseRes.data.success) {
          setCourseData(courseRes.data.data);
          console.log("Course Details:", courseRes.data.data);
        } else {
          setApiMessage(courseRes.data.message || "Course data error.");
        }

        if (tocRes.data.success) {
          const modules = tocRes.data.data?.[0]?.modules || [];
          setTocContent(modules);
        } else {
          setApiMessage((prev) => prev + " | ToC fetch failed.");
        }

        if (progRes.data.success) {
          setProgressMatrix(progRes.data.data.moduleStatus.completedModules);
          setPercentComplete(progRes.data.data.percentComplete);
        } else {
          setProgressMatrix(null);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setApiMessage("Error fetching course details.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col p-4">
        {loading || apiMessage ? (
          <div className="flex flex-1 justify-center items-center">
            <p className={`text-xl ${apiMessage ? "text-red-600" : "text-gray-700"}`}>
              {loading ? "Loading..." : apiMessage}
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between bg-[#bbd3cc] p-4 rounded-xl mb-8 shadow-md">
              <button
                className="text-2xl font-bold text-black hover:scale-110 transition"
                onClick={() => {
                  navigate("/upskill/assigned");
                }}
              >
                ←
              </button>
              <div className="flex-grow text-center">
                <h2 className="m-0 text-xl font-semibold text-gray-900">
                  {courseData?.courseName || "Introduction to Course"}
                </h2>
                <p className="mt-1 text-sm text-gray-800">
                  by {courseData?.courseInstructor || "Prof. Dr. Diwakar"}
                </p>
              </div>
              <span className="text-[2.6875rem] font-bold text-gray-900 w-6 flex justify-start items-center -translate-x-2.5 ml-5 -mt-2">
                {/* Optional Icon or Rating can go here */}
              </span>
            </div>

            <div className="flex-1 flex gap-6 h-[75vh] flex-col lg:flex-row">
              {/* Left Section - Video & Description */}
              <div className="flex flex-col flex-[7] w-full">
                <div className="w-full h-[56.25rem] bg-white rounded-xl shadow-md overflow-y-auto flex flex-col p-5 gap-5 scrollbar-thin scrollbar-thumb-slate-300">
                  <div className="w-full h-[90%] rounded-xl overflow-hidden">
                    <iframe
                      src={courseData?.courseIntroVideo?.videoUrl}
                      title={courseData?.courseIntroVideo?.videoTitle || "Course Intro"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-xl"
                    />
                  </div>

                  <div className="h-1/2 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {courseData?.courseDescription || "No description available."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Section - Table of Contents */}
              <div className="flex flex-col flex-[3] w-full md:h-full justify-center md:justify-start mt-4 md:mt-0">
                <TableOfContents
                  courseId={courseId}
                  progress={percentComplete + "%"}
                  enrolled={progressMatrix !== null}
                  courseName={courseData?.courseName}
                  progressMatrix={progressMatrix}
                  tocContent={tocContent}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

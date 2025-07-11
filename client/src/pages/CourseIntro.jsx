import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { TableOfContents } from "../components/upskill/TableContents";
import api from "../api/axios";

export const CourseIntro = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState(null);
  const [tocContent, setTocContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiMessage, setApiMessage] = useState("");

  const progressMatrix = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ];
  useEffect(() => {
    const fetchCourseDetails = async () => {
      setLoading(true);
      setApiMessage("");

      try {
        const [courseRes, tocRes] = await Promise.all([
          api.get(`/api/course/details/${courseId}`),
          api.get(`/api/course/toc/content/${courseId}`),
        ]);

        if (courseRes.data.success) {
          setCourseData(courseRes.data.data);
        } else {
          setApiMessage(courseRes.data.message || "Course data error.");
        }

        if (tocRes.data.success) {
          const modules = tocRes.data.data?.[0]?.modules || [];
          setTocContent(modules);
        } else {
          setApiMessage(prev => prev + " | ToC fetch failed.");
        }
      } catch (error) {
        setApiMessage("Error fetching course details or ToC.");
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
      <div className="flex-1 flex flex-col p-4 overflow-hidden">
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
                onClick={() => { navigate("/upskill/assigned") }}
              >
                ←
              </button>
              <div className="flex-grow text-center">
                <h2 className="m-0 text-xl font-semibold text-gray-900">
                  {courseData?.courseName || "Introduction to course"}
                </h2>
                <p className="mt-1 text-sm text-gray-800">
                  by {courseData?.courseInstructor || "Prof.Dr.Diwakar"}
                </p>
              </div>
              <span className="text-[2.6875rem] font-bold text-gray-900 w-6 flex justify-start items-center -translate-x-2.5 ml-5 -mt-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="41"
                  height="38"
                  fill="none"
                  viewBox="0 0 41 38"
                >
                  <path
                    fill="#000"
                    fillOpacity=".5"
                    d="M25.65 37.8a1.35 1.35 0 1 0 0-2.7H8.1a5.4 5.4 0 0 1-5.4-5.4V8.1a5.4 5.4 0 0 1 5.4-5.4h17.55a1.35 1.35 0 0 0 0-2.7H8.1A8.1 8.1 0 0 0 0 8.1v21.6a8.1 8.1 0 0 0 8.1 8.1h17.55Zm3.094-29.306a1.35 1.35 0 0 1 1.912 0l9.45 9.45a1.35 1.35 0 0 1 0 1.912l-9.45 9.45a1.351 1.351 0 1 1-1.912-1.912l7.147-7.144H12.15a1.35 1.35 0 1 1 0-2.7h23.741l-7.147-7.144a1.35 1.35 0 0 1 0-1.912Z"
                  />
                </svg>
              </span>
            </div>

            <div className="flex gap-6 h-[75vh] flex-col md:flex-row">
              <div className="flex flex-col flex-[7] w-full">
                <div className="w-full h-[56.25rem] bg-white rounded-xl shadow-md overflow-y-auto flex flex-col p-5 gap-5 scrollbar-thin scrollbar-thumb-slate-300">
                  <video
                    controls
                    className="w-full h-[90%] object-cover rounded-xl"
                    poster={
                      courseData?.thumbnail ||
                      "https://via.placeholder.com/800x450.png?text=Course+Thumbnail"
                    }
                  >
                    <source
                      src={
                        courseData?.videoUrl ||
                        "https://videos.pexels.com/video-files/3129424/3129424-uhd_2560_1440_24fps.mp4"
                      }
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>

                  <div className="h-1/2 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {courseData?.description || "No description available."}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col flex-[3] w-full md:h-full justify-center md:justify-start mt-4 md:mt-0">
                <TableOfContents
                  progress={"70%"}
                  enrolled={true}
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

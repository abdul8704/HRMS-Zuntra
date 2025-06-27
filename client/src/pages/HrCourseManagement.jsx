import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import { CourseCard } from "../components/coursemanagement/CourseCard";
import { CreateCourse } from "../components/courseManagement/CreateCourse";
import AddCourse from "../components/coursemanagement/AddCourse";
import Module from "../components/coursemanagement/Module";
import SubModule from "../components/coursemanagement/SubModule";
import AssignmentModule from "../components/coursemanagement/AssignmentModule";
import api from '../api/axios';

// const courseList = [
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "Introduction to Git & GitHub",
//     instructor: "Mr. Jai Atithya A",
//     duration: "In 2 months",
//     badgeColor: "#FFD9D9",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "MongoDB - Advanced",
//     instructor: "Mr. Abdul Aziz M A",
//     duration: "at your own pace",
//     badgeColor: "#C7F3D0",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "Introduction to Data Science",
//     instructor: "Ms. Harini S",
//     duration: "in 3 months",
//     badgeColor: "#FFEFB2",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "A Complete Guide to your DL",
//     instructor: "Mr. Joseph Daniel H",
//     duration: "In 2 months",
//     badgeColor: "#FFD9D9",
//     rating: 3.5,
//   },
// //   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "Introduction to Git & GitHub",
//     instructor: "Mr. Jai Atithya A",
//     duration: "In 2 months",
//     badgeColor: "#FFD9D9",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "MongoDB - Advanced",
//     instructor: "Mr. Abdul Aziz M A",
//     duration: "at your own pace",
//     badgeColor: "#C7F3D0",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "Introduction to Data Science",
//     instructor: "Ms. Harini S",
//     duration: "in 3 months",
//     badgeColor: "#FFEFB2",
//     rating: 3.5,
//   },
//   {
//     image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
//     title: "A Complete Guide to your DL",
//     instructor: "Mr. Joseph Daniel H",
//     duration: "In 2 months",
//     badgeColor: "#FFD9D9",
//     rating: 3.5,
//   },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "MongoDB - Advanced",
    instructor: "Mr. Abdul Aziz M A",
    duration: "at your own pace",
    badgeColor: "#C7F3D0",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "Introduction to Data Science",
    instructor: "Ms. Harini S",
    duration: "in 3 months",
    badgeColor: "#FFEFB2",
    rating: 3.5,
  },
  {
    image: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png",
    title: "A Complete Guide to your DL",
    instructor: "Mr. Joseph Daniel H",
    duration: "In 2 months",
    badgeColor: "#FFD9D9",
    rating: 3.5,
  },

// ];

export const HrCourseManagement = () => {
  const { navId } = useParams();
  const [courseList, setcourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
  const fetchCourses = async () => {
    try {
      const res = await api.get(`/api/course`);
      if (res.data.success) {
        setcourseList(Array.isArray(res.data.data) ? res.data.data : []);
      } else {
        setApiMessage(res.data?.message || "Something went wrong."); // Fix here
        setcourseList([]);
      }
    } catch (error) {
      setApiMessage(error?.response?.data?.message || "Error fetching projects."); // Fix here
      setcourseList([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCourses();
}, []);
console.log(courseList)

  const [courseInfo, setCourseInfo] = useState({
    courseName: "",
    instructor: "",
    courseId: "",
    courseDescription: "",
    introVideoUrl: "",
    tags: "",
  });

  const [modules, setModules] = useState([
    {
      moduleTitle: "",
      subModules: [
        {
          submoduleTitle: "",
          videoUrl: "",
          description: "",
          assignment: [],
        },
      ],
    },
  ]);

  const [errorFields, setErrorFields] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleModuleTitleChange = (moduleIndex, newTitle) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].moduleTitle = newTitle;
    setModules(updatedModules);
  };

  const handleSubModuleChange = (moduleIndex, subIndex, updatedSubModule) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules[subIndex] = updatedSubModule;
    setModules(updatedModules);
  };

  const handleAssignmentChange = (moduleIndex, subIndex, updatedAssignment) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules[subIndex].assignment = updatedAssignment;
    setModules(updatedModules);
  };

  const handleDeleteSubModule = (moduleIndex, subIndex) => {
    const subModules = modules[moduleIndex].subModules;
    if (subModules.length === 1) return;

    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules = subModules.filter((_, idx) => idx !== subIndex);
    setModules(updatedModules);
  };

  const handleDeleteModule = (moduleIndex) => {
    if (modules.length === 1) return;
    const updatedModules = [...modules];
    updatedModules.splice(moduleIndex, 1);
    setModules(updatedModules);
  };

  const isSubModuleValid = (subModule) =>
    subModule.submoduleTitle && subModule.videoUrl && subModule.description;

  const isModuleValid = (module) =>
    module.moduleTitle &&
    module.subModules.length > 0 &&
    isSubModuleValid(module.subModules.at(-1));

  const handleAddSubModule = (moduleIndex) => {
    const lastSub = modules[moduleIndex].subModules.at(-1);
    if (!isSubModuleValid(lastSub)) {
      alert("Please complete all SubModule fields before adding another.");
      return;
    }
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules.push({
      submoduleTitle: "",
      videoUrl: "",
      description: "",
      assignment: [],
    });
    setModules(updatedModules);
  };

  const handleAddModule = () => {
    const lastModule = modules.at(-1);
    if (!isModuleValid(lastModule)) {
      alert("Complete all Module and SubModule fields before adding another module.");
      return;
    }
    setModules([
      ...modules,
      {
        moduleTitle: "",
        subModules: [
          {
            submoduleTitle: "",
            videoUrl: "",
            description: "",
            assignment: [],
          },
        ],
      },
    ]);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    let errors = [];

    for (const key in courseInfo) {
      if (!courseInfo[key]) errors.push(key);
    }

    modules.forEach((mod, modIndex) => {
      if (!mod.moduleTitle) errors.push(`module-${modIndex}`);
      mod.subModules.forEach((sub, subIndex) => {
        if (!sub.submoduleTitle) errors.push(`submoduleTitle-${modIndex}-${subIndex}`);
        if (!sub.videoUrl) errors.push(`videoUrl-${modIndex}-${subIndex}`);
        if (!sub.description) errors.push(`description-${modIndex}-${subIndex}`);
      });
    });

    setErrorFields(errors);
    if (errors.length > 0) {
      alert("Please fill all required fields!");
      return;
    }

    alert("✅ Course Submitted!");
    console.log({ courseInfo, modules });
  };

  const isError = (fieldId) => submitted && errorFields.includes(fieldId);

  return (
    <div className="website-container" style={{ display: "flex", height: "100vh", overflow: "hidden", position: "relative" }}>
      <Sidebar />
      <div className="website-module" style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <CourseNavbar />

        {navId === "all" && (
          <div className="scrollable-content">
            <div className="card-flex">
              {courseList.map((course, index) => (
                <CourseCard key={index} {...course} />
              ))}
            </div>
          </div>
        )}

        {navId === "create" && <CreateCourse />}

        {navId === "add" && (
          <div className="flex flex-col items-center px-4 py-4 space-y-6 max-w-5xl mx-auto overflow-y-auto">
            <AddCourse courseData={courseInfo} onChange={setCourseInfo} errors={errorFields} submitted={submitted} />

            {modules.map((mod, modIndex) => (
              <div key={modIndex} className="w-full space-y-4">
                <Module
                  moduleTitle={mod.moduleTitle}
                  onChange={(val) => handleModuleTitleChange(modIndex, val)}
                  isError={isError(`module-${modIndex}`)}
                  moduleNumber={modIndex + 1}
                  onDelete={() => handleDeleteModule(modIndex)}
                />
                {mod.subModules.map((sub, subIndex) => (
                  <div key={subIndex} className="space-y-2">
                    <SubModule
                      index={subIndex}
                      modIndex={modIndex}
                      subModule={sub}
                      onChange={(i, updated) => handleSubModuleChange(modIndex, subIndex, updated)}
                      onDelete={() => handleDeleteSubModule(modIndex, subIndex)}
                      errors={errorFields}
                      submitted={submitted}
                    />
                    <AssignmentModule
                      subModuleIndex={subIndex + 1}
                      initialQuestions={sub.assignment}
                      onAssignmentChange={(assignment) => handleAssignmentChange(modIndex, subIndex, assignment)}
                    />
                  </div>
                ))}
                <div className="flex gap-4 mt-2">
                  <button
                    onClick={() => handleAddSubModule(modIndex)}
                    className="bg-gray-300 text-white px-6 py-2 rounded hover:bg-blue-700"
                  >
                    Add Sub Module
                  </button>
                  {modIndex === modules.length - 1 && (
                    <button
                      onClick={handleAddModule}
                      className="bg-gray-300 text-white px-6 py-2 rounded hover:bg-green-700"
                    >
                      Add Module
                    </button>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={handleSubmit}
              className="bg-gray-500 text-white mt-6 px-8 py-3 rounded hover:bg-gray-600"
            >
              Submit Course
            </button>
          </div>
        )}
      </div>

      <style>
        {`
          .scrollable-content {
            flex-grow: 1;
            overflow-y: auto;
            margin-top: 1.5rem;
          }

          .card-flex {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1.5rem;
            box-sizing: border-box;
            padding: 1rem;
          }

          @media (max-width: 768px) {
            .card-flex {
              justify-content: center;
            }
          }

          @media (max-width: 480px) {
            .card-flex {
              flex-direction: column;
              align-items: center;
              padding: 1rem 0.5rem;
            }
          }
        `}
      </style>
    </div>
  );
};

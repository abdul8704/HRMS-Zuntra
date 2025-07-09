import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { CourseCard } from "../components/coursemanagement/CourseCard";
import AddCourse from "../components/coursemanagement/AddCourse";
import Module from "../components/coursemanagement/Module";
import SubModule from "../components/coursemanagement/SubModule";
import AssignmentModule from "../components/coursemanagement/AssignmentModule";
import { Navbar } from "../components/Navbar";
import { Loading } from "../components/Loading";
import api from "../api/axios";


export const CourseManagement = () => {
  const { navId } = useParams();
  const navigate = useNavigate();

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

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [apiMessage, setApiMessage] = useState("");

   useEffect(() => {
    const validTabs = ["all", "create", "add"];
    if (!validTabs.includes(navId)) {
      navigate("/404");
      return;
    }
  
    if (navId === "create" || navId=== "add") return;
  
    const fetchCourses = async () => {
      setLoading(true);
      setApiMessage("");
  
      try {
        const res = await api.get(`/api/course/`);
        console.log(res);
        if (res.data.success) {
          setCourses(Array.isArray(res.data.data) ? res.data.data : []);
        } else {
          setApiMessage(res.data.message || "Something went wrong.");
          setCourses([]);
        }
      } catch (error) {
        setApiMessage("Error fetching projects.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCourses();
  
  }, [navId, navigate]);

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
  console.log(loading);
  const isError = (fieldId) => submitted && errorFields.includes(fieldId);

  return (
    <div className="flex h-screen overflow-hidden relative">
      <Sidebar />
      <div className="flex flex-col flex-grow p-[1rem] gap-[1rem]">
        <Navbar type="courseManagement" showFilter={true} />
        { loading && (<Loading/>) }
        {!loading && navId === "all" && (
          <div className="flex-grow overflow-y-auto">
            <div className="flex flex-wrap justify-center gap-[1rem] px-[1rem]">
              {courses.map((course, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/course/${index}/intro`)}
                  className="cursor-pointer"
                  style={{ display: "contents" }} // ensures no layout shift
                >
                  <CourseCard key={index} {...course} />
                </div>
              ))}
            </div>
          </div>
        )}

        {navId === "create" && (
          <div className="h-[calc(100vh-80px)] flex flex-col justify-center items-center text-center p-8">
            <h1 className="text-2xl font-semibold mb-8">Record with Loom</h1>

            <button className="bg-[#A6C4BA] hover:bg-[#BBD3CC] text-white font-bold text-base h-12 w-72 rounded-full flex items-center justify-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 40 40">
                <path fill="#625DF5" d="M40 17.776H28.303l10.13-5.849-2.224-3.854-10.13 5.849 5.847-10.13-3.854-2.225-5.847 10.129V0h-4.45v11.697l-5.85-10.13-3.852 2.225 5.848 10.129-10.13-5.848-2.224 3.853 10.13 5.849H0v4.45h11.695L1.567 28.072l2.224 3.854 10.13-5.848-5.85 10.13 3.855 2.224 5.848-10.13V40h4.45V28.304l5.847 10.13 3.854-2.225-5.849-10.13 10.13 5.848 2.225-3.854-10.129-5.848h11.696v-4.45H40ZM20 26.05a6.074 6.074 0 1 1 0-12.148 6.074 6.074 0 1 1 0 12.148Z" />
              </svg>
              Go to Loom Website
            </button>

            <button className="bg-[#A6C4BA] hover:bg-[#BBD3CC] text-white font-bold text-base h-12 w-72 rounded-full flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M352-120H200q-33 0-56.5-23.5T120-200v-152q48 0 84-30.5t36-77.5q0-47-36-77.5T120-568v-152q0-33 23.5-56.5T200-800h160q0-42 29-71t71-29q42 0 71 29t29 71h160q33 0 56.5 23.5T800-720v160q42 0 71 29t29 71q0 42-29 71t-71 29v160q0 33-23.5 56.5T720-120H568q0-50-31.5-85T460-240q-45 0-76.5 35T352-120Zm-152-80h85q24-66 77-93t98-27q45 0 98 27t77 93h85v-240h80q8 0 14-6t6-14q0-8-6-14t-14-6h-80v-240H480v-80q0-8-6-14t-14-6q-8 0-14 6t-6 14v80H200v88q54 20 87 67t33 105q0 57-33 104t-87 68v88Zm260-260Z" />
              </svg>
              Install Loom Extension
            </button>
          </div>
        )}

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
    </div>
  );
};

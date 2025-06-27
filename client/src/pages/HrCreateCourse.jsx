// HrCreateCourse.jsx
import React, { useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { CourseNavbar } from "../components/coursemanagement/CourseNavbar";
import AddCourse from "../components/coursemanagement/AddCourse";
import Module from "../components/coursemanagement/Module";
import SubModule from "../components/coursemanagement/SubModule";
import AssignmentModule from "../components/coursemanagement/AssignmentModule";

const HrCreateCourse = () => {
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
    const updatedModules = [...modules];
    updatedModules[moduleIndex].subModules.splice(subIndex, 1);
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
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow bg-[#D6D6D6] overflow-y-auto">
        <div className="px-4 py-2">
          <CourseNavbar />
        </div>
        <div className="flex flex-col items-center px-4 py-4 space-y-6 max-w-5xl mx-auto">
          <AddCourse courseData={courseInfo} onChange={setCourseInfo} errors={errorFields} submitted={submitted} />
          {modules.map((mod, modIndex) => (
            <div key={modIndex} className="w-full space-y-4">
              <Module
                moduleTitle={mod.moduleTitle}
                onChange={(val) => handleModuleTitleChange(modIndex, val)}
                isError={isError(`module-${modIndex}`)}
                moduleNumber={modIndex + 1}
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
                    onAssignmentChange={(assignment) =>
                      handleAssignmentChange(modIndex, subIndex, assignment)
                    }
                  />
                </div>
              ))}
              <div className="flex gap-4 mt-2">
                <button
                  onClick={() => handleAddSubModule(modIndex)}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                >
                  Add Sub Module
                </button>
                {modIndex === modules.length - 1 && (
                  <button
                    onClick={handleAddModule}
                    className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
                  >
                    Add Module
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            onClick={handleSubmit}
            className="bg-purple-700 text-white mt-6 px-8 py-3 rounded hover:bg-purple-800"
          >
            Submit Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default HrCreateCourse;

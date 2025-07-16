import React, { useState } from "react";

const SingleDropdownCourseForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const [course, setCourse] = useState({
    courseName: "",
    instructor: "",
    introVideoUrl: "",
    courseDescription: "",
  });

  const [modules, setModules] = useState([
    {
      moduleTitle: "",
      subModules: [],
    },
  ]);

  const [uploadedIntroVideoName, setUploadedIntroVideoName] = useState("");
  const [introVideoError, setIntroVideoError] = useState("");

  const toggleDropdown = () => setIsOpen(!isOpen);
  const isError = (field) => submitted && errors.includes(field);

  const handleCourseChange = (field, value) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const handleIntroVideoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.type.startsWith("video/")) {
      setIntroVideoError("");
      setUploadedIntroVideoName(file.name);
      setCourse((prev) => ({ ...prev, introVideoUrl: URL.createObjectURL(file) }));
    } else {
      setIntroVideoError("Please upload a valid video file.");
      setUploadedIntroVideoName("");
      setCourse((prev) => ({ ...prev, introVideoUrl: "" }));
    }
  };

  const handleModuleChange = (index, value) => {
    const updated = [...modules];
    updated[index].moduleTitle = value;
    setModules(updated);
  };

  const handleSubModuleChange = (modIdx, subIdx, field, value) => {
    const updated = [...modules];
    updated[modIdx].subModules[subIdx][field] = value;
    setModules(updated);
  };

  const handleSubVideoUpload = (modIdx, subIdx, file) => {
    setModules((prev) => {
      const updated = [...prev];
      const sub = updated[modIdx].subModules[subIdx];
      if (file && file.type.startsWith("video/")) {
        sub.videoUrl = URL.createObjectURL(file);
        sub.uploadedVideoName = file.name;
        sub.videoError = "";
      } else {
        sub.videoUrl = "";
        sub.uploadedVideoName = "";
        sub.videoError = "Please upload a valid video file.";
      }
      return updated;
    });
  };

  const handleAddModule = () => {
    setModules((prev) => [
      ...prev,
      {
        moduleTitle: "",
        subModules: [],
      },
    ]);
  };

  const handleAddSubModule = () => {
    if (modules.length === 0) return;

    setModules((prev) => {
      const updated = [...prev];
      const lastModule = updated[updated.length - 1];

      // ✅ Only add one submodule if none exist yet
      if (lastModule.subModules.length === 0) {
        lastModule.subModules.push({
          submoduleTitle: "",
          videoUrl: "",
          description: "",
          uploadedVideoName: "",
          videoError: "",
        });
      }

      return updated;
    });
  };

  const validateForm = () => {
    const errorFields = [];

    if (!course.courseName) errorFields.push("courseName");
    if (!course.instructor) errorFields.push("instructor");
    if (!course.introVideoUrl) errorFields.push("introVideoUrl");
    if (!course.courseDescription) errorFields.push("courseDescription");

    modules.forEach((mod, modIdx) => {
      if (!mod.moduleTitle) errorFields.push(`moduleTitle-${modIdx}`);
      mod.subModules.forEach((sub, subIdx) => {
        if (!sub.submoduleTitle) errorFields.push(`submoduleTitle-${modIdx}-${subIdx}`);
        if (!sub.videoUrl) errorFields.push(`videoUrl-${modIdx}-${subIdx}`);
        if (!sub.description) errorFields.push(`description-${modIdx}-${subIdx}`);
      });
    });

    setErrors(errorFields);
    return errorFields.length === 0;
  };

  const handleSubmit = () => {
    setSubmitted(true);
    if (validateForm()) {
      alert("✅ Form submitted successfully!");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <button
        onClick={toggleDropdown}
        className="w-full text-left px-4 py-3 bg-blue-600 text-white font-bold rounded-md shadow-md"
      >
        {isOpen ? "▾" : "▸"} Course, Module & SubModule Form
      </button>

      {isOpen && (
        <div className="mt-4 p-6 bg-white rounded-md shadow border space-y-6">
          {/* Course Details */}
          <div>
            <h2 className="text-lg font-semibold mb-2 text-cyan-700">Course Introduction</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Course Name"
                value={course.courseName}
                onChange={(e) => handleCourseChange("courseName", e.target.value)}
                className={`p-3 bg-gray-100 rounded ${isError("courseName") ? "border-2 border-red-500" : ""}`}
              />
              <input
                type="text"
                placeholder="Instructor"
                value={course.instructor}
                onChange={(e) => handleCourseChange("instructor", e.target.value)}
                className={`p-3 bg-gray-100 rounded ${isError("instructor") ? "border-2 border-red-500" : ""}`}
              />
              <div className={`p-2 bg-gray-100 rounded border ${isError("introVideoUrl") ? "border-red-500" : "border-gray-300"}`}>
                <label className="block text-sm font-medium mb-1">Upload Intro Video</label>
                <input type="file" accept="video/*" onChange={handleIntroVideoUpload} />
                {introVideoError && <p className="text-red-500 text-xs">{introVideoError}</p>}
                {uploadedIntroVideoName && (
                  <p className="text-green-600 text-xs truncate">Uploaded: {uploadedIntroVideoName}</p>
                )}
              </div>
            </div>
            <textarea
              placeholder="Course Description"
              value={course.courseDescription}
              onChange={(e) => handleCourseChange("courseDescription", e.target.value)}
              className={`w-full p-3 bg-gray-100 rounded resize-none ${
                isError("courseDescription") ? "border-2 border-red-500" : ""
              }`}
              rows={3}
            />
          </div>

          {/* Modules and SubModules */}
          {modules.map((mod, modIdx) => (
            <div key={modIdx} className="space-y-4 border-t pt-4">
              <h3 className="text-md font-bold text-cyan-600">Module {modIdx + 1}</h3>
              <input
                type="text"
                placeholder="Module Title"
                value={mod.moduleTitle}
                onChange={(e) => handleModuleChange(modIdx, e.target.value)}
                className={`w-full p-3 bg-gray-100 rounded ${
                  isError(`moduleTitle-${modIdx}`) ? "border-2 border-red-500" : "border"
                }`}
              />

              {mod.subModules.map((sub, subIdx) => (
                <div key={subIdx} className="bg-gray-50 p-4 rounded shadow">
                  <h4 className="font-semibold text-gray-700 mb-2">Sub Module {subIdx + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="Sub Module Title"
                      value={sub.submoduleTitle}
                      onChange={(e) =>
                        handleSubModuleChange(modIdx, subIdx, "submoduleTitle", e.target.value)
                      }
                      className={`p-3 bg-white rounded ${
                        isError(`submoduleTitle-${modIdx}-${subIdx}`) ? "border-2 border-red-500" : "border"
                      }`}
                    />
                    <div
                      className={`p-2 bg-white rounded border ${
                        isError(`videoUrl-${modIdx}-${subIdx}`) ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <label className="block text-sm font-medium mb-1">Upload Video</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                          handleSubVideoUpload(modIdx, subIdx, e.target.files[0])
                        }
                      />
                      {sub.videoError && (
                        <p className="text-red-500 text-xs">{sub.videoError}</p>
                      )}
                      {sub.uploadedVideoName && (
                        <p className="text-green-600 text-xs truncate">Uploaded: {sub.uploadedVideoName}</p>
                      )}
                    </div>
                  </div>
                  <textarea
                    placeholder="Description"
                    value={sub.description}
                    onChange={(e) =>
                      handleSubModuleChange(modIdx, subIdx, "description", e.target.value)
                    }
                    className={`w-full p-3 bg-white rounded resize-none ${
                      isError(`description-${modIdx}-${subIdx}`) ? "border-2 border-red-500" : "border"
                    }`}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          ))}

          {/* Add Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleAddModule}
              className="bg-gray-500 text-white px-6 py-2 rounded w-48 hover:bg-gray-600"
            >
              Add Module
            </button>
            <button
              onClick={handleAddSubModule}
              className="bg-gray-500 text-white px-6 py-2 rounded w-48 hover:bg-gray-600"
            >
              Add Sub Module
            </button>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-md shadow"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default SingleDropdownCourseForm;

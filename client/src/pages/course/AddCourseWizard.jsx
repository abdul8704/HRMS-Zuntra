import React, { useState } from "react";

const AddCourseForm = () => {
  const [formData, setFormData] = useState({
    courseName: "",
    instructorName: "",
    description: "",
    category: "",
    level: "",
    duration: "",
    price: "",
    thumbnail: null,
    introVideo: null,
    language: "",
    tags: "",
    modules: [{ title: "", video: null, submodules: [{ title: "", video: null }] }],
    tasks: [{ question: "", answer: "" }],
    assessments: [{ question: "", answer: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, path) => {
    const { files } = e.target;
    const updated = { ...formData };
    let ref = updated;
    for (let i = 0; i < path.length - 1; i++) {
      ref = ref[path[i]];
    }
    ref[path[path.length - 1]] = files[0];
    setFormData(updated);
  };

  const addModule = () => {
    setFormData({
      ...formData,
      modules: [...formData.modules, { title: "", video: null, submodules: [{ title: "", video: null }] }],
    });
  };

  const addSubmodule = (moduleIndex) => {
    const updated = [...formData.modules];
    updated[moduleIndex].submodules.push({ title: "", video: null });
    setFormData({ ...formData, modules: updated });
  };

  const addTask = () => {
    setFormData({ ...formData, tasks: [...formData.tasks, { question: "", answer: "" }] });
  };

  const addAssessment = () => {
    setFormData({ ...formData, assessments: [...formData.assessments, { question: "", answer: "" }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course Data Submitted:", formData);
    alert("Course added successfully!");
  };

  const UploadBox = ({ id, label, onChange }) => (
    <div>
      <label className="block mb-1 font-medium">{label}</label>
      <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
        <input
          type="file"
          id={id}
          accept="video/*"
          onChange={onChange}
          className="hidden"
        />
        <label htmlFor={id} className="cursor-pointer text-gray-500">
          Drag & drop or click to upload video
        </label>
      </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl flex flex-col max-h-[90vh]">
        <h2 className="text-2xl font-bold text-center p-4 border-b">
          Add New Course
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-6 space-y-6"
        >
          {/* Course Name */}
          <div>
            <label className="block mb-1 font-medium">Course Name *</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Instructor */}
          <div>
            <label className="block mb-1 font-medium">Instructor Name *</label>
            <input
              type="text"
              name="instructorName"
              value={formData.instructorName}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 font-medium">Course Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border rounded-lg p-2"
              rows="3"
            />
          </div>

          {/* Category & Level */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select Category</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Business">Business</option>
                <option value="Design">Design</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Course Level *</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Intro Video */}
          <UploadBox
            id="introVideo"
            label="Introductory Video *"
            onChange={(e) => handleFileChange(e, ["introVideo"])}
          />

          {/* Modules */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Course Modules</h3>
            {formData.modules.map((module, mIndex) => (
              <div key={mIndex} className="border p-4 rounded-lg mb-4 space-y-3">
                <input
                  type="text"
                  placeholder="Module Title"
                  value={module.title}
                  onChange={(e) => {
                    const updated = [...formData.modules];
                    updated[mIndex].title = e.target.value;
                    setFormData({ ...formData, modules: updated });
                  }}
                  className="w-full border rounded-lg p-2 mb-2"
                />
                <UploadBox
                  id={`module-${mIndex}-video`}
                  label="Module Video"
                  onChange={(e) =>
                    handleFileChange(e, ["modules", mIndex, "video"])
                  }
                />
                <h4 className="font-medium">Submodules</h4>
                {module.submodules.map((sub, sIndex) => (
                  <div key={sIndex} className="pl-4 border-l space-y-2 mb-2">
                    <input
                      type="text"
                      placeholder="Submodule Title"
                      value={sub.title}
                      onChange={(e) => {
                        const updated = [...formData.modules];
                        updated[mIndex].submodules[sIndex].title =
                          e.target.value;
                        setFormData({ ...formData, modules: updated });
                      }}
                      className="w-full border rounded-lg p-2"
                    />
                    <UploadBox
                      id={`submodule-${mIndex}-${sIndex}-video`}
                      label="Submodule Video"
                      onChange={(e) =>
                        handleFileChange(e, [
                          "modules",
                          mIndex,
                          "submodules",
                          sIndex,
                          "video",
                        ])
                      }
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addSubmodule(mIndex)}
                  className="text-sm font-medium"
                  style={{ color: "#BBD3CC" }}
                >
                  + Add Submodule
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addModule}
              className="text-sm font-medium"
              style={{ color: "#BBD3CC" }}
            >
              + Add Module
            </button>
          </div>

          {/* Tasks */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Tasks</h3>
            {formData.tasks.map((task, tIndex) => (
              <div key={tIndex} className="space-y-2 border p-3 rounded-lg mb-2">
                <input
                  type="text"
                  placeholder="Task Question"
                  value={task.question}
                  onChange={(e) => {
                    const updated = [...formData.tasks];
                    updated[tIndex].question = e.target.value;
                    setFormData({ ...formData, tasks: updated });
                  }}
                  className="w-full border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={task.answer}
                  onChange={(e) => {
                    const updated = [...formData.tasks];
                    updated[tIndex].answer = e.target.value;
                    setFormData({ ...formData, tasks: updated });
                  }}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addTask}
              className="text-sm font-medium"
              style={{ color: "#BBD3CC" }}
            >
              + Add Task
            </button>
          </div>

          {/* Final Assessment */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Final Assessment</h3>
            {formData.assessments.map((assess, aIndex) => (
              <div
                key={aIndex}
                className="space-y-2 border p-3 rounded-lg mb-2"
              >
                <input
                  type="text"
                  placeholder="Assessment Question"
                  value={assess.question}
                  onChange={(e) => {
                    const updated = [...formData.assessments];
                    updated[aIndex].question = e.target.value;
                    setFormData({ ...formData, assessments: updated });
                  }}
                  className="w-full border rounded-lg p-2"
                />
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={assess.answer}
                  onChange={(e) => {
                    const updated = [...formData.assessments];
                    updated[aIndex].answer = e.target.value;
                    setFormData({ ...formData, assessments: updated });
                  }}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAssessment}
              className="text-sm font-medium"
              style={{ color: "#BBD3CC" }}
            >
              + Add Assessment Question
            </button>
          </div>
        </form>

        {/* Sticky Footer */}
        <div className="p-4 border-t bg-white sticky bottom-0">
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full font-semibold py-2 rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#BBD3CC", color: "black" }}
          >
            Add Course
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCourseForm;

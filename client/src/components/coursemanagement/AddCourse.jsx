import React, { useEffect, useState } from "react";

const AddCourse = ({ courseData, onChange, errors, submitted }) => {
  const [course, setCourse] = useState(courseData);

  useEffect(() => {
    onChange(course);
  }, [course]);

  const handleChange = (field, value) => {
    setCourse((prev) => ({ ...prev, [field]: value }));
  };

  const isError = (field) => submitted && errors.includes(field);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-5xl">
      <h2 className="text-lg font-semibold border-l-4 border-cyan-500 pl-3 mb-6">
        Course Introduction
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="text"
          value={course.courseName}
          onChange={(e) => handleChange("courseName", e.target.value)}
          placeholder="Course Name"
          className={`p-3 bg-gray-100 rounded ${isError("courseName") ? "border-2 border-red-500" : ""}`}
        />
        <input
          type="text"
          value={course.instructor}
          onChange={(e) => handleChange("instructor", e.target.value)}
          placeholder="Instructor Name"
          className={`p-3 bg-gray-100 rounded ${isError("instructor") ? "border-2 border-red-500" : ""}`}
        />
        <input
          type="text"
          value={course.courseId}
          onChange={(e) => handleChange("courseId", e.target.value)}
          placeholder="Course ID"
          className={`p-3 bg-gray-100 rounded ${isError("courseId") ? "border-2 border-red-500" : ""}`}
        />
      </div>
      <textarea
        value={course.courseDescription}
        onChange={(e) => handleChange("courseDescription", e.target.value)}
        placeholder="Course Description"
        className={`w-full mb-4 p-3 bg-gray-100 rounded resize-none ${isError("courseDescription") ? "border-2 border-red-500" : ""}`}
        rows={3}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={course.introVideoUrl}
          onChange={(e) => handleChange("introVideoUrl", e.target.value)}
          placeholder="Intro Video URL"
          className={`p-3 bg-gray-100 rounded ${isError("introVideoUrl") ? "border-2 border-red-500" : ""}`}
        />
        <input
          type="text"
          value={course.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
          placeholder="Tags (comma-separated)"
          className={`p-3 bg-gray-100 rounded ${isError("tags") ? "border-2 border-red-500" : ""}`}
        />
      </div>
    </div>
  );
};

export default AddCourse;

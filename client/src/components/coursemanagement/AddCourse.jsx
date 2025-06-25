import React from "react";

const AddCourse = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-5xl">
      <h2 className="text-lg font-semibold border-l-4 border-cyan-500 pl-3 mb-6">
        Course Introduction
      </h2>

      {/* Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input type="text" placeholder="Course Name" className="p-3 bg-gray-100 rounded" />
        <input type="text" placeholder="Instructor Name" className="p-3 bg-gray-100 rounded" />
        <input type="text" placeholder="Course ID" className="p-3 bg-gray-100 rounded" />
      </div>

      {/* Description */}
      <div className="mb-4">
        <textarea
          placeholder="Course Description"
          className="w-full p-3 bg-gray-100 rounded resize-none"
          rows={3}
        />
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input type="text" placeholder="Video URL" className="p-3 bg-gray-100 rounded" />
        <input type="text" placeholder="Tags" className="p-3 bg-gray-100 rounded" />
      </div>
    </div>
  );
};

export default AddCourse;


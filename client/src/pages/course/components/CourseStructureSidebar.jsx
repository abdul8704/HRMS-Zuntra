import React from "react";

const CourseStructureSidebar = ({ courseInfo, modules }) => {
  return (
    <div className="w-64 bg-gray-100 border-r p-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Course Outline</h2>
      
      {/* Course Introduction Section */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Introduction</h3>
        <p className="text-sm text-gray-700">
          {courseInfo.courseName || "No course name provided"}
        </p>
        {courseInfo.instructor && (
          <p className="text-sm text-gray-600">
            Instructor: {courseInfo.instructor}
          </p>
        )}
      </div>
      
      {/* Modules and Submodules */}
      <div>
        <h3 className="text-xl font-semibold">Modules</h3>
        {modules.length === 0 ? (
          <p className="text-sm text-gray-600">No modules added yet.</p>
        ) : (
          <ul className="space-y-2">
            {modules.map((module, modIndex) => (
              <li key={modIndex} className="border p-2 rounded">
                <p className="font-semibold">
                  {module.moduleTitle || `Module ${modIndex + 1}`}
                </p>
                {module.subModules && module.subModules.length > 0 && (
                  <ul className="ml-4 mt-1 list-disc">
                    {module.subModules.map((subModule, subIndex) => (
                      <li key={subIndex} className="text-sm">
                        {subModule.submoduleTitle || `Sub Module ${subIndex + 1}`}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CourseStructureSidebar;

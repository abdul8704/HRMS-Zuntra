import React from "react";

export const TableOfContents = ({ progress = "40%", enrolled, progressMatrix = [] }) => {
  const modules = [
    {
      title: "Module 1 Name",
      submodules: ["Sub Module 1", "Sub Module 2", "Sub Module 3", "Sub Module 4"]
    },
    {
      title: "Module 2",
      submodules: ["Sub Module 1", "Sub Module 2", "Sub Module 3", "Sub Module 4"]
    },
    {
      title: "Module 3",
      submodules: ["Sub Module 1", "Sub Module 2", "Sub Module 3", "Sub Module 4"]
    }
  ];

  const isModuleCompleted = (moduleIndex) => {
    const row = progressMatrix[moduleIndex];
    return Array.isArray(row) && row.length && row.every(val => val === 1);
  };

  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <div className="bg-gray-200 p-4 rounded-xl font-sans overflow-y-auto">
        <h3 className="text-xl font-bold mb-4 text-black">Table of contents</h3>
        <div>
          {modules.map((module, moduleIndex) => {
            const completed = isModuleCompleted(moduleIndex);

            return (
              <div className="mb-5" key={moduleIndex}>
                <div className="flex items-center gap-2 text-base font-bold text-black">
                  <span
                    className={`w-1 h-6 rounded ${
                      completed ? "bg-[#00cfd1]" : "bg-gray-400"
                    }`}
                  />
                  <span>{module.title}</span>
                </div>
                <ul className="list-none pl-5 mt-1.5">
  {module.submodules.map((sub, subIndex) => (
    <li
      key={subIndex}
      className="text-sm text-black my-1.5 flex items-center gap-2"
    >
      <span
        className={`font-bold ${
          progressMatrix[moduleIndex]?.[subIndex] === 1
            ? "text-[#00cfd1]"
            : "text-gray-400"
        }`}
      >
        |
      </span>
      <span>{sub}</span>
    </li>
  ))}
</ul>

              </div>
            );
          })}
        </div>
      </div>

      {enrolled ? (
        <button
          className="w-full max-w-full text-center text-black font-bold text-lg py-3.5 px-6 rounded-xl cursor-pointer"
          style={{
            background: `linear-gradient(to right, #bbd3cc ${progress}, #e5e5e5 30%)`,
          }}
        >
          Continue Learning
        </button>
      ) : (
        <button className="w-full max-w-full text-center text-black font-bold text-lg py-3.5 px-6 rounded-xl bg-gray-200 cursor-pointer">
          Enroll Now
        </button>
      )}
    </div>
  );
};

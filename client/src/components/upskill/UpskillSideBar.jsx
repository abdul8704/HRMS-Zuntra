import React, { useState } from "react";
import zuntraLogo from "../../assets/zuntra.png";
import { Menu, X } from "lucide-react";

export const UpskillSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modules = [
    {
      title: "Module 1 Name",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name"],
    },
    {
      title: "Module 2",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name"],
    },
    {
      title: "Module 3",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"],
    },
    {
      title: "Module 4",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"],
    },
    {
      title: "Module 5",
      submodules: ["Sub Module 1 Name", "Sub Module 2 Name", "Sub Module 3 Name", "Sub Module 4 Name", "Sub Module 5 Name"],
    },
  ];

  // ✅ Define progressMatrix (1 = completed, 0 = not completed)
  const progressMatrix = [
    [1, 1, 1, 1],     // Module 1: complete
    [1, 0, 1],        // Module 2: not complete
    [1, 1, 1, 1, 1],  // Module 3: complete
    [0, 0, 0, 0, 0],  // Module 4: not complete
    [1, 1, 0, 1, 1],  // Module 5: not complete
  ];

  // ✅ Check if all submodules are completed
  const isModuleComplete = (moduleIndex) =>
    progressMatrix[moduleIndex]?.length &&
    progressMatrix[moduleIndex].every((val) => val === 1);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        className="fixed top-4 left-4 z-[1001] p-2 rounded-md shadow bg-white md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-[260px] bg-[#cde8e6] p-4 overflow-y-auto z-[1000] transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo Section */}
        <div className="text-center mb-4">
          <img src={zuntraLogo} alt="Logo" className="w-[130px] mx-auto mb-2" />
          <div className="flex justify-center gap-1">
            <div className="h-[5px] rounded w-[60%]" style={{ backgroundColor: "#2b9c9f" }} />
            <div className="h-[5px] rounded w-[30%]" style={{ backgroundColor: "#e8dcdc" }} />
          </div>
        </div>

        {/* Module Sections */}
        <div>
          {modules.map((module, idx) => (
            <div key={idx} className="mb-4">
              {/* Module bar based on progress */}
              <div className="flex items-center mb-1">
                <span
                  className="w-[4px] h-5 rounded-sm mr-2"
                  style={{
                    backgroundColor: isModuleComplete(idx) ? "#00cfd1" : "#8C8C8C",
                  }}
                />
                <h4 className="text-sm font-semibold m-0">{module.title}</h4>
              </div>

              {/* Submodule bars */}
              <ul className="pl-4 space-y-1">
                {module.submodules.map((sub, subIdx) => (
                  <li key={subIdx} className="text-sm flex items-center gap-2">
                    <span
                      className="w-[4px] h-[14px] rounded-sm"
                      style={{
                        backgroundColor:
                          progressMatrix[idx]?.[subIdx] === 1 ? "#00cfd1" : "#B5A6A8",
                      }}
                    />
                    {sub}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

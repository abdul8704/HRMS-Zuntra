import React, { useEffect, useRef, useState } from "react";

export function EmployeeCourseProgress() {
  const [viewType, setViewType] = useState("employee");
  const [tooltip, setTooltip] = useState({ show: false, text: "", anchorRef: null });
  const progressBarRef = useRef(null);
  const cardRef = useRef(null);
  const [fontSize, setFontSize] = useState("0.8rem");

  const employeeData = {
    name: "Jai Atithya A",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    email: "jaiatithya@zuntra.com",
    phone: "+91 1234567890",
    role: "Embedded & IoT Developer",
    progress: 40,
  };

  const courseData = {
    name: "Advanced React Development",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&h=200&fit=crop&crop=center",
    instructor: "Dr. Sarah Johnson",
    role: "React Specialist",
    progress: 65,
  };

  const currentData = viewType === "employee" ? employeeData : courseData;

  const handleMouseEnter = () => {
    setTooltip({
      show: true,
      text: `${viewType === "employee" ? "Course Progress" : "Completion"}: ${currentData.progress}%`,
      anchorRef: progressBarRef,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ show: false, text: "", anchorRef: null });
  };

  const SimpleTooltip = ({ text, show }) => {
    if (!show) return null;
    return (
      <div className="absolute z-50 bg-gray-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap -top-8 left-1/2 transform -translate-x-1/2">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
      </div>
    );
  };

  // ResizeObserver to scale font size
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        const newFontSize = `clamp(0.6rem, ${width / 40}px, 0.85rem)`;
        setFontSize(newFontSize);
      }
    });

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} style={{ fontSize }} className="h-full w-full flex flex-col gap-1">
      {/* Toggle Buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={() => setViewType("employee")}
          className={`px-2 py-[2px] rounded-md text-xs font-medium transition-colors ${
            viewType === "employee"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Employee View
        </button>
        <button
          onClick={() => setViewType("course")}
          className={`px-2 py-[2px] rounded-md text-xs font-medium transition-colors ${
            viewType === "course"
              ? "bg-teal-500 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Course View
        </button>
      </div>

      {/* Card */}
      <div className="flex flex-row bg-[#eef8f8] rounded-xl shadow-md w-full h-full overflow-hidden">
        {/* Image */}
        <div className="w-24 h-full flex-shrink-0">
          <img
            src={currentData.image}
            alt="Profile"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Info */}
        <div className="flex-1 px-3 py-2 flex flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="font-bold text-gray-800 leading-tight truncate">
              {currentData.name}
            </p>
            {viewType === "employee" ? (
              <>
                <p className="text-gray-600 text-xs truncate">{currentData.email}</p>
                <p className="text-gray-600 text-xs truncate">{currentData.phone}</p>
              </>
            ) : (
              <>
                <p className="text-gray-600 text-xs truncate">
                  Instructor: {courseData.instructor}
                </p>
                <p className="text-gray-600 text-xs truncate">Duration: 6 weeks</p>
              </>
            )}

            <span className="mt-[2px] inline-block text-xs text-teal-700 bg-teal-100 rounded-full px-2 py-[1px] w-fit">
              {currentData.role}
            </span>
          </div>

          {/* Progress bar */}
          <div className="mt-1">
            <div
              ref={progressBarRef}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="w-full h-2 bg-gray-300 rounded-full relative"
            >
              <div
                className="h-2 bg-teal-500 rounded-full absolute top-0 left-0 transition-all duration-300"
                style={{ width: `${currentData.progress}%` }}
              ></div>
              <SimpleTooltip text={tooltip.text} show={tooltip.show} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

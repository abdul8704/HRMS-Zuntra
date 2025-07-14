import React, { useState, useEffect, useRef } from "react";
//import { CourseCard } from "../../course/components/CourseCard";
// CourseCard component
const CourseCard = ({ courseImage, courseName, courseInstructor, deadline, deadlineUnits, rating = 5 }) => {
  const [isSelfPaced, setIsSelfPaced] = useState(false);
  
  useEffect(() => {
    if (deadline === 0) {
      setIsSelfPaced(true);
    }
  }, [deadline]);
  
  const badgeStyle = isSelfPaced
    ? "bg-green-100 text-green-800"
    : "bg-orange-100 text-orange-800";

  // Debug: Log the props to check if courseInstructor is being passed correctly
  console.log('CourseCard props:', { courseName, courseInstructor, deadline, deadlineUnits, rating });

  return (
    <div className="flex flex-col w-full h-full bg-gray-200 rounded-xl shadow-md overflow-hidden">
      {/* Image Container with Fixed Aspect Ratio */}
      {/* <CourseCard courseImage={"https://www.hello.jpg"} courseName={"PEACE"} courseInstructor={"JAI"} deadline={3} deadlineUnits={"Days"} rating={10} /> */}
      <div className="w-full aspect-[4/3] flex-shrink-0 overflow-hidden">
        <img
          src={courseImage}
          alt={courseName}
          className="w-full h-full object-cover bg-gray-100"
        />
      </div>
      {/* Content Container */}
      <div className="flex flex-col justify-between flex-1 p-3 min-h-0">
        {/* Title and Instructor */}
        <div className="flex flex-col mb-2 flex-1">
          <h3 className="text-sm font-semibold mb-2 leading-tight text-left text-gray-900">
            {courseName}
          </h3>
          <p className="text-xs text-gray-700 text-left font-medium px-2 py-1 rounded">
            by {courseInstructor || 'Unknown Instructor'}
          </p>
        </div>
        
        {/* Badge and Rating */}
        <div className="flex justify-between items-center gap-2 flex-shrink-0 mt-2">
          <span
            className={`rounded-xl font-medium px-2 py-1 text-xs flex-shrink-0 ${badgeStyle}`}
          >
            {deadline === 0 ? "At your own pace" : `in ${deadline} ${deadlineUnits}`}
          </span>
          <span className="flex items-center gap-1 flex-shrink-0">
            <span className="font-bold text-xs text-black">
              {rating}
            </span>
            <span className="text-base text-yellow-500">★</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Wrapper component for CourseCard to handle remove functionality
const CourseCardWrapper = ({ course, onRemove, inDropdown = false }) => {
  return (
    <div className="relative h-full">
      <CourseCard
        courseImage={course.courseImage}
        courseName={course.courseName}
        courseInstructor={course.courseInstructor}
        deadline={course.deadline}
        deadlineUnits={course.deadlineUnits}
        rating={course.rating}
      />
      {onRemove && !inDropdown && (
        <button
          onClick={onRemove}
          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md transition-colors z-10"
        >
          ×
        </button>
      )}
    </div>
  );
};

const colors = [
  "#F2F2F2", "#E8EAED", "#E6E6E6", "#D9D9D9", "#CCCCCC", "#BFBFBF",
  "#FFFFE6", "#FFFFCC", "#FFFFB3", "#FFFF99", "#FFFF00", "#E6E600",
  "#E6FFE6", "#CCFFCC", "#B3FFB3", "#99FF99", "#00FF00", "#00CC00",
  "#E6FFFF", "#CCFFFF", "#B3FFFF", "#00FFFF", "#00E6E6", "#00CCCC",
  "#E6E6FF", "#CCCCFF", "#B3B3FF", "#9999FF", "#0000FF", "#0000CC",
  "#FFE6FF", "#FFCCFF", "#FFB3FF", "#FF99FF", "#B300B3", "#990099",
  "#FFE6E6", "#FFCCCC", "#FFB3B3", "#FF9999", "#B30000", "#CC0000",
];

const predefinedCourses = [
  { id: 1, courseName: "React Fundamentals", courseInstructor: "John Doe", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 8, deadlineUnits: "weeks", rating: 4.8 },
  { id: 2, courseName: "Advanced Node.js", courseInstructor: "Jane Smith", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 12, deadlineUnits: "weeks", rating: 4.9 },
  { id: 3, courseName: "MongoDB Mastery", courseInstructor: "Kevin Li", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 6, deadlineUnits: "weeks", rating: 4.7 },
  { id: 4, courseName: "Python for Data Science", courseInstructor: "Emily Stone", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 0, deadlineUnits: "weeks", rating: 4.6 },
  { id: 5, courseName: "Machine Learning Basics", courseInstructor: "Michael Ray", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 10, deadlineUnits: "weeks", rating: 4.8 },
  { id: 6, courseName: "Fullstack with MERN", courseInstructor: "Rachel Green", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 16, deadlineUnits: "weeks", rating: 4.9 },
  { id: 7, courseName: "Cloud Computing 101", courseInstructor: "Thomas Blake", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 0, deadlineUnits: "weeks", rating: 4.5 },
  { id: 8, courseName: "Cybersecurity Essentials", courseInstructor: "Sophia Reed", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 14, deadlineUnits: "weeks", rating: 4.7 },
  { id: 9, courseName: "Kubernetes Crash Course", courseInstructor: "James Hunt", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 4, deadlineUnits: "weeks", rating: 4.6 },
  { id: 10, courseName: "Next.js Deep Dive", courseInstructor: "Lily Carter", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 0, deadlineUnits: "weeks", rating: 4.8 }
];

export default function AddRole({ 
  type = "add", // "edit" or "add"
  rolename = "", 
  rolecolor = "#f5f5f5",
  rolesalary = "",
  rolecourses = [],
  rolepermissions = {
    projectManagement: false,
    employeeManagement: false,
    courseManagement: false,
    attendance: false
  },
  onClose = () => console.log("Close modal"),
  onSave = (data) => console.log("Save data:", data)
}) {
  const isEditMode = type === "edit";
  
  // Initialize state based on mode
  const [roleName, setRoleName] = useState(isEditMode ? rolename : "");
  const [roleColor, setRoleColor] = useState(isEditMode ? rolecolor : "#f5f5f5");
  const [salary, setSalary] = useState(isEditMode ? rolesalary : "");
  const [courseCards, setCourseCards] = useState(isEditMode ? rolecourses : []);
  const [permissions, setPermissions] = useState(isEditMode ? rolepermissions : {
    projectManagement: false,
    employeeManagement: false,
    courseManagement: false,
    attendance: false
  });

  const [showColors, setShowColors] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setInitialLoad(false), 300);
    return () => clearTimeout(timer);
  }, []);

  // Refs for click outside detection
  const modalRef = useRef(null);
  const colorPickerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);

  const availableCourses = predefinedCourses.filter(
    (course) =>
      !courseCards.find((c) => c.id === course.id) &&
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicking outside modal (but not dropdown)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Handle clicking outside color picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(event.target)) {
        setShowColors(false);
      }
    };

    if (showColors) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showColors]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (showDropdown) {
          setShowDropdown(false);
          setSearchTerm("");
        } else if (showColors) {
          setShowColors(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [showDropdown, showColors, onClose]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (showDropdown && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showDropdown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleSubmit = () => {
    if (!roleName.trim()) {
      alert("Please enter a role name");
      return;
    }

    const roleData = {
      roleName,
      roleColor,
      salary,
      courseCards,
      permissions
    };

    console.log(`${isEditMode ? 'Editing' : 'Adding'} Role:`, roleData);
    
    if (onSave) {
      onSave(roleData);
    }
    
    onClose();
  };

  const handleAddCourse = (course) => {
    setCourseCards([...courseCards, course]);
    // Don't close dropdown - keep it open for multiple selections
  };

  const handleRemoveCourse = (id) => {
    setCourseCards(courseCards.filter((c) => c.id !== id));
  };

  const handleColorSelect = (color) => {
    setRoleColor(color);
    setShowColors(false);
  };

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
    if (showDropdown) {
      setSearchTerm("");
    }
  };

  // Explicit close function for dropdown
  const handleCloseDropdown = () => {
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handlePermissionChange = (permission) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  // Get modal title based on mode
  const getModalTitle = () => {
    return isEditMode ? "Edit Role" : "Add New Role";
  };

  // Get button text based on mode
  const getSubmitButtonText = () => {
    return isEditMode ? "Update" : "Add";
  };

  // Get button styling based on mode
  const getSubmitButtonStyle = () => {
    return isEditMode 
      ? "px-3 sm:px-4 py-2 rounded-md bg-blue-200 text-black hover:bg-blue-600 hover:text-white text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
      : "px-3 sm:px-4 py-2 rounded-md bg-green-200 text-black hover:bg-green-600 hover:text-white text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none";
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[2000] p-4">
        <div 
          ref={containerRef}
          className="flex items-start justify-center gap-4 w-full max-w-[calc(100vw-2rem)] mx-auto"
        >
          {/* Main Modal - Fixed width */}
          <div
            ref={modalRef}
            className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-[550px] shadow-lg flex flex-col gap-3 sm:gap-5 relative overflow-y-auto flex-shrink-0"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {getModalTitle()}
              </h2>
            </div>

            {/* Role input and color */}
            <div className="flex items-center gap-2 sm:gap-3 relative w-full">
              <input
                type="text"
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={isEditMode ? "Edit role name" : "Enter role name"}
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus={!isEditMode}
              />
              <div
                className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-600 cursor-pointer hover:scale-110 transition-transform flex-shrink-0"
                style={{ backgroundColor: roleColor }}
                onClick={() => setShowColors(!showColors)}
              />
              {showColors && (
                <div
                  ref={colorPickerRef}
                  className="absolute top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 grid grid-cols-6 gap-2 z-[100]"
                >
                  {colors.map((color, idx) => (
                    <div
                      key={idx}
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full cursor-pointer hover:scale-110 transition-transform"
                      style={{ backgroundColor: color }}
                      onClick={() => handleColorSelect(color)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Permissions Section */}
            <div className="bg-gray-100 rounded-xl p-3 sm:p-4 w-full">
              <h3 className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                {isEditMode ? "Update Permissions" : "Set Permissions"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.projectManagement}
                    onChange={() => handlePermissionChange('projectManagement')}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Project Management</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.employeeManagement}
                    onChange={() => handlePermissionChange('employeeManagement')}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Employee Management</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.courseManagement}
                    onChange={() => handlePermissionChange('courseManagement')}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Course Management</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={permissions.attendance}
                    onChange={() => handlePermissionChange('attendance')}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 focus:ring-2 flex-shrink-0"
                  />
                  <span className="text-xs sm:text-sm text-gray-700">Attendance</span>
                </label>
              </div>
            </div>

            {/* Salary Input Section */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700 block mb-2 sm:mb-3" htmlFor="salary">
                {isEditMode ? "Update Salary" : "Set Salary"}
              </label>
              <input
                type="number"
                id="salary"
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={isEditMode ? "Update salary in ₹" : "Enter salary in ₹"}
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
              />
            </div>

            {/* Courses Section */}
            <div className="bg-gray-300 rounded-xl h-48 sm:h-56 lg:h-64 w-full relative px-2 pt-3 sm:pt-4 pb-3 sm:pb-4">
              {courseCards.length === 0 && (
                <span className="absolute top-2 sm:top-3 left-3 sm:left-4 text-xs sm:text-sm text-gray-600">
                  {isEditMode ? "Current courses..." : "Assign courses..."}
                </span>
              )}

              {/* Selected Cards */}
              <div className="h-full overflow-y-auto pr-1 sm:pr-2 min-h-[8rem]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-0">
                  {courseCards.map((course) => (
                    <div key={course.id} className="h-48">
                      <CourseCardWrapper
                        course={course}
                        onRemove={() => handleRemoveCourse(course.id)}
                        inDropdown={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating + Button */}
              <span
                className="absolute bottom-2 sm:bottom-3 right-2 sm:right-4 bg-teal-800/20 hover:bg-teal-800/40 rounded-full px-2 sm:px-3 py-1 text-lg sm:text-xl font-bold text-gray-800 cursor-pointer shadow-md z-[200] transition-colors select-none"
                onClick={handleDropdownToggle}
              >
                {showDropdown ? "×" : "+"}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 sm:gap-4 pt-2">
              <button
                className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-black hover:bg-red-600 hover:text-white hover:opacity-60 text-xs sm:text-sm transition-colors flex-1 sm:flex-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className={getSubmitButtonStyle()}
                onClick={handleSubmit}
                disabled={!roleName.trim()}
              >
                {getSubmitButtonText()}
              </button>
            </div>
          </div>

          {/* Side Dropdown */}
          {showDropdown && (
            <div
              ref={dropdownRef}
              className="w-[350px] sm:w-[450px] lg:w-[550px] bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-5 z-[1000] animate-fade-in-no-scale max-h-[90vh] overflow-y-auto flex-shrink-0"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Add Courses
                </h3>
                <button
                  onClick={handleCloseDropdown}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>

              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search courses..."
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableCourses.length === 0 ? (
                    <div className="col-span-full text-center text-gray-500 py-8">
                      No courses found
                    </div>
                  ) : (
                    availableCourses.map((course) => (
                      <div
                        key={course.id}
                        className="cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors"
                        onClick={() => handleAddCourse(course)}
                      >
                        <div className="h-56">
                          <CourseCardWrapper
                            course={course}
                            inDropdown={true}
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInNoScale {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-no-scale {
          animation: fadeInNoScale 0.15s ease-out;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
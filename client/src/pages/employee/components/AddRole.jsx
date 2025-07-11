import React, { useState, useEffect, useRef } from "react";
import { EmpCourseCard } from "./EmpCourseCard";

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
  { id: 1, courseName: "React Fundamentals", authorName: "John Doe", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 2, courseName: "Advanced Node.js", authorName: "Jane Smith", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 3, courseName: "MongoDB Mastery", authorName: "Kevin Li", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 4, courseName: "Python for Data Science", authorName: "Emily Stone", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 5, courseName: "Machine Learning Basics", authorName: "Michael Ray", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 6, courseName: "Fullstack with MERN", authorName: "Rachel Green", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 7, courseName: "Cloud Computing 101", authorName: "Thomas Blake", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 8, courseName: "Cybersecurity Essentials", authorName: "Sophia Reed", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 9, courseName: "Kubernetes Crash Course", authorName: "James Hunt", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 10, courseName: "Next.js Deep Dive", authorName: "Lily Carter", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" }
];

export const AddRole = ({ onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [roleColor, setRoleColor] = useState("#f5f5f5");
  const [showColors, setShowColors] = useState(false);
  const [courseCards, setCourseCards] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [salary, setSalary] = useState("");
  const [permissions, setPermissions] = useState({
    projectManagement: false,
    employeeManagement: false,
    courseManagement: false,
    attendance: false
  });
  
  // Refs for click outside detection
  const modalRef = useRef(null);
  const colorPickerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  const availableCourses = predefinedCourses.filter(
    (course) =>
      !courseCards.find((c) => c.id === course.id) &&
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicking outside modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
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

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setSearchTerm("");
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

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
    
    console.log("Role:", roleName, "Color:", roleColor, "Salary:", salary, "Courses:", courseCards, "Permissions:", permissions);
    onClose();
  };

  const handleAddCourse = (course) => {
    setCourseCards([...courseCards, course]);
    setShowDropdown(false);
    setSearchTerm("");
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[2000] p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-[350px] sm:max-w-[450px] lg:max-w-[550px] shadow-lg flex flex-col gap-3 sm:gap-5 relative animate-scale-in max-h-[90vh] overflow-y-auto"
        style={{ animation: "fadeIn 0.2s ease-out" }}
      >
        {/* Role input and color */}
        <div className="flex items-center gap-2 sm:gap-3 relative w-full">
          <input
            type="text"
            className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter role"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div
            className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-gray-600 cursor-pointer hover:scale-110 transition-transform flex-shrink-0"
            style={{ backgroundColor: roleColor }}
            onClick={() => setShowColors(!showColors)}
          />
          {showColors && (
            <div 
              ref={colorPickerRef}
              className="absolute top-10 right-0 bg-white border rounded-lg shadow-lg p-2 grid grid-cols-6 gap-1 z-50 animate-fade-in"
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
          <h3 className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">Permissions</h3>
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
        <div className="w-full"><label className="text-sm font-medium text-gray-700 block mb-2 sm:mb-3" htmlFor="salary">
          </label>
          <input
          type="number"
          id="salary"
          className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter salary in ₹"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          />
          </div>


        {/* Courses Section */}
        <div className="bg-gray-300 rounded-xl h-48 sm:h-56 lg:h-64 w-full relative px-2 pt-3 sm:pt-4 pb-3 sm:pb-4">
          {courseCards.length === 0 && (
            <span className="absolute top-2 sm:top-3 left-3 sm:left-4 text-xs sm:text-sm text-gray-600">Ongoing courses...</span>
          )}

          {/* Selected Cards */}
          <div className="h-full overflow-y-auto pr-1 sm:pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 mt-0">
              {courseCards.map((course) => (
                <EmpCourseCard
                  key={course.id}
                  courseName={course.courseName}
                  authorName={course.authorName}
                  imageUrl={course.imageUrl}
                  onRemove={() => handleRemoveCourse(course.id)}
                  truncateTitle={false}
                />
              ))}
            </div>
          </div>

          {/* Dropdown */}
          {showDropdown && (
            <div 
              ref={dropdownRef}
              className="absolute bottom-12 sm:bottom-16 right-2 sm:right-6 w-[200px] sm:w-[240px] bg-white rounded-xl shadow-md z-[1000] p-2 flex flex-col gap-2 animate-fade-in"
            >
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search courses..."
                className="w-full p-2 rounded-md text-xs sm:text-sm bg-white outline-none border focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="max-h-32 sm:max-h-40 overflow-y-auto overflow-x-hidden flex flex-col gap-1 items-center">
                {availableCourses.length === 0 ? (
                  <div className="text-xs sm:text-sm text-gray-500 py-2">No courses found</div>
                ) : (
                  availableCourses.map((course) => (
                    <div
                      key={course.id}
                      className="cursor-pointer hover:bg-gray-50 rounded-md p-1 transition-colors w-full"
                      onClick={() => handleAddCourse(course)}
                    >
                      <EmpCourseCard
                        courseName={course.courseName}
                        authorName={course.authorName}
                        imageUrl={course.imageUrl}
                        truncateTitle={true}
                        inDropdown={true}
                      />
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

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
            className="px-3 sm:px-4 py-2 rounded-md bg-green-200 text-black hover:bg-green-600 hover:text-white text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
            onClick={handleSubmit}
            disabled={!roleName.trim()}
          >
            Add
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.15s ease-out;
        }
      `}</style>
    </div>
  );
};  
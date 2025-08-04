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

// PREDEFINED DEFAULT VALUES
const PREDEFINED_VALUES = {
  role: "Marketing Head",
  color: "#7C3AED", // Purple color from your screenshot
  salary: "85000",
  permissions: {
    projectManagement: true,
    employeeManagement: true,
    courseManagement: false,
    attendance: true
  },
  courses: [
    { id: 1, courseName: "React Fundamentals", authorName: "John Doe", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
    { id: 3, courseName: "MongoDB Mastery", authorName: "Kevin Li", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" }
  ],
  members: []
};

const defaultPermissions = { 
  projectManagement: false, 
  employeeManagement: false, 
  courseManagement: false, 
  attendance: false 
};

export const EditRolePopup = ({ 
  role = PREDEFINED_VALUES.role, 
  members = PREDEFINED_VALUES.members, 
  color = PREDEFINED_VALUES.color,
  salary = PREDEFINED_VALUES.salary,
  permissions = PREDEFINED_VALUES.permissions,
  courses = PREDEFINED_VALUES.courses,
  onClose = () => console.log("Close modal"), 
  onSave = (data) => console.log("Save data:", data) 
}) => {
  // Initialize state with predefined values immediately
  const [roleName, setRoleName] = useState(role || PREDEFINED_VALUES.role);
  const [roleColor, setRoleColor] = useState(color || PREDEFINED_VALUES.color);
  const [roleSalary, setRoleSalary] = useState(salary ? String(salary) : PREDEFINED_VALUES.salary);
  const [selectedCourses, setSelectedCourses] = useState(courses || PREDEFINED_VALUES.courses);
  const [rolePermissions, setRolePermissions] = useState(permissions || PREDEFINED_VALUES.permissions);
  const [showColors, setShowColors] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const containerRef = useRef(null);
  const colorPickerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Force update with predefined values on mount
  useEffect(() => {
    console.log("Setting predefined values:", PREDEFINED_VALUES);
    
    setRoleName(role || PREDEFINED_VALUES.role);
    setRoleColor(color || PREDEFINED_VALUES.color);
    setRoleSalary(salary ? String(salary) : PREDEFINED_VALUES.salary);
    setRolePermissions(permissions || PREDEFINED_VALUES.permissions);
    setSelectedCourses(courses || PREDEFINED_VALUES.courses);
    
    console.log("Values set:", {
      roleName: role || PREDEFINED_VALUES.role,
      roleColor: color || PREDEFINED_VALUES.color,
      roleSalary: salary || PREDEFINED_VALUES.salary,
      rolePermissions: permissions || PREDEFINED_VALUES.permissions,
      selectedCourses: courses || PREDEFINED_VALUES.courses
    });
  }, []); // Empty dependency array to run only once on mount

  const availableCourses = predefinedCourses.filter(
    (course) => !selectedCourses.find((c) => c.id === course.id) && 
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Combined click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) onClose();
      if (showColors && colorPickerRef.current && !colorPickerRef.current.contains(event.target)) setShowColors(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, showColors]);

  // Handle escape key and focus management
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        if (showDropdown) { setShowDropdown(false); setSearchTerm(""); }
        else if (showColors) setShowColors(false);
        else onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    
    if (showDropdown && searchInputRef.current) searchInputRef.current.focus();

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showDropdown, showColors, onClose]);

  const handleSubmit = () => {
    if (!roleName.trim()) { 
      alert("Please enter a role name"); 
      return; 
    }
    
    const roleData = { 
      role: roleName.trim(), 
      members, 
      color: roleColor, 
      salary: roleSalary ? Number(roleSalary) : 0,
      permissions: rolePermissions,
      courses: selectedCourses 
    };
    
    console.log('Saving Role Data:', roleData);
    if (onSave) onSave(roleData);
    onClose();
  };

  const handleAddCourse = (course) => setSelectedCourses([...selectedCourses, course]);
  const handleRemoveCourse = (id) => setSelectedCourses(selectedCourses.filter((c) => c.id !== id));
  const handleColorSelect = (color) => { setRoleColor(color); setShowColors(false); };
  const handleDropdownToggle = () => { setShowDropdown(!showDropdown); if (showDropdown) setSearchTerm(""); };
  const handleCloseDropdown = () => { setShowDropdown(false); setSearchTerm(""); };
  const handlePermissionChange = (permission) => {
    console.log(`Toggling permission: ${permission}`);
    setRolePermissions(prev => {
      const updated = { ...prev, [permission]: !prev[permission] };
      console.log("Updated permissions:", updated);
      return updated;
    });
  };
  const handleKeyDown = (event) => { if (event.key === "Enter") { event.preventDefault(); handleSubmit(); } };

  const permissionLabels = [
    { key: 'projectManagement', label: 'Project Management' },
    { key: 'employeeManagement', label: 'Employee Management' },
    { key: 'courseManagement', label: 'Course Management' },
    { key: 'attendance', label: 'Attendance' }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[2000] p-4">
        <div ref={containerRef} className="flex items-start justify-center gap-4 w-full max-w-[calc(100vw-2rem)] mx-auto">
          {/* Main Modal */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-[550px] shadow-lg flex flex-col gap-3 sm:gap-5 relative overflow-y-auto flex-shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Edit Role
              </h2>
            </div>

            {/* Role Name and Color */}
            <div className="flex items-center gap-2 sm:gap-3 relative w-full">
              <input
                type="text"
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base outline-none bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Edit role name"
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
                <div ref={colorPickerRef} className="absolute top-10 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-3 grid grid-cols-6 gap-2 z-[100]">
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

            {/* Permissions */}
            <div className="bg-gray-100 rounded-xl p-3 sm:p-4 w-full">
              <h3 className="text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                Update Permissions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {permissionLabels.map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rolePermissions[key] || false}
                        onChange={() => handlePermissionChange(key)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                        rolePermissions[key] 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'bg-white border-gray-300 hover:border-gray-400'
                      }`}>
                        {rolePermissions[key] && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-700">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Salary */}
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700 block mb-2 sm:mb-3" htmlFor="salary">
                Update Salary
              </label>
              <input
                type="number"
                id="salary"
                className="w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Update salary in ₹"
                value={roleSalary}
                onChange={(e) => setRoleSalary(e.target.value)}
                min="0"
                step="1000"
              />
            </div>

            {/* Courses */}
            <div className="bg-gray-300 rounded-xl h-48 sm:h-56 lg:h-64 w-full relative px-2 pt-3 sm:pt-4 pb-3 sm:pb-4">
              {selectedCourses.length === 0 && (
                <span className="absolute top-2 sm:top-3 left-3 sm:left-4 text-xs sm:text-sm text-gray-600">
                  Current courses...
                </span>
              )}

              <div className="h-full overflow-y-auto pr-1 sm:pr-2 min-h-[8rem]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-0">
                  {selectedCourses.map((course) => (
                    <div key={course.id} className="relative">
                      <div className="h-60">
                        <EmpCourseCard 
                          courseName={course.courseName}
                          authorName={course.authorName}
                          imageUrl={course.imageUrl}
                          onRemove={null}
                        />
                      </div>
                      <button
                        onClick={() => handleRemoveCourse(course.id)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10 hover:bg-red-600 transition-colors"
                      >
                        <span className="text-sm font-bold">×</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

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
                className="px-3 sm:px-4 py-2 rounded-md bg-blue-200 hover:bg-blue-600 text-black hover:text-white text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none"
                onClick={handleSubmit}
                disabled={!roleName.trim()}
              >
                Update
              </button>
            </div>
          </div>

          {/* Course Selection Dropdown */}
          {showDropdown && (
            <div ref={dropdownRef} className="w-[350px] sm:w-[450px] lg:w-[550px] bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-5 z-[1000] animate-fade-in-no-scale max-h-[90vh] overflow-y-auto flex-shrink-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Add Courses</h3>
                <button onClick={handleCloseDropdown} className="text-gray-500 hover:text-gray-700 text-xl font-bold">×</button>
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
                    <div className="col-span-full text-center text-gray-500 py-8">No courses found</div>
                  ) : (
                    availableCourses.map((course) => (
                      <div key={course.id} className="cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors" onClick={() => handleAddCourse(course)}>
                        <div className="h-65">
                          <EmpCourseCard 
                            courseName={course.courseName}
                            authorName={course.authorName}
                            imageUrl={course.imageUrl}
                            onRemove={null}
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
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in-no-scale {
          animation: fadeInNoScale 0.15s ease-out;
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
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
};



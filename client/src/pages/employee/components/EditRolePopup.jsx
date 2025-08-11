import React, { useState, useEffect, useRef } from "react";
import { CourseCard } from "../../course/components/CourseCard";

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
  { id: 1, courseName: "React Fundamentals", authorName: "John Doe", courseInstructor: "John Doe", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 5, deadline: 8, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 2, courseName: "Advanced Node.js", authorName: "Jane Smith", courseInstructor: "Jane Smith", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 3, deadline: 12, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 3, courseName: "MongoDB Mastery", authorName: "Kevin Li", courseInstructor: "Kevin Li", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 7, deadline: 6, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 4, courseName: "Python for Data Science", authorName: "Emily Stone", courseInstructor: "Emily Stone", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 2, deadline: 0, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 5, courseName: "Machine Learning Basics", authorName: "Michael Ray", courseInstructor: "Michael Ray", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 4, deadline: 10, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 6, courseName: "Fullstack with MERN", authorName: "Rachel Green", courseInstructor: "Rachel Green", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 6, deadline: 16, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 7, courseName: "Cloud Computing 101", authorName: "Thomas Blake", courseInstructor: "Thomas Blake", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 1, deadline: 0, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 8, courseName: "Cybersecurity Essentials", authorName: "Sophia Reed", courseInstructor: "Sophia Reed", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 8, deadline: 14, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 9, courseName: "Kubernetes Crash Course", authorName: "James Hunt", courseInstructor: "James Hunt", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 3, deadline: 4, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" },
  { id: 10, courseName: "Next.js Deep Dive", authorName: "Lily Carter", courseInstructor: "Lily Carter", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", completionCount: 5, deadline: 0, deadlineUnits: "weeks", rating: 5, courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" }
];

const defaultPermissions = { 
  projectManagement: true,
  employeeManagement: true,
  courseManagement: true,
  attendance: true
};

const defaultContainerCourses = [
  { id: 1, courseName: "React Fundamentals", courseInstructor: "John Doe", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 8, deadlineUnits: "weeks", rating: 5 },
  { id: 3, courseName: "MongoDB Mastery", courseInstructor: "Kevin Li", courseImage: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png", deadline: 6, deadlineUnits: "weeks", rating: 5 }
];

export const EditRolePopup = ({ 
  type = "edit",
  rolename = "", 
  rolecolor = "#f5f5f5",
  rolesalary = "",
  rolecourses = [],
  rolepermissions = defaultPermissions,
  onClose = () => console.log("Close modal"),
  onSave = (data) => console.log("Save data:", data)
}) => {
  const isEditMode = type === "edit";
  
  const [roleName, setRoleName] = useState(isEditMode ? rolename : "");
  const [roleColor, setRoleColor] = useState(isEditMode ? rolecolor : "#f5f5f5");
  const [salary, setSalary] = useState(isEditMode ? rolesalary : "");
  
  // FIXED: Use a more stable initial state
  const [courseCards, setCourseCards] = useState([]);
  
  const [permissions, setPermissions] = useState(() => ({
    ...defaultPermissions,
    ...rolepermissions
  }));
  
  const [showColors, setShowColors] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const containerRef = useRef(null);
  const colorPickerRef = useRef(null);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // FIXED: Separate initialization effect
  useEffect(() => {
    if (!isInitialized) {
      let initialCourses;
      if (isEditMode) {
        initialCourses = rolecourses.length > 0 ? [...rolecourses] : [...defaultContainerCourses];
      } else {
        initialCourses = [...defaultContainerCourses];
      }
      
      console.log("Initializing with courses:", initialCourses);
      setCourseCards(initialCourses);
      setIsInitialized(true);
    }
  }, [isEditMode, rolecourses, isInitialized]);

  // FIXED: Separate effect for other props
  useEffect(() => {
    if (type?.toLowerCase() === "edit") {
      setRoleName(rolename || "Test Role");
      setRoleColor(rolecolor || "#FF0000");
      setSalary(rolesalary || 800000);
      
      setPermissions({
        projectManagement: rolepermissions?.projectManagement ?? true,
        employeeManagement: rolepermissions?.employeeManagement ?? true,
        courseManagement: rolepermissions?.courseManagement ?? true,
        attendance: rolepermissions?.attendance ?? true,
      });
    } else if (type === "add") {
      setRoleName("");
      setRoleColor("#f5f5f5");
      setSalary("");
      setPermissions(defaultPermissions);
    }
  }, [type, rolename, rolecolor, rolesalary, rolepermissions]);

  // FIXED: Calculate available courses with dependency on courseCards
  const [availableCourses, setAvailableCourses] = useState([]);
  
  useEffect(() => {
    const filtered = predefinedCourses.filter(
      (course) => !courseCards.some((c) => c.id === course.id) && 
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log("Available courses updated:", filtered.length);
    setAvailableCourses(filtered);
  }, [courseCards, searchTerm]);

  // Event handlers
  useEffect(() => {
    const handleClickOutside = (event) => {
      // FIXED: More specific click outside handling
      if (showDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setSearchTerm("");
        return;
      }
      if (containerRef.current && !containerRef.current.contains(event.target)) onClose();
      if (showColors && colorPickerRef.current && !colorPickerRef.current.contains(event.target)) setShowColors(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose, showColors, showDropdown]);

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
    
    if (showDropdown && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [showDropdown, showColors, onClose]);

  const handleSubmit = () => {
    if (!roleName.trim()) { alert("Please enter a role name"); return; }
    const roleData = { roleName, roleColor, salary, courseCards, permissions };
    console.log(`${isEditMode ? 'Editing' : 'Adding'} Role:`, roleData);
    if (onSave) onSave(roleData);
    onClose();
  };

  // FIXED: Direct course handlers with immediate state update
  const handleAddCourse = (courseToAdd) => {
    console.log("=== ADDING COURSE ===");
    console.log("Course to add:", courseToAdd);
    console.log("Current courseCards before:", courseCards.map(c => c.courseName));
    
    setCourseCards(prevCourses => {
      const exists = prevCourses.find(c => c.id === courseToAdd.id);
      if (exists) {
        console.log("Course already exists, not adding");
        return prevCourses;
      }
      
      const newCourses = [...prevCourses, courseToAdd];
      console.log("New courseCards after:", newCourses.map(c => c.courseName));
      return newCourses;
    });
    
    // Optional: Close dropdown after adding
    // setShowDropdown(false);
    // setSearchTerm("");
  };

  const handleRemoveCourse = (courseId) => {
    console.log("=== REMOVING COURSE ===");
    console.log("Course ID to remove:", courseId);
    console.log("Current courseCards before:", courseCards.map(c => `${c.id}: ${c.courseName}`));
    
    setCourseCards(prevCourses => {
      const newCourses = prevCourses.filter((c) => c.id !== courseId);
      console.log("New courseCards after:", newCourses.map(c => `${c.id}: ${c.courseName}`));
      return newCourses;
    });
  };

  const handleColorSelect = (color) => { setRoleColor(color); setShowColors(false); };
  
  const handleDropdownToggle = () => {
    console.log("=== DROPDOWN TOGGLE ===");
    console.log("Current showDropdown:", showDropdown);
    const newState = !showDropdown;
    setShowDropdown(newState);
    console.log("New showDropdown:", newState);
    
    if (newState === false) {
      setSearchTerm("");
    }
  };
  
  const handleCloseDropdown = () => { 
    console.log("=== CLOSING DROPDOWN ===");
    setShowDropdown(false); 
    setSearchTerm(""); 
  };
  
  const handlePermissionChange = (permission) => setPermissions(prev => ({ ...prev, [permission]: !prev[permission] }));
  const handleKeyDown = (event) => { if (event.key === "Enter") { event.preventDefault(); handleSubmit(); } };

  const permissionLabels = [
    { key: 'projectManagement', label: 'Project Management' },
    { key: 'employeeManagement', label: 'Employee Management' },
    { key: 'courseManagement', label: 'Course Management' },
    { key: 'attendance', label: 'Attendance' }
  ];

  // Debug logging
  console.log("=== RENDER STATE ===");
  console.log("courseCards count:", courseCards.length);
  console.log("courseCards names:", courseCards.map(c => c.courseName));
  console.log("availableCourses count:", availableCourses.length);
  console.log("showDropdown:", showDropdown);
  console.log("isInitialized:", isInitialized);

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[2000] p-4">
        <div ref={containerRef} className="flex items-start justify-center gap-4 w-full max-w-[calc(100vw-2rem)] mx-auto">
          {/* Main Modal */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-[550px] shadow-lg flex flex-col gap-3 sm:gap-5 relative overflow-y-auto flex-shrink-0">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                {isEditMode ? "Edit Role" : "Add New Role"}
              </h2>
            </div>

            {/* Role Name and Color */}
            <div className="flex items-center gap-2 sm:gap-3 relative w-full">
              <input
                type="text"
                className={`w-full px-3 sm:px-4 py-2 rounded-lg border border-gray-300 text-sm sm:text-base outline-none ${
                  isEditMode ? "bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent" : "focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                }`}
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
                {isEditMode ? "Update Permissions" : "Set Permissions"}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {permissionLabels.map(({ key, label }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={permissions[key]}
                        onChange={() => handlePermissionChange(key)}
                        className="sr-only"
                      />
                      <div className={`w-4 h-4 border-2 rounded flex items-center justify-center transition-all duration-200 ${
                        permissions[key] 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'bg-white border-gray-300 hover:border-gray-400'
                      }`}>
                        {permissions[key] && (
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

            {/* Courses Container - FIXED */}
            <div className="bg-gray-300 rounded-xl h-48 sm:h-56 lg:h-64 w-full relative px-2 pt-3 sm:pt-4 pb-3 sm:pb-4">
              {courseCards.length === 0 && (
                <span className="absolute top-2 sm:top-3 left-3 sm:left-4 text-xs sm:text-sm text-gray-600">
                  {isEditMode ? "Current courses..." : "Assign courses..."}
                </span>
              )}

              <div className="h-full overflow-y-auto pr-1 sm:pr-2 min-h-[8rem]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mt-0">
                  {courseCards.map((course, index) => (
                    <div key={`selected-course-${course.id}-${index}`} className="relative">
                      <div className="h-60">
                        <CourseCard {...course} />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Remove button clicked for:", course.courseName);
                          handleRemoveCourse(course.id);
                        }}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10 hover:bg-red-600 transition-colors"
                      >
                        <span className="text-sm font-bold">×</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="absolute bottom-2 sm:bottom-3 right-2 sm:right-4 bg-teal-800/20 hover:bg-teal-800/40 rounded-full px-2 sm:px-3 py-1 text-lg sm:text-xl font-bold text-gray-800 cursor-pointer shadow-md z-[200] transition-colors select-none"
                onClick={() => {
                  console.log("Plus button clicked");
                  handleDropdownToggle();
                }}
              >
                {showDropdown ? "×" : "+"}
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 sm:gap-4 pt-2">
              <button
                type="button"
                className="px-3 sm:px-4 py-2 rounded-md bg-gray-200 text-black hover:bg-red-600 hover:text-white hover:opacity-60 text-xs sm:text-sm transition-colors flex-1 sm:flex-none"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`px-3 sm:px-4 py-2 rounded-md ${isEditMode ? "bg-blue-200 hover:bg-blue-600" : "bg-green-200 hover:bg-green-600"} text-black hover:text-white text-xs sm:text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-1 sm:flex-none`}
                onClick={handleSubmit}
                disabled={!roleName.trim()}
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </div>

          {/* Course Selection Dropdown - COMPLETELY FIXED */}
          {showDropdown && (
            <div 
              ref={dropdownRef} 
              className="w-[350px] sm:w-[450px] lg:w-[550px] bg-white rounded-2xl shadow-lg p-4 sm:p-6 flex flex-col gap-3 sm:gap-5 z-[1000] animate-fade-in-no-scale max-h-[90vh] overflow-y-auto flex-shrink-0"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Add Courses</h3>
                <button 
                  type="button"
                  onClick={handleCloseDropdown} 
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
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
                      {searchTerm ? "No courses found matching your search" : "All courses are already selected"}
                    </div>
                  ) : (
                    availableCourses.map((course) => (
                      <div 
                        key={`available-course-${course.id}`} 
                        className="cursor-pointer hover:bg-gray-50 rounded-lg p-2 transition-colors border border-transparent hover:border-blue-200 hover:shadow-md" 
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log("=== COURSE CLICK EVENT ===");
                          console.log("Clicked course:", course.courseName);
                          handleAddCourse(course);
                        }}
                      >
                        <div className="h-65 pointer-events-none">
                          <CourseCard {...course} />
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

export default EditRolePopup;

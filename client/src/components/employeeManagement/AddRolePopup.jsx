import React, { useState } from "react";
import { EmpCourseCard } from "./EmpCourseCard";

const generateLightColors = () => {
  const colors = [];
  for (let i = 0; i < 50; i++) {
    const hue = Math.floor((i * 360) / 50);
    colors.push(`hsl(${hue}, 80%, 85%)`);
  }
  return colors;
};

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

export const AddRolePopup = ({ onClose }) => {
  const [roleName, setRoleName] = useState("");
  const [roleColor, setRoleColor] = useState("#f5f5f5");
  const [showColors, setShowColors] = useState(false);
  const [courseCards, setCourseCards] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const colors = generateLightColors();
  const availableCourses = predefinedCourses.filter(
    (course) =>
      !courseCards.find((c) => c.id === course.id) &&
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    console.log("Role:", roleName, "Color:", roleColor);
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[2000]">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-[550px] shadow-lg flex flex-col gap-5 relative">
        {/* Role input and color */}
        <div className="flex items-center gap-3 relative w-full">
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 text-base outline-none"
            placeholder="Enter role"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          <div
            className="w-6 h-6 rounded-full border-2 border-gray-600 cursor-pointer"
            style={{ backgroundColor: roleColor }}
            onClick={() => setShowColors(!showColors)}
          />
          {showColors && (
            <div className="absolute top-10 right-0 bg-white border rounded-lg shadow-lg p-2 grid grid-cols-6 gap-1 z-50 overflow-visible">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="w-6 h-6 rounded-full cursor-pointer hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setRoleColor(color);
                    setShowColors(false);
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Courses Section */}
        <div className="bg-gray-300 rounded-xl h-64 w-full relative px-2 pt-4 pb-4">
          {courseCards.length === 0 && (
            <span className="absolute top-3 left-4 text-sm text-gray-600">Ongoing courses...</span>
          )}

          {/* Selected Cards */}
          <div className="h-full overflow-y-auto pr-2">
            <div className="grid grid-cols-2 gap-1 mt-0">
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
            <div className="absolute bottom-16 right-6 w-[240px] bg-white rounded-xl shadow-md z-[1000] p-2 flex flex-col gap-2 overflow-visible">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full p-2 rounded-md text-sm bg-white outline-none border"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="max-h-40 overflow-y-auto overflow-x-hidden flex flex-col gap-1 items-center">
                {availableCourses.map((course) => (
                  <div
                    key={course.id}
                    className="cursor-pointer"
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
                ))}
              </div>
            </div>
          )}

          {/* Floating + Button */}
          <span
            className="absolute bottom-3 right-4 bg-teal-800/20 hover:bg-teal-800/40 rounded-full px-3 py-1 text-xl font-bold text-gray-800 cursor-pointer shadow-md z-[200]"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            +
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 rounded-md bg-gray-200 text-black hover:bg-red-600 hover:text-white hover:opacity-60 text-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-md bg-green-200 text-black hover:bg-green-600 hover:text-white text-sm"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

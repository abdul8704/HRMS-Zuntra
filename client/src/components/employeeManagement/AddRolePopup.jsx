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
    <>
      <div className="popup-overlay">
        <div className="popup-container">
          {/* Role input and color selector */}
          <div className="role-color-row">
            <input
              type="text"
              className="role-input"
              placeholder="Enter role"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
            <div
              className="main-circle"
              style={{ backgroundColor: roleColor }}
              onClick={() => setShowColors(!showColors)}
            />
          </div>

          {/* Color picker circles */}
          {showColors && (
            <div className="color-circles-container">
              {colors.map((color, idx) => (
                <div
                  key={idx}
                  className="color-circle"
                  style={{ backgroundColor: color }}
                  onClick={() => {
                    setRoleColor(color);
                    setShowColors(false);
                  }}
                />
              ))}
            </div>
          )}

          {/* Add course input + dropdown + selected cards */}
          <div className="add-course-container">
            <div className="input-plus-wrapper">
              <input
                type="text"
                className="course-input"
                placeholder="Add course"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowDropdown(true)}
              />
              <div className="plus-wrapper">
                <div className="plus-circle" onClick={() => setShowDropdown(!showDropdown)}>+</div>
                {showDropdown && (
                  <div className="dropdown-course-list">
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {availableCourses.map((course) => (
                      <div key={course.id} className="dropdown-item" onClick={() => handleAddCourse(course)}>
                        <EmpCourseCard
                          courseName={course.courseName}
                          authorName={course.authorName}
                          imageUrl={course.imageUrl}
                          onRemove={null}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Render selected course cards inside the container */}
            <div className="course-list-inside">
              {courseCards.map((course) => (
                <EmpCourseCard
                  key={course.id}
                  courseName={course.courseName}
                  authorName={course.authorName}
                  imageUrl={course.imageUrl}
                  onRemove={() => handleRemoveCourse(course.id)}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="button-row">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="add-btn" onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .popup-container {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          width: 95%;
          max-width: 700px;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .role-color-row {
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }

        .role-input {
          flex: 1;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          outline: none;
        }

        .main-circle {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border: 2px solid #999;
          cursor: pointer;
        }

        .add-course-container {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          width: 100%;
        }

        .input-plus-wrapper {
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .course-input {
          flex: 1;
          padding: 0.6rem 1rem;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
        }

        .plus-wrapper {
          position: relative;
        }

        .plus-circle {
          width: 1.8rem;
          height: 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: white;
          border: 1px solid black;
          border-radius: 50%;
          font-size: 1.2rem;
          color: #333;
          cursor: pointer;
        }

        .dropdown-course-list {
          position: absolute;
          top: calc(100% + 0.4rem);
          right: 0;
          background: white;
          border-radius: 0.8rem;
          max-height: 12rem;
          overflow-y: auto;
          overflow-x: hidden;
          width: 230px;
          padding: 0.5rem;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .dropdown-course-list::-webkit-scrollbar {
          display: none;
        }

        .search-input {
          width: 100%;
          margin-bottom: 0.5rem;
          padding: 0.4rem;
          border: none;
          outline: none;
          border-radius: 0.4rem;
          font-size: 0.9rem;
          background-color: white;
        }

        .dropdown-item {
          margin: 0;
          padding: 0.2rem 0;
          width: 100%;
          cursor: pointer;
        }

        .dropdown-item:hover {
          background-color: transparent !important;
        }

        .course-list-inside {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 0.75rem;
          padding-left: 0.5rem;
        }

        .button-row {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .cancel-btn, .add-btn {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: none;
          font-size: 0.9rem;
          cursor: pointer;
        }

        .cancel-btn {
          background-color: #f3f4f6;
          color: black;
        }

        .cancel-btn:hover {
          background-color: red;
          color: white;
          opacity: 0.6;
        }

        .add-btn {
          background-color: rgba(140, 221, 132, 0.8);
          color: black;
        }

        .add-btn:hover {
          background-color: green;
          color: white;
        }

        .color-circles-container {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .color-circle {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          cursor: pointer;
          border: 2px solid transparent;
        }
      `}</style>
    </>
  );
};

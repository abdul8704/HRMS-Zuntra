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

          {/* Exact same as EditRolePopup course box */}
          <div className="course-box">
            <span className="box-title">Ongoing courses...</span>

            {showDropdown && (
              <div className="dropdown-course-list">
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="search-input"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="dropdown-items-scroll">
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
              </div>
            )}

            <div className="course-list-wrapper">
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

            <span className="plus-circle" onClick={() => setShowDropdown(!showDropdown)}>+</span>
          </div>

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

        .course-box {
          background-color: #d9d9d9;
          border-radius: 10px;
          height: 18rem;
          width: 100%;
          position: relative;
          padding: 2.5rem 1rem 2rem 1rem;
          overflow-y: auto;
        }

        .box-title {
          position: absolute;
          top: 0.8rem;
          left: 1rem;
          font-size: 1rem;
          color: #555;
        }

        .plus-circle {
          position: absolute;
          bottom: 0.8rem;
          right: 1rem;
          background: rgba(0, 128, 128, 0.15);
          border-radius: 50%;
          padding: 0.3rem 0.6rem;
          font-size: 1rem;
          color: #333;
          cursor: pointer;
        }

        .course-list-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: flex-start;
          align-items: flex-start;
          gap: 0.75rem;
          margin-top: 2.5rem;
        }

        .dropdown-course-list {
          position: absolute;
          bottom: 3rem;
          right: 1rem;
          width: 230px;
          background: white;
          border-radius: 0.8rem;
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .search-input {
          width: 100%;
          padding: 0.4rem;
          border: none;
          outline: none;
          border-radius: 0.4rem;
          font-size: 0.9rem;
          background-color: white;
        }

        .dropdown-items-scroll {
          max-height: 8rem;
          overflow-y: auto;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
          gap: 0;
          padding-left: 0.3rem;
        }

        .dropdown-item {
          cursor: pointer;
          margin-bottom: 2px;
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
      `}</style>
    </>
  );
};

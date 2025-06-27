// --- AddRolePopup.jsx ---
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
  { id: 3, courseName: "MongoDB Mastery", authorName: "Kevin Li", imageUrl: "https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png" }
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
    (course) => !courseCards.find((c) => c.id === course.id) &&
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
            <input type="text" className="role-input" placeholder="Enter role" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
            <div className="main-circle" style={{ backgroundColor: roleColor }} onClick={() => setShowColors(!showColors)}></div>
          </div>

          {showColors && (
            <div className="color-circles-container">
              {colors.map((color, idx) => (
                <div key={idx} className="color-circle" style={{ backgroundColor: color }} onClick={() => {
                  setRoleColor(color);
                  setShowColors(false);
                }} />
              ))}
            </div>
          )}

          {/* 🔽 Add Course Row */}
          <div className="add-course-row">
  <input
    type="text"
    className="course-input"
    placeholder="Add course"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    onFocus={() => setShowDropdown(true)}
  />
  <div className="plus-circle" onClick={() => setShowDropdown(!showDropdown)}>+</div>
</div>




          {/* 🔽 Dropdown */}
          {showDropdown && (
            <div className="dropdown-course-list">
              <input type="text" placeholder="Search courses..." className="search-input" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              {availableCourses.map((course) => (
                <div key={course.id} className="dropdown-item" onClick={() => handleAddCourse(course)}>
                  <EmpCourseCard courseName={course.courseName} authorName={course.authorName} imageUrl={course.imageUrl} onRemove={null} />
                </div>
              ))}
            </div>
          )}

          {/* 🔽 Course cards below the row */}
          <div className="course-list">
            {courseCards.map((course) => (
              <EmpCourseCard key={course.id} courseName={course.courseName} authorName={course.authorName} imageUrl={course.imageUrl} onRemove={() => handleRemoveCourse(course.id)} />
            ))}
          </div>

          <div className="button-row">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="add-btn" onClick={handleSubmit}>Add</button>
          </div>
        </div>
      </div>

      <style>{`
        .popup-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.2);
          display: flex; align-items: center; justify-content: center;
          z-index: 2000;
        }

        .popup-container {
          background: white; border-radius: 1rem; padding: 2rem;
          width: 95%; max-width: 700px;
          box-shadow: 0 0 15px rgba(0,0,0,0.15);
          display: flex; flex-direction: column; gap: 1.2rem;
        }

        .role-color-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: transparent;
  border-radius: 10px;
  padding: 0; /* ✅ Remove padding to avoid misalignment */
  position: relative;
}


   .add-course-row {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background: transparent;
  padding: 0;
  width: 100%;
}

.course-input {
  flex: 1;
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
}




        .role-input {
  flex: 1;
  padding: 0.5rem 1rem; /* ✅ Inner padding like add-course-row */
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  outline: none;
}

        .main-circle {
          width: 1.5rem; height: 1.5rem;
          border-radius: 50%;
          border: 2px solid #999;
          cursor: pointer;
        }

        .box-title {
          font-size: 1rem;
          color: #555;
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
  transition: background 0.2s;
}




        .dropdown-course-list {
  background: #ffffff;
  border-radius: 0.8rem;
  max-height: 12rem;
  overflow-y: auto;
  overflow-x: hidden;
  width: 30%;                  /* ✅ reduce from 100% */
  max-width: 400px;            /* ✅ optional fixed max width */
  padding: 0.5rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  position: relative;

  /* Hide scrollbar */
  scrollbar-width: none;        /* Firefox */
  -ms-overflow-style: none;     /* IE and Edge */
}

.dropdown-course-list::-webkit-scrollbar {
  display: none;                /* Chrome, Safari */
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
          padding: 0;
          width: 100%;
          cursor: pointer;
        }

        .course-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
          gap: 0;
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
          opacity: 0.5;
          color: white;
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

import React, { useState } from 'react';

const Navbar = () => {
  return (
    <div style={styles.navItems}>
      {/* Left-side buttons */}
      <div style={styles.leftButtons}>
        <button style={styles.navButton}>Courses</button>
        <button style={styles.navButton}>Create Course</button>
        <button style={styles.navButton}>Add Course</button>
      </div>

      {/* Right-side Search bar */}
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
      </div>+
    </div>
  );
};

// Course Navigation Bar (Tab-style)
export const CourseNavbar = () => {
  const [active, setActive] = useState(0);

  const navItems = [
    { label: 'Courses' },
    { label: 'Create Course'},
    { label: 'Add Course' },
    { label: ''}
  ];

  return (
    <>
      <div className="course-navbar">
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={active === index ? 'active' : ''}
              onClick={() => setActive(index)}
            >
              <span className="course-icon">{item.icon}</span>&nbsp;
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <style>{`
        .course-navbar {
          background-color: #BBD3CC;
          border-radius: 1rem;
          width: 95%;
        }

        .course-navbar ul {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .course-navbar li {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 400;
          font-size: 20px;
          padding: 1rem 0;
          border-radius: 1rem;
          transition: background 0.2s ease-in-out;
          user-select: none;
        }

        .course-navbar li:hover {
          background-color: #e0e0e0;
        }

        .course-navbar li.active {
          background-color: #d0d0d0;
        }
      `}</style>
    </>
  );
};


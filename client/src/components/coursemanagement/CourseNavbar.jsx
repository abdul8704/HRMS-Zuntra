import React, { useState } from 'react';

// Navbar Component with Buttons + Search Bar
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
        <svg xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#666"
          style={styles.searchIcon}
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 
                   0016 9.5 6.5 6.5 0 109.5 16c1.61 
                   0 3.09-.59 4.23-1.57l.27.28v.79l5 
                   5L20.49 19l-5-5zm-6 0C8.01 14 
                   6 11.99 6 9.5S8.01 5 10.5 
                   5 15 7.01 15 9.5 12.99 14 10.5 14z" />
        </svg>
        <input
          type="text"
          placeholder="Search here..."
          style={styles.searchInput}
        />
      </div>
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

      <style jsx>{`
        .course-navbar {
          width: 100%;
          height:20%;
          display: flex;
          justify-content: space-between; /* push left and right sections */
          align-items: center;
          background: #BBD3CC;
          padding: 16px 32px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          flex-wrap: wrap;
        }

        .course-navbar ul {
          list-style: none;
          display: flex;
          margin: 0;
          padding: 0;
        }

        .course-navbar li {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 500;
          padding: 1rem 0;
          border-radius: 6rem;
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

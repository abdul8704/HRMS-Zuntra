import React, { useState } from 'react';
const Navbar = () => {
  return (
    <div style={styles.navItems}>
      <button style={styles.navButton}>Courses</button>
      <button style={styles.navButton}>Create Course</button>
      <button style={styles.navButton}>Add Course</button>

      <div style={styles.searchContainer}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
        <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/>
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

export const CourseNavbar= () => {
  const [active, setActive] = useState('Course');

  return (
    <>
      <div className='course-navbar'>
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={active === index ? 'active' : ''}
              onClick={() => setActive(index)}
            >
              <span className='course-icon'>{item.icon}</span>
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .course-navbar {
          background-color: #BBD3CC;
          border-radius: 0.75rem;
          width: 100%;
        }

        .course-navbar ul {
          list-style: none;
          display: flex;
          width: 100%;
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
          border-radius: 0.5rem;
          transition: background 0.2s ease-in-out;
          user-select: none;
        }

        .cr-navbar li:hover {
          background-color: #e0e0e0;
        }

        .course-navbar li.active {
          background-color: #d0d0d0;
        }
      `}</style>
    </>
  );
};



import React from 'react';

const Navbar = () => {
  return (
    <div style={styles.navBar}>
      {/* Navigation Buttons */}
      <div style={styles.navLeft}>
        <button style={styles.navButton}>Courses</button>
        <button style={styles.navButton}>Create Course</button>
        <button style={styles.navButton}>Add Course</button>
      </div>

      {/* Search Bar */}
      <div style={styles.searchContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#888"
          style={styles.searchIcon}
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 
                   6.5 6.5 0 109.5 16c1.61 0 3.09-.59 
                   4.23-1.57l.27.28v.79l5 5L20.49 
                   19l-5-5zm-6 0C8.01 14 6 11.99 
                   6 9.5S8.01 5 10.5 5 15 7.01 15 
                   9.5 12.99 14 10.5 14z" />
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

const styles = {
  navBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#f5f5f5',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    flexWrap: 'wrap',
    gap: '10px',
  },
  navLeft: {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
  },
  navButton: {
    padding: '10px 16px',
    border: 'none',
    backgroundColor: '#1abc9c',
    color: '#fff',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 500,
    transition: 'background-color 0.2s',
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: '20px',
    padding: '6px 12px',
    minWidth: '220px',
  },
  searchIcon: {
    marginRight: '8px',
  },
  searchInput: {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    fontSize: '14px',
    width: '100%',
  },
};

export default Navbar;


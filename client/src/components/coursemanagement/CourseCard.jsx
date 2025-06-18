
import React from 'react';

 export const CourseCard = () => {

  const courses = [
    {
      image: 'https://img.icons8.com/fluency/96/graduation-cap.png',
      title: 'Full Stack Development',
      instructor: 'Jane Doe',
      durationLabel: 'in 3 Weeks',
      durationType: 'warning',
      rating: 4.2,
    },
    {
      image: 'https://img.icons8.com/fluency/96/graduation-cap.png',
      title: 'Data Science Bootcamp',
      instructor: 'John Smith',
      durationLabel: 'in 2 Months',
      durationType: 'danger',
      rating: 4.5,
    },
    {
      image: 'https://img.icons8.com/fluency/96/graduation-cap.png',
      title: 'React for Beginners',
      instructor: 'Ali Khan',
      durationLabel: 'at your own pace',
      durationType: 'safe',
      rating: 4.0,
    },
    {
      image: 'https://img.icons8.com/fluency/96/graduation-cap.png',
      title: 'Machine Learning 101',
      instructor: 'Dr. Priya',
      durationLabel: 'in 5 days',
      durationType: 'danger',
      rating: 4.7,
    },
    {
      image: 'https://img.icons8.com/fluency/96/graduation-cap.png',
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emily Wang',
      durationLabel: 'in 1 Month',
      durationType: 'warning',
      rating: 4.3,
    },
  ];

  // 👇 Helper function to determine duration color
  const getDurationColor = (type) => {
    switch (type) {
      case 'safe':
        return '#2ecc71'; // green
      case 'danger':
        return '#e74c3c'; // red
      case 'warning':
      default:
        return '#f39c12'; // yellow
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Courses</h2>
      <div style={styles.grid}>
        {courses.map((course, index) => (
          <div key={index} style={styles.card}>
            <img src={course.image} alt="Course" style={styles.image} />
            <h3 style={styles.title}>{course.title}</h3>
            <p style={styles.instructor}>by {course.instructor}</p>
            <span
              style={{
                ...styles.duration,
                backgroundColor: getDurationColor(course.durationType),
              }}
            >
              {course.durationLabel}
            </span>
            <div style={styles.rating}>⭐ {course.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 💅 Inline styling
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f7f9fc',
    minHeight: '100vh',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '20px',
  },
  card: {
    width: '200px',
    backgroundColor: '#fff',
    padding: '15px',
    borderRadius: '1rem',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  image: {
    width: '80px',
    marginBottom: '10px',
  },
  title: {
    margin: '10px 0 5px',
    fontSize: '1rem',
  },
  instructor: {
    fontSize: '0.85rem',
    color: 'gray',
    marginBottom: '8px',
  },
  duration: {
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: '5px',
    fontSize: '0.75rem',
    color: '#fff',
    marginBottom: '8px',
  },
  rating: {
    marginTop: '5px',
    fontWeight: 'bold',
    color: '#333',
  },
};



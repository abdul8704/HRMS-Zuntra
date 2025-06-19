import React from 'react';

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  // Determine style based on duration content
  const isSelfPaced = duration.toLowerCase().includes('at your own pace');
  const durationStyle = isSelfPaced ? styles.durationGreen : styles.durationOrange;

  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>by {instructor}</p>
      <div style={styles.footer}>
        <span style={durationStyle}>{duration}</span>
        <span style={styles.rating}>{rating} ⭐</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '300px',
    height: '280px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'contain',
    borderRadius: '8px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
    fontSize: '14px'
  },
  durationOrange: {
    backgroundColor: '#ffe0b2',
    color: '#d35400',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  durationGreen: {
    backgroundColor: '#d0f5d0',
    color: '#2e7d32',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: 'bold'
  },
  rating: {
    fontWeight: 'bold',
    color: '#f4b400'
  }
};

export default CourseCard;
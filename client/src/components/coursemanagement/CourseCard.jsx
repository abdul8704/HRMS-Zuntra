import React from 'react';

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>by {instructor}</p>
      <div style={styles.footer}>
        <span style={styles.duration}>{duration}</span>
        <span style={styles.rating}>{rating} ⭐</span>
      </div>
    </div>
  );
};

// ✅ Inline styling
const styles = {
  card: {
    width: '288px',
    height: '333px',
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
  duration: {
    color: '#888'
  },
  rating: {
    fontWeight: 'bold',
    color: '#f4b400'
  }
};

export default CourseCard;


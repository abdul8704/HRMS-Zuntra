import React from 'react';

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  const isSelfPaced = duration.toLowerCase().includes('at your own pace');
  const durationStyle = isSelfPaced ? styles.durationGreen : styles.durationOrange;

  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.instructor}>by {instructor}</p>
      <div style={styles.footer}>
        <span style={durationStyle}>{duration}</span>
        <span style={styles.rating}>{rating} ⭐</span>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '100%',
    maxWidth: '320px',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    boxSizing: 'border-box',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '160px',
    objectFit: 'contain',
    borderRadius: '8px'
  },
  title: {
    fontSize: '18px',
    margin: '10px 0 5px 0',
    fontWeight: '600'
  },
  instructor: {
    fontSize: '14px',
    color: '#555',
    marginBottom: '8px'
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    fontSize: '14px',
    flexWrap: 'wrap',
    gap: '8px'
  },
  durationOrange: {
    backgroundColor: '#D6C2C2',
    color: '#000000',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  durationGreen: {
    backgroundColor: '#d0f5d0',
    color: '#2e7d32',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '12px'
  },
  rating: {
    fontWeight: 'bold',
    color: '#f4b400',
    fontSize: '14px'
  }
};

export default CourseCard;

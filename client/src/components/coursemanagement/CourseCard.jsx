import React from 'react';

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  const isSelfPaced = duration.toLowerCase().includes('at your own pace');
  const durationStyle = isSelfPaced ? styles.durationGreen : styles.durationOrange;

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img src={image} alt={title} style={styles.image} />
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.instructor}>by {instructor}</p>
        <div style={styles.footer}>
          <span style={durationStyle}>{duration}</span>
          <span style={styles.rating}>{rating} ⭐</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: '90%',
    maxWidth: '20rem',
    height: '', // ✅ Increased card height
    backgroundColor: '#ffffff',
    borderRadius: '1rem',
    boxShadow: '0 0.375rem 1rem rgba(0, 0, 0, 0.08)',
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
    overflow: 'hidden',
    margin: '1rem',
    boxSizing: 'border-box',
  },
  imageContainer: {
    width: '100%',
    height: '100%', // ✅ Increased image height
    overflow: 'hidden',
    borderTopLeftRadius: '1rem',
    borderTopRightRadius: '1rem',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  content: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  title: {
    fontSize: '1.125rem',
    fontWeight: '600',
    margin: '0 0 0.5rem 0',
  },
  instructor: {
    fontSize: '0.875rem',
    color: '#555',
    marginBottom: '1rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '0.875rem',
    marginTop: 'auto', // Ensures footer sticks to bottom
  },
  durationOrange: {
    backgroundColor: '#D6C2C2',
    color: '#000000',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.75rem',
    fontSize: '0.75rem',
  },
  durationGreen: {
    backgroundColor: '#d0f5d0',
    color: '#2e7d32',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.75rem',
    fontSize: '0.75rem',
  },
  rating: {
    fontWeight: 'bold',
    color: '#f4b400',
    fontSize: '0.875rem',
  },
};

export default CourseCard;


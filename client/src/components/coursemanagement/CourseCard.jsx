import React from "react";

export const CourseCard = ({ image, title, instructor, duration, badgeColor, rating }) => {
  const badgeStyle = {
    backgroundColor: badgeColor,
    color: "#000",
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
  };

  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.content}>
        <h3 style={styles.title}>{title}</h3>
        <p style={styles.instructor}>by {instructor}</p>
        <div style={styles.footer}>
          <span style={badgeStyle}>{duration}</span>
          <span style={styles.rating}>{rating} ⭐</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "250px",
    height: "320px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    backgroundColor: "#f0f0f0",
  },
  content: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  title: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  instructor: {
    fontSize: "13px",
    color: "#666",
    marginBottom: "12px",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#f4b400",
  },
};



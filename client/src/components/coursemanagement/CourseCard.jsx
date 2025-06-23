import React from "react";

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  // Determine badge color and text color based on duration
  const isSelfPaced = duration.toLowerCase().includes("at your own pace");
  const badgeColor = isSelfPaced ? "#d0f5d0" : "#ffe0b2"; // background color
  const badgeTextColor = isSelfPaced ? "#2e7d32" : "#d35400"; // text color

  const badgeStyle = {
    backgroundColor: badgeColor,
    color: badgeTextColor,
    padding: "4px 10px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: "500",
    whiteSpace: "nowrap",
  };

  return (
    <div style={styles.card}>
      {/* Image */}
      <img src={image} alt={title} style={styles.image} />

      {/* Content */}
      <div style={styles.content}>
        <div style={styles.infoSection}>
          <h3 style={styles.title}>{title}</h3>
          <p style={styles.instructor}>by {instructor}</p>
        </div>

        <div style={styles.footer}>
          <span style={badgeStyle}>{duration}</span>
          <span style={styles.rating}>
            <span style={styles.ratingNumber}>{rating}</span>
            <span style={styles.star}>★</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  card: {
    width: "250px",
    height: "320px",
    backgroundColor: "#D6D6D6",
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
    flex: 1,
  },
  infoSection: {
    marginBottom: "12px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
  },
  instructor: {
    fontSize: "13px",
    color: "#666",
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  ratingNumber: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#000", // Black
  },
  star: {
    fontSize: "25px",
    color: "#f4b400", // Yellow star
  },
};

export default CourseCard;

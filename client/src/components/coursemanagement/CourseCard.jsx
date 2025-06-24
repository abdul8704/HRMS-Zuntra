import React from "react";

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  const isSelfPaced = duration.toLowerCase().includes("at your own pace");
  const badgeColor = isSelfPaced ? "#08BD1D1F" : "#BD080821";
  const badgeTextColor = isSelfPaced ? "#2e7d32" : "#d35400";

  const badgeStyle = {
    backgroundColor: badgeColor,
    color: badgeTextColor,
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "clamp(10px, 2.5vw, 12px)",
    fontWeight: "500",
    whiteSpace: "nowrap",
  };

  return (
    <div style={styles.card}>
      <img src={image} alt={title} style={styles.image} />
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

const styles = {
  card: {
    flex: "1 1 280px",
    minWidth: "260px", // Reduced for mobile
    maxWidth: "350px",
    width: "100%", // Fill available space
    height: "auto", // Changed from fixed 45vh
    minHeight: "300px", // Minimum height instead
    backgroundColor: "#D6D6D6",
    borderRadius: "5px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    // Mobile-specific adjustments
    "@media (max-width: 360px)": {
      minWidth: "240px",
      minHeight: "280px",
    }
  },
  image: {
    width: "100%",
    height: "clamp(140px, 40vw, 180px)", // Responsive image height
    objectFit: "cover",
    backgroundColor: "#f0f0f0",
  },
  content: {
    padding: "clamp(8px, 2vw, 12px)", // Responsive padding
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "clamp(8px, 2vw, 12px)", // Responsive margin
  },
  title: {
    fontSize: "clamp(13px, 3.5vw, 16px)",
    fontWeight: "600",
    marginBottom: "4px",
    textAlign: "left",
    width: "100%",
    lineHeight: "1.3",
    margin: "0 0 4px 0", // Remove default margins
  },
  instructor: {
    fontSize: "clamp(11px, 3vw, 13px)",
    color: "#666",
    textAlign: "left",
    width: "100%",
    lineHeight: "1.2",
    margin: "0", // Remove default margins
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "clamp(4px, 1vw, 8px)", // Responsive gap
  },
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  ratingNumber: {
    fontSize: "clamp(11px, 2.5vw, 13px)",
    fontWeight: "bold",
    color: "#000",
  },
  star: {
    fontSize: "clamp(16px, 4vw, 22px)", // Smaller star for mobile
    color: "#f4b400",
  },
};

export default CourseCard;
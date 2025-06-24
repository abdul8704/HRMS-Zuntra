import React from "react";

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  const isSelfPaced = duration.toLowerCase().includes("at your own pace");
  const badgeColor = isSelfPaced ? "#08BD1D1F" : "#BD080821";
  const badgeTextColor = isSelfPaced ? "#2e7d32" : "#d35400";

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
    width: "23%",
    height: "45vh",
    backgroundColor: "#D6D6D6",
    borderRadius: "5px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden"
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    backgroundColor: "#f0f0f0",
  },
  content: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start", // 👈 ensures left alignment
    marginBottom: "12px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "4px",
    textAlign: "left", // Optional (for safety)
    width: "100%", // prevent text center by default
  },
  instructor: {
    fontSize: "13px",
    color: "#666",
    textAlign: "left", // Optional
    width: "100%",
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
    color: "#000",
  },
  star: {
    fontSize: "25px",
    color: "#f4b400",
  },
};

export default CourseCard;

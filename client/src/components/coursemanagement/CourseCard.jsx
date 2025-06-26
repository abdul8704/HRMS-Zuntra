import React from "react";

export const CourseCard = ({ image, title, instructor, duration, rating }) => {
  const isSelfPaced = duration.toLowerCase().includes("at your own pace");
  const badgeColor = isSelfPaced ? "#08BD1D1F" : "#BD080821";
  const badgeTextColor = isSelfPaced ? "#2e7d32" : "#d35400";

  const badgeStyle = {
    backgroundColor: badgeColor,
    color: badgeTextColor,
    padding: "0.25rem 0.5rem",
    borderRadius: "0.75rem",
    fontSize: "clamp(0.625rem, 2.5vw, 0.75rem)", 
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
    flex: "1 1 17.5rem",
    minWidth: "16.25rem",
    maxWidth: "21.875rem",
    width: "100%",
    height: "auto",
    minHeight: "18.75rem",
    backgroundColor: "#D6D6D6",
    borderRadius: "0.8rem",
    boxShadow: "0 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    "@media (maxWidth: 360px)": {
      minWidth: "15rem",
      minHeight: "17.5rem",
    },
  },

  image: {
    width: "100%",
    height: "clamp(8.75rem, 40vw, 11.25rem)", // 140px–180px
    objectFit: "cover",
    backgroundColor: "#f0f0f0",
  },

  content: {
    padding: "clamp(0.5rem, 2vw, 0.75rem)", // 8px–12px
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },

  infoSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "clamp(0.5rem, 2vw, 0.75rem)", // 8px–12px
  },

  title: {
    fontSize: "clamp(0.8125rem, 3.5vw, 1rem)", // 13px–16px
    fontWeight: "600",
    marginBottom: "0.25rem", // 4px
    textAlign: "left",
    width: "100%",
    lineHeight: "1.3",
    margin: "0 0 0.25rem 0", // 4px
  },

  instructor: {
    fontSize: "clamp(0.6875rem, 3vw, 0.8125rem)", // 11px–13px
    color: "#666",
    textAlign: "left",
    width: "100%",
    lineHeight: "1.2",
    margin: "0",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "clamp(0.25rem, 1vw, 0.5rem)", // 4px–8px
  },

  rating: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem", // 4px
  },

  ratingNumber: {
    fontSize: "clamp(0.6875rem, 2.5vw, 0.8125rem)", // 11px–13px
    fontWeight: "bold",
    color: "#000",
  },

  star: {
    fontSize: "clamp(1rem, 4vw, 1.375rem)", // 16px–22px
    color: "#f4b400",
  },
};

export default CourseCard;
import React, { useState, useEffect } from "react";
import { Check, X } from "lucide-react";

// Mock EmpProfile component since it's not available
const EmpProfile = ({ name, role, avatar, tl }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
    <div style={{
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '0.75rem',
      fontWeight: 'bold',
      color: '#666'
    }}>
      {name ? name.charAt(0).toUpperCase() : 'U'}
    </div>
    <div>
      <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#333' }}>
        {name || 'Unknown User'}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#666' }}>
        {role || 'No Role'}
      </div>
    </div>
  </div>
);

export const Review = () => {
  // Sample data for demonstration
  const taskData = {
    title: "Review Marketing Campaign",
    description: "Please review the Q4 marketing campaign materials including the new product launch strategy, social media content calendar, and budget allocation. Ensure all brand guidelines are followed and approve for implementation.",
    user: {
      name: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: null
    }
  };

  if (!taskData) return null;

  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize.width <= 768;
  const isTablet = screenSize.width > 768 && screenSize.width <= 1024;

  const styles = {
    "task-card": {
      backgroundColor: "#cceec7",
      borderRadius: "1rem",
      padding: isMobile ? "1rem" : "1.25rem",
      width: isMobile ? "100%" : isTablet ? "48%" : "30%",
      minWidth: isMobile ? "17.5rem" : "18.75rem",
      maxWidth: isMobile ? "100%" : "25rem",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.1)",
      textAlign: "left",
      margin: isMobile ? "0.5rem 0" : "0.5rem",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    "task-header": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.5rem",
    },
    "task-title": {
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      fontWeight: 700,
      margin: 0,
      color: "#333",
    },
    "task-description": {
      color: "#666",
      fontSize: isMobile ? "0.875rem" : "0.9375rem",
      lineHeight: "1.5",
      display: "-webkit-box",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      marginBottom: "1rem",
    },
    "task-footer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "0.75rem",
      marginTop: "auto",
    },
    "review-buttons": {
      display: "flex",
      gap: "0.625rem",
    },
    "review-button": {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#e9f9e3",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#555",
      cursor: "pointer",
      border: "none",
      transition: "all 0.2s ease",
    },
    "approve-button": {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    "reject-button": {
      backgroundColor: "#f8d7da", 
      color: "#721c24",
    },
  };

  const handleApprove = () => {
    console.log("Task approved:", taskData.title);
    // Add your approval logic here
  };

  const handleReject = () => {
    console.log("Task rejected:", taskData.title);
    // Add your rejection logic here
  };

  return (
    <div style={styles["task-card"]}>
      <div style={styles["task-header"]}>
        <div style={styles["task-title"]}>{taskData.title}</div>
      </div>

      <p style={styles["task-description"]}>{taskData.description}</p>

      <div style={styles["task-footer"]}>
        <EmpProfile
          name={taskData.user?.name}
          role={taskData.user?.role}
          avatar={taskData.user?.avatar}
          tl={true}
        />
        <div style={styles["review-buttons"]}>
          <button
            style={{...styles["review-button"], ...styles["approve-button"]}}
            onClick={handleApprove}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            title="Approve Task"
          >
            <Check size={16} />
          </button>
          <button
            style={{...styles["review-button"], ...styles["reject-button"]}}
            onClick={handleReject}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            title="Reject Task"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

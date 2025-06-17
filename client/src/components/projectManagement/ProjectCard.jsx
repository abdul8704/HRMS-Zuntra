import React from "react";
import { FaPen, FaTrash, FaCrown } from "react-icons/fa";

export const ProjectCard = () => {
  const styles = {
    "ProjectCard-card": {
      backgroundColor: "#f4b6b6",
      borderRadius: "16px",
      padding: "20px",
      width: "360px",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    },
    "ProjectCard-icons": {
      position: "absolute",
      top: "12px",
      right: "12px",
      display: "flex",
      gap: "10px",
      color: "#444",
      cursor: "pointer",
    },
    "ProjectCard-projectId": {
      fontSize: "18px",
      fontWeight: 600,
      margin: 0,
    },
    "ProjectCard-projectTitle": {
      fontSize: "22px",
      fontWeight: 700,
      margin: "5px 0 16px 0",
    },
    "ProjectCard-description": {
      color: "#4f4f4f",
      fontSize: "14px",
      lineHeight: "1.5",
      marginBottom: "60px",
    },
    "ProjectCard-footer": {
      position: "absolute",
      bottom: "15px",
      left: "20px",
      right: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "ProjectCard-profile": {
      display: "flex",
      alignItems: "center",
    },
    "ProjectCard-avatar": {
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      marginRight: "10px",
    },
    "ProjectCard-userDetails": {
      backgroundColor: "#f7caca",
      borderRadius: "20px",
      padding: "6px 12px",
      fontSize: "12px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
    "ProjectCard-nameRow": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      fontSize: "14px",
    },
    "ProjectCard-crownIcon": {
      marginLeft: "6px",
      fontSize: "14px",
    },
    "ProjectCard-role": {
      fontSize: "11px",
      color: "#5b5b5b",
      marginTop: "2px",
    },
    "ProjectCard-badge": {
      backgroundColor: "#f7caca",
      padding: "6px 12px",
      borderRadius: "20px",
      fontWeight: 600,
      fontSize: "14px",
    },
  };

  return (
    <div style={styles["ProjectCard-card"]}>
      <div style={styles["ProjectCard-icons"]}>
        <FaPen />
        <FaTrash />
      </div>

      <h3 style={styles["ProjectCard-projectId"]}>Project 1</h3>
      <h2 style={styles["ProjectCard-projectTitle"]}>Data Drifters</h2>

      <p style={styles["ProjectCard-description"]}>
        This is a sample description for a Project. I am typing more since there
        should be more lines. One more line and we’re good to go. Huhh, more
        lines since they want this to overflow.
      </p>

      <div style={styles["ProjectCard-footer"]}>
        <div style={styles["ProjectCard-profile"]}>
          <img
            src="https://i.pravatar.cc/100?img=5"
            alt="Abish DM"
            style={styles["ProjectCard-avatar"]}
          />
          <div style={styles["ProjectCard-userDetails"]}>
            <div style={styles["ProjectCard-nameRow"]}>
              Abish DM <FaCrown style={styles["ProjectCard-crownIcon"]} />
            </div>
            <div style={styles["ProjectCard-role"]}>Full Stack Developer</div>
          </div>
        </div>
        <div style={styles["ProjectCard-badge"]}>2 weeks left</div>
      </div>
    </div>
  );
};

export default ProjectCard;

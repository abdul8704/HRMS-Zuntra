import React from "react";
import { FaPen, FaTrash, FaCrown } from "react-icons/fa";

const UserProfile = () => {
  const styles = {
    "project-profileContainer": {
      backgroundColor: "#f7caca",
      borderRadius: "999px",
      padding: "6px 12px 6px 6px",
      display: "flex",
      alignItems: "center",
    },
    "project-avatar": {
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      marginRight: "10px",
    },
    "project-userDetails": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    "project-nameRow": {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      fontSize: "14px",
    },
    "project-crownIcon": {
      marginLeft: "6px",
      fontSize: "14px",
    },
    "project-role": {
      fontSize: "11px",
      color: "#5b5b5b",
      marginTop: "2px",
    },
  };

  return (
    <div style={styles["project-profileContainer"]}>
      <img
        src="https://i.pravatar.cc/100?img=5"
        alt="Abish DM"
        style={styles["project-avatar"]}
      />
      <div style={styles["project-userDetails"]}>
        <div style={styles["project-nameRow"]}>
          Abish DM <FaCrown style={styles["project-crownIcon"]} />
        </div>
        <div style={styles["project-role"]}>Full Stack Developer</div>
      </div>
    </div>
  );
};

export const ProjectCard = () => {
  const styles = {
    "project-card": {
      backgroundColor: "#f4b6b6",
      borderRadius: "16px",
      padding: "20px",
      width: "360px",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "left",
      marginTop: "20px",
    },
    "project-icons": {
      position: "absolute",
      top: "12px",
      right: "12px",
      display: "flex",
      gap: "10px",
      color: "#444",
      cursor: "pointer",
    },
    "project-projectTitle": {
      fontSize: "18px",
      fontWeight: 600,
      margin: 0,
    },
    "project-projectId": {
      fontSize: "22px",
      fontWeight: 700,
      margin: "5px 0 16px 0",
    },
    "project-description": {
      color: "#4f4f4f",
      fontSize: "14px",
      lineHeight: "1.5",
      marginBottom: "60px",
    },
    "project-footer": {
      position: "absolute",
      bottom: "15px",
      left: "20px",
      right: "20px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "project-badge": {
      backgroundColor: "#f7caca",
      padding: "6px 16px",
      borderRadius: "999px",
      fontWeight: 600,
      fontSize: "14px",
      color: "#5b5b5b",
    },
  };

  return (
    <div style={styles["project-card"]}>
      <div style={styles["project-icons"]}>
        <FaPen />
        <FaTrash />
      </div>

      <h2 style={styles["project-projectId"]}>Project 1</h2>
      <h3 style={styles["project-projectTitle"]}>Data Drifters</h3>

      <p style={styles["project-description"]}>
        This is a sample description for a Project. I am typing more since there
        should be more lines. One more line and we’re good to go. Huhh, more
        lines since they want this to overflow.
      </p>

      <div style={styles["project-footer"]}>
        <UserProfile />
        <div style={styles["project-badge"]}>2 weeks left</div>
      </div>
    </div>
  );
};

import React from "react";
import { FaCrown } from "react-icons/fa";

export const EmpProfile = ({ name, role, avatar }) => {
  const firstName = name.split(" ")[0];

  const styles = {
    "project-profileContainer": {
      backgroundColor: "#f7caca",
      borderRadius: "62.4375rem",
      padding: "0rem 0.75rem 0rem 0rem",
      display: "flex",
      alignItems: "center",
      marginRight: "0.625rem",
      maxWidth: "13.75rem",
      position: "relative", // for absolute positioning
    },
    "project-avatar": {
      width: "3rem",
      height: "3rem",
      borderRadius: "50%",
      marginRight: "0.625rem",
      objectFit: "cover",
      display: "block",
      flexShrink: 0,
    },
    "project-userDetails": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
    },
    "project-nameRow": {
      fontWeight: "600",
      fontSize: "0.875rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "project-crownIcon": {
      position: "absolute",
      top: "-0.4rem",
      right: "-0.3rem",
      fontSize: "1rem",
      color: "#d4af37", // optional gold-like color
    },
    "project-role": {
      fontSize: "0.6875rem",
      color: "#5b5b5b",
      marginTop: "0.125rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  };

  return (
    <div style={styles["project-profileContainer"]}>
      <FaCrown style={styles["project-crownIcon"]} />
      <img src={avatar} alt={firstName} style={styles["project-avatar"]} />
      <div style={styles["project-userDetails"]}>
        <div style={styles["project-nameRow"]}>{firstName}</div>
        <div style={styles["project-role"]}>{role}</div>
      </div>
    </div>
  );
};

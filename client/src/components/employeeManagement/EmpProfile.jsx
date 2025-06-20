import React, { useState } from "react";
import { FaPen, FaTrash, FaCrown } from "react-icons/fa";

export const EmpProfile = ({ name, role, avatar }) => {
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
      <img src={avatar} alt={name} style={styles["project-avatar"]} />
      <div style={styles["project-userDetails"]}>
        <div style={styles["project-nameRow"]}>
          {name} <FaCrown style={styles["project-crownIcon"]} />
        </div>
        <div style={styles["project-role"]}>{role}</div>
      </div>
    </div>
  );
};

import React from "react";
import { FaCrown } from "react-icons/fa";

export const EmpProfile = ({ name, role, avatar }) => {
  const firstName = name.split(" ")[0]; // extract first name only

  const styles = {
    "project-profileContainer": {
      backgroundColor: "#f7caca",
      borderRadius: "999px",
      padding: "0px 12px 0px 0px",
      display: "flex",
      alignItems: "center",
      marginRight: "10px",
      maxWidth: "220px",
    },
    "project-avatar": {
      width: "48px",
      height: "48px",
      borderRadius: "50%",
      marginRight: "10px",
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
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      fontSize: "14px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    "project-crownIcon": {
      marginLeft: "6px",
      fontSize: "14px",
    },
    "project-role": {
      fontSize: "11px",
      color: "#5b5b5b",
      marginTop: "2px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  };

  return (
    <div style={styles["project-profileContainer"]}>
      <img src={avatar} alt={firstName} style={styles["project-avatar"]} />
      <div style={styles["project-userDetails"]}>
        <div style={styles["project-nameRow"]}>
          {firstName}
          <FaCrown style={styles["project-crownIcon"]} />
        </div>
        <div style={styles["project-role"]}>{role}</div>
      </div>
    </div>
  );
};

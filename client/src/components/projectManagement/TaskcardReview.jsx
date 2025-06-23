import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { EmpProfile } from "../employeeManagement/EmpProfile";

export const TaskcardReview = ({
  title = "Dummy Task Title",
  description = "This is a sample description. Tasks asigned must be completed by the user within the stipulated time. Happy working!",
  userName = "John Doe",
  userRole = "Embedded & IoT Developer",
  userImage = "https://picsum.photos/40/40?random=1",
}) => {
  const styles = {
    card: {
      backgroundColor: "#cceec7",
      borderRadius: "16px",
      padding: "20px",
      position: "relative",
      fontFamily: "'Segoe UI', sans-serif",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "left",
      marginTop: "20px",
      marginRight: "20px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "360px",
    },
    icons: { position: "absolute", top: "12px", right: "12px", display: "flex", gap: "10px", color: "#555", cursor: "pointer" },
    title: { fontSize: "20px", fontWeight: "bold" },
    description: { color: "#555", fontSize: "14px", lineHeight: "1.5", marginBottom: "40px" },
    footer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", gap: "20px" },
    bubble: {
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
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.icons}>
        <FaPen />
        <FaTrash />
      </div>
      <h2 style={styles.title}>{title}</h2>
      <p style={styles.description}>{description}</p>
      <div style={styles.footer}>
        <EmpProfile name={userName} role={userRole} avatar={userImage} />
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={styles.bubble}>✔</div>
          <div style={styles.bubble}>✕</div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import { FaPen, FaTrash } from "react-icons/fa";

const UserProfile = ({ userName, userRole, userImage, style }) => {
  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      borderRadius: "999px",
      backgroundColor: "#e9f9e3",
      ...style
    },
    avatar: { width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" },
    userDetails: { display: "flex", flexDirection: "column" },
    userName: { fontSize: "14px", fontWeight: "600" },
    userRole: { fontSize: "12px", color: "#555" },
  };

  return (
    <div style={styles.container}>
      <img src={userImage} alt="User Avatar" style={styles.avatar} />
      <div style={styles.userDetails}>
        <span style={styles.userName}>{userName}</span>
        <span style={styles.userRole}>{userRole}</span>
      </div>
    </div>
  );
};

export const TaskCard = ({
  title = "Dummy Task Title",
  description = "This is a sample description. Tasks asigned must be completed by the user within the stipulated time. Happy working!",
  userName = "John Doe",
  userRole = "Embedded & IoT Developer",
  userImage = "https://picsum.photos/40/40?random=1",
  timeLeft = "3 Month left",
}) => {
  const styles = {
    card: {
      backgroundColor: "#cceec7",
      borderRadius: "16px",
      padding: "20px",
      position: "relative",
      fontFamily: "'Segoe UI', sans-serif",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      maxWidth: "30%",
      textAlign: "left",
      margin: "10px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "300px",
    },
    icons: { position: "absolute", top: "12px", right: "12px", display: "flex", gap: "10px", color: "#555", cursor: "pointer" },
    title: { fontSize: "20px", fontWeight: "bold" },
    description: { color: "#555", fontSize: "14px", lineHeight: "1.5", marginBottom: "40px" },
    footer: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px", gap: "20px" },
    badge: { backgroundColor: "#e9f9e3", padding: "4px 12px", borderRadius: "999px", fontWeight: "600", fontSize: "14px", color: "#555" },
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
        <UserProfile userName={userName} userRole={userRole} userImage={userImage} />
        <div style={styles.badge}>{timeLeft}</div>
      </div>
    </div>
  );
};

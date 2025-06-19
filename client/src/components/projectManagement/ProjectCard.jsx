import React, { useState } from "react";
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
  const [projectData, setProjectData] = useState({
    title: "Project 1",
    subtitle: "Data Drifters",
    description:
      "This is a sample description for a Project. I am typing more since there should be more lines. One more line and we’re good to go. Huhh, more lines since they want this to overflow.",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(projectData);

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
    "modal-overlay": {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 999,
    },
    "modal-content": {
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "12px",
      width: "320px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    "modal-input": {
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "100%",
    },
    "modal-buttons": {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
      marginTop: "10px",
    },
    "modal-label": {
      fontWeight: 600,
      marginBottom: "4px",
      fontSize: "14px",
    },
  };

  const openModal = () => {
    setFormData(projectData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setProjectData(formData);
    setIsEditing(false);
  };

  return (
    <>
      <div style={styles["project-card"]}>
        <div style={styles["project-icons"]}>
          <FaPen onClick={openModal} />
          <FaTrash />
        </div>

        <h2 style={styles["project-projectId"]}>{projectData.title}</h2>
        <h3 style={styles["project-projectTitle"]}>{projectData.subtitle}</h3>

        <p style={styles["project-description"]}>{projectData.description}</p>

        <div style={styles["project-footer"]}>
          <UserProfile />
          <div style={styles["project-badge"]}>2 weeks left</div>
        </div>
      </div>

      {isEditing && (
        <div style={styles["modal-overlay"]}>
          <div style={styles["modal-content"]}>
            <label>
              <div style={styles["modal-label"]}>Title</div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Title"
                style={styles["modal-input"]}
              />
            </label>

            <label>
              <div style={styles["modal-label"]}>Subtitle</div>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) =>
                  setFormData({ ...formData, subtitle: e.target.value })
                }
                placeholder="Subtitle"
                style={styles["modal-input"]}
              />
            </label>

            <label>
              <div style={styles["modal-label"]}>Description</div>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                placeholder="Description"
                style={styles["modal-input"]}
              />
            </label>

            <div style={styles["modal-buttons"]}>
              <button onClick={() => setIsEditing(false)}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { EmpProfile } from "../employeeManagement/EmpProfile"; // External profile component

export const ProjectCard = () => {
  const [projectData, setProjectData] = useState({
    title: "Project 6",
    subtitle: "6 Aurora",
    description:
      "This is a sample description for a Project. I am typing more since there should be more lines. One more line and we’re good to go. Huhh, more lines since they want this to overflow.",
    user: {
      name: "Cheril Gracenciya",
      role: "Full Stack Developer",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(projectData);

  const styles = {
    "project-card": {
      backgroundColor: "#f4b6b6",
      borderRadius: "16px",
      padding: "20px",
      width: "32%",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      textAlign: "left",
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
      width: "340px",
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
    console.log("Updated Project Data:", formData);
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
          <EmpProfile
            name={projectData.user.name}
            role={projectData.user.role}
            avatar={projectData.user.avatar}
            
          />
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
                style={styles["modal-input"]}
              />
            </label>

            <label>
              <div style={styles["modal-label"]}>Description</div>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                style={styles["modal-input"]}
              />
            </label>

            <label>
              <div style={styles["modal-label"]}>Employee Name</div>
              <input
                type="text"
                value={formData.user.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    user: { ...formData.user, name: e.target.value },
                  })
                }
                style={styles["modal-input"]}
              />
            </label>

            <label>
              <div style={styles["modal-label"]}>Role</div>
              <input
                type="text"
                value={formData.user.role}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    user: { ...formData.user, role: e.target.value },
                  })
                }
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

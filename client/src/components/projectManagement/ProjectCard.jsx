import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { EmpProfile } from "../employeeManagement/EmpProfile";

export const ProjectCard = ({ projectData }) => {
  if (!projectData) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(projectData);

  const styles = {
    "project-card": {
      backgroundColor: "#f4b6b6",
      borderRadius: "1rem",
      padding: "1.25rem",
      width: "22.5rem", // 360px
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.1)",
      textAlign: "left",
      marginTop: "1.25rem",
    },
    "project-icons": {
      position: "absolute",
      top: "0.75rem",
      right: "0.75rem",
      display: "flex",
      gap: "0.625rem",
      color: "#444",
      cursor: "pointer",
    },
    "project-projectTitle": {
      fontSize: "1.125rem",
      fontWeight: 600,
      margin: 0,
    },
    "project-projectId": {
      fontSize: "1.375rem",
      fontWeight: 700,
      margin: "0.3125rem 0 1rem 0",
    },
    "project-description": {
      color: "#4f4f4f",
      fontSize: "0.875rem",
      lineHeight: "1.5",
      marginBottom: "3.75rem",
    },
    "project-footer": {
      position: "absolute",
      bottom: "0.9375rem",
      left: "1.25rem",
      right: "1.25rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    "project-badge": {
      backgroundColor: "#f7caca",
      padding: "0.375rem 1rem",
      borderRadius: "62.4375rem",
      fontWeight: 600,
      fontSize: "0.875rem",
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
      padding: "1.25rem",
      borderRadius: "0.75rem",
      width: "21.25rem", // 340px
      display: "flex",
      flexDirection: "column",
      gap: "0.625rem",
    },
    "modal-input": {
      padding: "0.5rem",
      borderRadius: "0.375rem",
      border: "1px solid #ccc",
      width: "100%",
    },
    "modal-buttons": {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.625rem",
      marginTop: "0.625rem",
    },
    "modal-label": {
      fontWeight: 600,
      marginBottom: "0.25rem",
      fontSize: "0.875rem",
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
            name={projectData.user?.name}
            role={projectData.user?.role}
            avatar={projectData.user?.avatar}
            tl={true}
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

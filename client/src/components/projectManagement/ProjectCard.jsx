import React, { useState, useEffect } from "react";
import { Edit2, Trash2 } from "lucide-react";
import { EmpProfile } from "../employeeManagement/EmpProfile"

export const ProjectCard = ({projectData}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(projectData);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize.width <= 768;
  const isTablet = screenSize.width > 768 && screenSize.width <= 1024;

  const styles = {
    "project-card": {
      backgroundColor: "#f4b6b6",
      borderRadius: "1rem",
      padding: isMobile ? "1rem" : "1.25rem",
      width: isMobile ? "100%" : isTablet ? "48%" : "30%",
      minWidth: isMobile ? "280px" : "300px",
      maxWidth: isMobile ? "100%" : "400px",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.1)",
      textAlign: "left",
      margin: isMobile ? "0.5rem 0" : "0.5rem",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      gap: "0.75rem",
    },
    "project-header": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.5rem",
    },
    "project-projectId": {
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      fontWeight: 700,
      margin: 0,
      color: "#333",
    },
    "project-icons": {
      display: "flex",
      gap: isMobile ? "0.5rem" : "0.75rem",
      color: "#666",
      fontSize: isMobile ? "1rem" : "1.125rem",
    },
    "project-icon": {
      cursor: "pointer",
      transition: "color 0.2s ease",
      padding: "0.25rem",
    },
    "project-projectTitle": {
      fontSize: isMobile ? "1.125rem" : "1.25rem",
      fontWeight: 600,
      color: "#333",
      marginBottom: "0.5rem",
    },
    "project-description": {
      color: "#666",
      fontSize: isMobile ? "0.875rem" : "0.9375rem",
      lineHeight: "1.5",
      display: "-webkit-box",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    "project-footer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "0.75rem",
      marginTop: "auto",
    },
    "project-badge": {
      backgroundColor: "#f7caca",
      padding: isMobile ? "0.375rem 0.875rem" : "0.5rem 1rem",
      borderRadius: "62.4375rem",
      fontWeight: 600,
      fontSize: isMobile ? "0.75rem" : "0.875rem",
      color: "#5b5b5b",
      whiteSpace: "nowrap",
    },
    "modal-overlay": {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "1rem",
    },
    "modal-content": {
      backgroundColor: "white",
      borderRadius: "0.5rem",
      padding: isMobile ? "1.5rem" : "2rem",
      width: "100%",
      maxWidth: "500px",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    "modal-label": {
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "#333",
      marginBottom: "0.5rem",
      display: "block",
    },
    "modal-input": {
      width: "100%",
      padding: "0.75rem",
      borderRadius: "0.375rem",
      border: "1px solid #d1d5db",
      fontSize: "0.875rem",
      marginBottom: "1rem",
      resize: "vertical",
    },
    "modal-buttons": {
      display: "flex",
      gap: "0.75rem",
      justifyContent: "flex-end",
      marginTop: "1.5rem",
    },
    "modal-button": {
      padding: "0.75rem 1.5rem",
      borderRadius: "0.375rem",
      fontSize: "0.875rem",
      fontWeight: 600,
      cursor: "pointer",
      border: "none",
    },
    "modal-button-cancel": {
      backgroundColor: "#f3f4f6",
      color: "#374151",
    },
    "modal-button-save": {
      backgroundColor: "#3b82f6",
      color: "white",
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
        <div style={styles["project-header"]}>
          <div style={styles["project-projectId"]}>{projectData.title}</div>
          <div style={styles["project-icons"]}>
            <Edit2
              style={styles["project-icon"]}
              onClick={openModal}
              onMouseEnter={(e) => (e.target.style.color = "#3b82f6")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            />
            <Trash2
              style={styles["project-icon"]}
              onMouseEnter={(e) => (e.target.style.color = "#ef4444")}
              onMouseLeave={(e) => (e.target.style.color = "#666")}
            />
          </div>
        </div>

        <div style={styles["project-projectTitle"]}>{projectData.subtitle}</div>

        <p style={styles["project-description"]}>{projectData.description}</p>

        <div style={styles["project-footer"]}>
          <EmpProfile
            name={projectData.user.name}
            role={projectData.user.role}
            avatar={projectData.user.avatar}
            tl={true}
          />
          <div style={styles["project-badge"]}>2 weeks left</div>
        </div>
      </div>

      {isEditing && (
        <div style={styles["modal-overlay"]} onClick={() => setIsEditing(false)}>
          <div
            style={styles["modal-content"]}
            onClick={(e) => e.stopPropagation()}
          >
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
                rows={isMobile ? 3 : 4}
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
              <button
                onClick={() => setIsEditing(false)}
                style={{
                  ...styles["modal-button"],
                  ...styles["modal-button-cancel"],
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                style={{
                  ...styles["modal-button"],
                  ...styles["modal-button-save"],
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

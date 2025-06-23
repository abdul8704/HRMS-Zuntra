import React, { useState, useEffect } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { EmpProfile } from "../employeeManagement/EmpProfile"; // External profile component

export const ProjectCard = () => {
  const [projectData, setProjectData] = useState({
    title: "Project 6",
    subtitle: "6 Aurora",
    description:
      "This is a sample description for a Project. I am typing more since there should be more lines. One more line and we're good to go. Huhh, more lines since they want this to overflow.",
    user: {
      name: "Cheril Gracenciya",
      role: "Full Stack Developer",
      avatar: "https://i.pravatar.cc/100?img=5",
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(projectData);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Track screen size changes
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

  // Responsive breakpoints
  const isMobile = screenSize.width <= 768;
  const isTablet = screenSize.width > 768 && screenSize.width <= 1024;
  const isDesktop = screenSize.width > 1024;

  const getResponsiveStyles = () => ({
    "project-card": {
      backgroundColor: "#f4b6b6",
      borderRadius: "1rem",
      padding: isMobile ? "1rem" : "1.25rem",
      width: isMobile ? "100%" : isTablet ? "48%" : "32%",
      minWidth: isMobile ? "280px" : "300px",
      maxWidth: isMobile ? "100%" : "400px",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.1)",
      textAlign: "left",
      margin: isMobile ? "0.5rem 0" : "0.5rem",
      boxSizing: "border-box",
    },
    "project-icons": {
      position: "absolute",
      top: isMobile ? "0.5rem" : "0.75rem",
      right: isMobile ? "0.5rem" : "0.75rem",
      display: "flex",
      gap: isMobile ? "0.5rem" : "0.625rem",
      color: "#444",
      cursor: "pointer",
      fontSize: isMobile ? "0.875rem" : "1rem",
    },
    "project-projectTitle": {
      fontSize: isMobile ? "1rem" : "1.125rem",
      fontWeight: 600,
      margin: 0,
      wordWrap: "break-word",
      overflowWrap: "break-word",
    },
    "project-projectId": {
      fontSize: isMobile ? "1.25rem" : "1.375rem",
      fontWeight: 700,
      margin: "0.3125rem 0 1rem 0",
      wordWrap: "break-word",
      overflowWrap: "break-word",
    },
    "project-description": {
      color: "#4f4f4f",
      fontSize: isMobile ? "0.8125rem" : "0.875rem",
      lineHeight: "1.5",
      marginBottom: isMobile ? "4rem" : "3.75rem",
      wordWrap: "break-word",
      overflowWrap: "break-word",
      display: "-webkit-box",
      WebkitLineClamp: isMobile ? 4 : 5,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
    },
    "project-footer": {
      position: "absolute",
      bottom: isMobile ? "0.75rem" : "0.9375rem",
      left: isMobile ? "1rem" : "1.25rem",
      right: isMobile ? "1rem" : "1.25rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: isMobile ? "flex-start" : "center",
      flexDirection: isMobile ? "column" : "row",
      gap: isMobile ? "0.5rem" : "0",
    },
    "project-badge": {
      backgroundColor: "#f7caca",
      padding: isMobile ? "0.25rem 0.75rem" : "0.375rem 1rem",
      borderRadius: "62.4375rem",
      fontWeight: 600,
      fontSize: isMobile ? "0.75rem" : "0.875rem",
      color: "#5b5b5b",
      whiteSpace: "nowrap",
      alignSelf: isMobile ? "flex-start" : "auto",
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
      padding: isMobile ? "1rem" : "2rem",
    },
    "modal-content": {
      backgroundColor: "#fff",
      padding: isMobile ? "1rem" : "1.25rem",
      borderRadius: "0.75rem",
      width: isMobile ? "100%" : "21.25rem",
      maxWidth: isMobile ? "100%" : "90vw",
      maxHeight: isMobile ? "90vh" : "80vh",
      display: "flex",
      flexDirection: "column",
      gap: "0.625rem",
      overflowY: "auto",
      boxSizing: "border-box",
    },
    "modal-input": {
      padding: isMobile ? "0.75rem" : "0.5rem",
      borderRadius: "0.375rem",
      border: "0.0625rem solid #ccc",
      width: "100%",
      fontSize: isMobile ? "1rem" : "0.875rem",
      boxSizing: "border-box",
      // Prevent zoom on iOS
      ...(isMobile && { fontSize: "16px" }),
    },
    "modal-buttons": {
      display: "flex",
      justifyContent: "flex-end",
      gap: "0.625rem",
      marginTop: "0.625rem",
      flexDirection: isMobile ? "column" : "row",
    },
    "modal-button": {
      padding: isMobile ? "0.75rem 1rem" : "0.5rem 1rem",
      borderRadius: "0.375rem",
      border: "none",
      cursor: "pointer",
      fontSize: isMobile ? "1rem" : "0.875rem",
      fontWeight: 600,
      minHeight: isMobile ? "44px" : "auto", // Touch-friendly height
    },
    "modal-button-cancel": {
      backgroundColor: "#f0f0f0",
      color: "#333",
    },
    "modal-button-save": {
      backgroundColor: "#007bff",
      color: "#fff",
    },
    "modal-label": {
      fontWeight: 600,
      marginBottom: "0.25rem",
      fontSize: isMobile ? "1rem" : "0.875rem",
      display: "block",
    },
  });

  const styles = getResponsiveStyles();

  const openModal = () => {
    setFormData(projectData);
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Updated Project Data:", formData);
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
          <EmpProfile
            name={projectData.user.name}
            role={projectData.user.role}
            avatar={projectData.user.avatar}
          />
          <div style={styles["project-badge"]}>2 weeks left</div>
        </div>
      </div>

      {isEditing && (
        <div style={styles["modal-overlay"]} onClick={() => setIsEditing(false)}>
          <div style={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
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
                  ...styles["modal-button-cancel"]
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                style={{
                  ...styles["modal-button"],
                  ...styles["modal-button-save"]
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
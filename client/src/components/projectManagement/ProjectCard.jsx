import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { EmpProfile } from "../employeeManagement/EmpProfile";

export const ProjectCard = ({ projectData }) => {
  if (!projectData) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: projectData.title || "",
    subtitle: projectData.subtitle || "",
    description: projectData.description || "",
    date: projectData.date || "",
    teamName: projectData.teamName || "",
    teamMembers: projectData.teamMembers || "",
    user: {
      name: projectData.user?.name || "",
      role: projectData.user?.role || "",
      avatar: projectData.user?.avatar || "",
    },
  });

  const styles = {
    card: {
      backgroundColor: "#f4b6b6",
      borderRadius: "1rem",
      padding: "1.25rem",
      width: "22.5rem",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginTop: "1.25rem",
    },
    icons: {
      position: "absolute",
      top: "0.75rem",
      right: "0.75rem",
      display: "flex",
      gap: "0.625rem",
      color: "#444",
      cursor: "pointer",
    },
    title: {
      fontSize: "1.375rem",
      fontWeight: 700,
      margin: "0.3125rem 0 0.5rem 0",
    },
    subtitle: {
      fontSize: "1.125rem",
      fontWeight: 600,
      margin: "0 0 0.5rem 0",
    },
    description: {
      color: "#4f4f4f",
      fontSize: "0.875rem",
      marginBottom: "3rem",
    },
    footer: {
      position: "absolute",
      bottom: "1rem",
      left: "1.25rem",
      right: "1.25rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    badge: {
      backgroundColor: "#f7caca",
      padding: "0.375rem 1rem",
      borderRadius: "62.5rem",
      fontWeight: 600,
      fontSize: "0.875rem",
      color: "#5b5b5b",
    },
    modalOverlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    },
    modal: {
      backgroundColor: "#fff",
      padding: "1.5rem",
      borderRadius: "1rem",
      width: "38rem",
      display: "flex",
      flexDirection: "column",
      gap: "1rem",
    },
    inputRow: {
      display: "flex",
      gap: "1rem",
    },
    input: {
      flex: 1,
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "1px solid #ccc",
      fontSize: "1rem",
    },
    textarea: {
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "1px solid #ccc",
      fontSize: "1rem",
      width: "100%",
      resize: "vertical",
      minHeight: "80px",
    },
    addBtn: {
      marginTop: "0.5rem",
      alignSelf: "flex-end",
      fontSize: "1.1rem",
      cursor: "pointer",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1rem",
    },
    actionBtn: {
      padding: "0.5rem 1.25rem",
      fontSize: "1rem",
      borderRadius: "0.5rem",
      border: "1px solid #ccc",
      cursor: "pointer",
      margin: "0 0.5rem",
    },
  };

  const openModal = () => {
    setFormData({
      title: projectData.title || "",
      subtitle: projectData.subtitle || "",
      description: projectData.description || "",
      date: projectData.date || "",
      teamName: projectData.teamName || "",
      teamMembers: projectData.teamMembers || "",
      user: {
        name: projectData.user?.name || "",
        role: projectData.user?.role || "",
        avatar: projectData.user?.avatar || "",
      },
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    console.log("Updated Data:", formData);
    setIsEditing(false);
  };

  return (
    <>
      <div style={styles.card}>
        <div style={styles.icons}>
          <FaPen onClick={(e) => { e.stopPropagation(); openModal(); }} />
          <FaTrash />
        </div>
        <h2 style={styles.title}>{projectData.title}</h2>
        <h3 style={styles.subtitle}>{projectData.subtitle}</h3>
        <p style={styles.description}>{projectData.description}</p>

        <div style={styles.footer}>
          <EmpProfile
            name={projectData.user?.name}
            role={projectData.user?.role}
            avatar={projectData.user?.avatar}
            tl={true}
          />
          <div style={styles.badge}>2 weeks left</div>
        </div>
      </div>

      {isEditing && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.inputRow}>
              <input
                type="text"
                placeholder="Project Title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="text"
                placeholder="dd-mm-yyyy"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                style={styles.input}
              />
            </div>

            <textarea
              placeholder="Project Description..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              style={styles.textarea}
            />

            <div style={styles.inputRow}>
              <input
                type="text"
                placeholder="Team Name..."
                value={formData.teamName}
                onChange={(e) =>
                  setFormData({ ...formData, teamName: e.target.value })
                }
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Team Lead"
                value={formData.user.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    user: { ...formData.user, name: e.target.value },
                  })
                }
                style={styles.input}
              />
            </div>

            <textarea
              placeholder="Team Members..."
              value={formData.teamMembers}
              onChange={(e) =>
                setFormData({ ...formData, teamMembers: e.target.value })
              }
              style={styles.textarea}
            />

            <div style={styles.addBtn}>＋</div>

            <div style={styles.actions}>
              <button
                onClick={() => setIsEditing(false)}
                style={styles.actionBtn}
              >
                Cancel
              </button>
              <button onClick={handleSave} style={styles.actionBtn}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

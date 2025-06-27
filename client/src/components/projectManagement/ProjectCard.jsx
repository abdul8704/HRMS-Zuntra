import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { EmpProfile } from "../employeeManagement/EmpProfile";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ projectData }) => {
  if (!projectData) return null;

  const navigate = useNavigate();
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

  const handleCardClick = () => {
    navigate(`/project/${projectData._id}/overview`);
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

  const styles = {
    card: {
      backgroundColor: projectData.color || "#f4b6b6",
      borderRadius: "1rem",
      padding: "1.25rem",
      width: "20rem",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 0.125rem 0.625rem rgba(0,0,0,0.1)",
      marginTop: "1.25rem",
      cursor: "pointer",
      transition: "transform 0.2s",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      minHeight: "17.5rem",
    },
    icons: {
      position: "absolute",
      top: "0.75rem",
      right: "0.75rem",
      display: "flex",
      gap: "0.625rem",
      cursor: "pointer",
      zIndex: 2,
    },
    title: {
      fontSize: "1.375rem",
      fontWeight: 700,
      margin: "0.3125rem 0 0.5rem 0",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    subtitle: {
      fontSize: "1.125rem",
      fontWeight: 600,
      margin: "0 0 0.5rem 0",
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
    description: {
      color: "#f0f0f0",
      fontSize: "0.875rem",
      marginBottom: "3rem",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      flexGrow: 1,
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
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      padding: "0.375rem 1rem",
      borderRadius: "62.5rem",
      fontWeight: 600,
      fontSize: "0.875rem",
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
      minHeight: "5rem",
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

  return (
    <>
      <div
        style={styles.card}
        onClick={handleCardClick}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <div style={styles.icons}>
          <FaPen
            onClick={(e) => {
              e.stopPropagation();
              openModal();
            }}
          />
          <FaTrash onClick={(e) => e.stopPropagation()} />
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
              <div style={{ position: "relative", flex: 1 }}>
                <input
                  type="text"
                  placeholder="Select Team Lead"
                  value={formData.user.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      user: { ...formData.user, name: e.target.value },
                    })
                  }
                  style={{ ...styles.input, cursor: "pointer" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "1rem",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                    fontSize: "1rem",
                  }}
                >
                  ▼
                </div>
              </div>
            </div>

            <textarea
              placeholder="Add team members..."
              value={formData.teamMembers}
              onChange={(e) =>
                setFormData({ ...formData, teamMembers: e.target.value })
              }
              style={{ ...styles.textarea, minHeight: "6rem" }}
            />

            <div style={{ ...styles.addBtn, fontSize: "1.25rem" }}>＋</div>

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

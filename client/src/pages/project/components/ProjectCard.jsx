import React, { useState } from "react";
import { FaPen, FaTrash } from "react-icons/fa";
import { EmpProfile } from "../../employee/components/EmpProfile";
import { useNavigate } from "react-router-dom";

export const ProjectCard = ({ projectData }) => {
  if (!projectData) return null;

  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: projectData.title || "",
    subtitle: projectData.subtitle || "",
    description: projectData.description || "",
    date: projectData.date || 1,
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
      date: projectData.date || 1,
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
      padding: "0.7rem",
      fontFamily: "'Segoe UI', sans-serif",
      position: "relative",
      boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      marginBottom: "1.5rem",
      cursor: "pointer",
      transition: "transform 0.2s",
      display: "flex",
      flexDirection: "column",
      height: "240px",
      width: "100%",
      maxWidth: "380px",
      minWidth: "350px",
      border: "1px solid #e2e8f0",
      overflow: "hidden",
    },
    icons: {
      position: "absolute",
      top: "1rem",
      right: "0.9rem",
      display: "flex",
      gap: "0.5rem",
      cursor: "pointer",
      zIndex: 2,
    },
    contentArea: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      minHeight: 0, // Allow content to shrink
      paddingBottom: "1rem", // Add some space before footer
    },
    title: {
      fontSize: "1rem",
      fontWeight: 600,
      margin: "0 2.5rem 0.25rem 0",
      color: "#1E1E1E",
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordWrap: "break-word",
    },
    subtitle: {
      fontSize: "0.875rem",
      fontWeight: 500,
      margin: "0 0 1rem 0",
      color: "#1E1E1E",
      display: "-webkit-box",
      WebkitLineClamp: 1,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordWrap: "break-word",
    },
    description: {
      color: "#3F3F3F",
      fontSize: "0.875rem",
      display: "-webkit-box",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "1.4",
      wordWrap: "break-word",
      hyphens: "auto",
      flex: 1, // Take available space but don't push footer
    },
    footer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "0.5rem",
      marginTop: "auto", // Push to bottom
      paddingTop: "1rem", // Fixed space above footer
      minHeight: "40px", // Minimum height to maintain consistency
      position: "relative", // For absolute positioning of profile if needed
    },
    profileWrapper: {
      display: "flex",
      alignItems: "center",
      maxWidth: "60%", // Prevent profile from taking too much space
    },
    badge: {
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      padding: "0.375rem 0.75rem",
      borderRadius: "62.5rem",
      fontWeight: 500,
      fontSize: "0.875rem",
      color: "#1E1E1E",
      whiteSpace: "nowrap",
      flexShrink: 0,
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
      fontFamily: "'Segoe UI', sans-serif",
    },
    inputRow: {
      display: "flex",
      gap: "1rem",
    },
    input: {
      flex: 1,
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "none",
      backgroundColor: "#e0e0e0",
      fontSize: "1rem",
      color: "#333",
    },
    textarea: {
      padding: "0.75rem",
      borderRadius: "0.5rem",
      border: "none",
      backgroundColor: "#e0e0e0",
      fontSize: "1rem",
      width: "100%",
      resize: "vertical",
      minHeight: "6rem",
      color: "#333",
    },
    addBtn: {
      marginTop: "0.5rem",
      alignSelf: "flex-end",
      fontSize: "1.25rem",
      cursor: "pointer",
      color: "#4caf50",
    },
    actions: {
      display: "flex",
      justifyContent: "center",
      marginTop: "1rem",
      gap: "1rem",
    },
    actionBtn: {
      padding: "0.5rem 1.5rem",
      fontSize: "1rem",
      borderRadius: "0.5rem",
      border: "1px solid #b0b0b0",
      backgroundColor: "transparent",
      cursor: "pointer",
      color: "#333",
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

        <div style={styles.contentArea}>
          <h2 style={styles.title}>{projectData.title}</h2>
          <h3 style={styles.subtitle}>{projectData.subtitle}</h3>
          <p style={styles.description}>{projectData.description}</p>
        </div>

        <div style={styles.footer}>
          <div style={styles.profileWrapper}>
            <EmpProfile
              name={projectData.user?.name}
              role={projectData.user?.role}
              avatar={projectData.user?.avatar}
              tl={true}
            />
          </div>
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
                type="number"
                placeholder="Due Hours"
                min="1"
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
                  style={{ ...styles.input, paddingRight: "2rem" }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "0.75rem",
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
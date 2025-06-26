import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { EmpProfile } from "../employeeManagement/EmpProfile";

export const TaskCard = ({ 
  taskData, 
  taskStatus, 
  isHR = false //  Pass this from parent to control role
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(taskData);
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () =>
      setScreenSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenSize.width <= 768;

  //  State mapping
  const stateMap = ["todo", "inprogress", "inreview", "completed"];
  const stateNumber = stateMap.indexOf(taskStatus) + 1;

  const styles = { 
     "task-card": {
      backgroundColor: "#cceec7",
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
    "task-header": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      marginBottom: "0.5rem",
    },
    "task-title": {
      fontSize: isMobile ? "1.25rem" : "1.5rem",
      fontWeight: 700,
      margin: 0,
      color: "#333",
    },
     "task-icons": {
      display: "flex",
      gap: isMobile ? "0.5rem" : "0.75rem",
      color: "#666",
      fontSize: isMobile ? "1rem" : "1.125rem",
    },
    "task-icon": {
      cursor: "pointer",
      transition: "color 0.2s ease",
      padding: "0.25rem",
    },
    "task-description": {
      color: "#666",
      fontSize: isMobile ? "0.875rem" : "0.9375rem",
      lineHeight: "1.5",
      display: "-webkit-box",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      marginBottom: "1rem",
    },
    "task-footer": {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: isMobile ? "column" : "row",
      gap: "0.75rem",
      marginTop: "auto",
    },
    "task-badge": {
      backgroundColor: "#e9f9e3",
      padding: isMobile ? "0.375rem 0.875rem" : "0.5rem 1rem",
      borderRadius: "62.4375rem",
      fontWeight: 600,
      fontSize: isMobile ? "0.75rem" : "0.875rem",
      color: "#5b5b5b",
      whiteSpace: "nowrap",
    },
    "review-buttons": {
      display: "flex",
      gap: "0.625rem",
    },
    "review-button": {
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
      border: "none",
      transition: "all 0.2s ease",
    },
    "approve-button": {
      backgroundColor: "#d4edda",
      color: "#155724",
    },
    "reject-button": {
      backgroundColor: "#f8d7da", 
      color: "#721c24",
    },
    "completion-badge": {
      backgroundColor: "#d1ecf1",
      padding: isMobile ? "0.375rem 0.875rem" : "0.5rem 1rem",
      borderRadius: "62.4375rem",
      fontWeight: 600,
      fontSize: isMobile ? "0.75rem" : "0.875rem",
      color: "#0c5460",
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
    setFormData(taskData);
    setIsEditing(true);
  };
  const handleSave = () => setIsEditing(false);
  const handleAccept = () => {
    console.log("Accepted:", taskData.title);
    // Call parent callback for accept action
  };
  const handleReject = () => {
    console.log("Rejected:", taskData.title);
    // Call parent callback for reject action
  };
  
  const renderFooterContent = () => {
    return (
      <>
        <div style={styles["task-badge"]}>
          State: {stateNumber}
        </div>
        {taskStatus === "todo" && !isHR && (
          <Check
            style={styles["task-icon"]}
            title="Accept Task"
            onClick={handleAccept}
            onMouseEnter={(e) => (e.target.style.color = "#16a34a")}
            onMouseLeave={(e) => (e.target.style.color = "#666")}
          />
        )}
        {taskStatus === "inreview" && isHR && (
          <div style={styles["review-buttons"]}>
            <Check
              style={{ ...styles["review-button"], ...styles["approve-button"] }}
              title="Accept Task"
              onClick={handleAccept}
            />
            <X
              style={{ ...styles["review-button"], ...styles["reject-button"] }}
              title="Reject Task"
              onClick={handleReject}
            />
          </div>
        )}
        {taskStatus === "completed" && (
          <div style={styles["completion-badge"]}>
            Completed on: {taskData.completionDate || "N/A"}
            {/* Pass and display the actual `completionDate` from `taskData` */}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div style={{ ...styles["task-card"], backgroundColor: cardColor || styles["task-card"].backgroundColor }}>
        <div style={styles["task-header"]}>
          <div style={styles["task-title"]}>{taskData.title}</div>
          
          {/*  Edit/Delete Buttons only if isHR is true */}
          {isHR && (
            <div style={styles["task-icons"]}>
              <Edit2
                style={styles["task-icon"]}
                onClick={openModal}
                title="Edit Task"
              />
              <Trash2
                style={styles["task-icon"]}
                title="Delete Task"
              />
            </div>
          )}
        </div>

        <p style={styles["task-description"]}>
          {taskData.description}
          {/*  This is where you pass the actual task description */}
        </p>

        <div style={styles["task-footer"]}>
          <EmpProfile
            name={taskData.user.name}
            role={taskData.user.role}
            avatar={taskData.user.avatar}
            tl={true}
            /* Pass actual employee details (`user.name`, `user.role`, `user.avatar`) from `taskData` */
          />
          
          {renderFooterContent()}
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

            {taskStatus === "todo" && (
              <label>
                <div style={styles["modal-label"]}>Time Left</div>
                <input
                  type="text"
                  value={formData.timeLeft}
                  onChange={(e) =>
                    setFormData({ ...formData, timeLeft: e.target.value })
                  }
                  style={styles["modal-input"]}
                />
              </label>
            )}

            {taskStatus === "completed" && (
              <label>
                <div style={styles["modal-label"]}>Completion Date</div>
                <input
                  type="text"
                  value={formData.completionDate || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, completionDate: e.target.value })
                  }
                  style={styles["modal-input"]}
                />
              </label>
            )}

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
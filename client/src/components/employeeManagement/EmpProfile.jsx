// ✅ Cleaned EmpProfile component
export const EmpProfile = ({ name, role, avatar, tl = false, color = "#f7caca" }) => {
  const firstName = name.split(" ")[0];

  const styles = {
    "project-profileContainer": {
      backgroundColor: color,
      borderRadius: "62.4375rem",
      padding: "0.25rem 0.75rem 0.25rem 0.25rem",
      display: "flex",
      alignItems: "center",
      maxWidth: "13.75rem",
      position: "relative",
      height: "2.5rem",
    },
    "project-avatar": {
      width: "2rem",
      height: "2rem",
      borderRadius: "50%",
      marginRight: "0.5rem",
      objectFit: "cover",
      display: "block",
      flexShrink: 0,
    },
    "project-userDetails": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      flex: 1,
    },
    "project-nameRow": {
      fontWeight: "600",
      fontSize: "0.875rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "1.2",
    },
    "project-crownIcon": {
      position: "absolute",
      top: "0.2rem",
      right: "0.6rem",
      fontSize: "0.75rem",
      color: "#d4af37",
    },
    "project-role": {
      fontSize: "0.6875rem",
      color: "#5b5b5b",
      marginTop: "0.125rem",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      lineHeight: "1.2",
    },
  };

  return (
    <div style={styles["project-profileContainer"]}>
      {tl && (
        <svg
          style={styles["project-crownIcon"]}
          xmlns="http://www.w3.org/2000/svg"
          height="18px"
          viewBox="0 -960 960 960"
          width="18px"
          fill="#d4af37"
        >
          <path d="M200-160v-80h560v80H200Zm0-140-51-321q-2 0-4.5.5t-4.5.5q-25 0-42.5-17.5T80-680q0-25 17.5-42.5T140-740q25 0 42.5 17.5T200-680q0 7-1.5 13t-3.5 11l125 56 125-171q-11-8-18-21t-7-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820q0 15-7 28t-18 21l125 171 125-56q-2-5-3.5-11t-1.5-13q0-25 17.5-42.5T820-740q25 0 42.5 17.5T880-680q0 25-17.5 42.5T820-620q-2 0-4.5-.5t-4.5-.5l-51 321H200Zm68-80h424l26-167-105 46-133-183-133 183-105-46 26 167Zm212 0Z" />
        </svg>
      )}
      <img src={avatar} alt={firstName} style={styles["project-avatar"]} />
      <div style={styles["project-userDetails"]}>
        <div style={styles["project-nameRow"]}>{firstName}</div>
        <div style={styles["project-role"]}>{role}</div>
      </div>
    </div>
  );
};

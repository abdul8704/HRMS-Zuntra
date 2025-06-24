import React from "react";

export const EmployeeCard = () => {
  return (
    <div style={styles.card}>
      {/* Image Section */}
      <div style={styles.imageContainer}>
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          style={styles.image}
        />
      </div>

      {/* Info Section */}
      <div style={styles.infoContainer}>
        <h2 style={styles.name}>Dharanish</h2>
        <div style={styles.row}>
          <span style={styles.icon}>📧</span>
          <span style={styles.text}>dharanishtps@gmail.com</span>
        </div>
        <div style={styles.row}>
          <span style={styles.icon}>📞</span>
          <span style={styles.text}>+91 9443217788</span>
        </div>
        <div style={styles.role}>UI/UX Designer</div>
      </div>

      {/* Time Boxes Section */}
      <div style={styles.timeContainer}>
        <div style={styles.timeBox}></div>
        <div style={styles.timeBox}>
          <div style={styles.time}>09:02</div>
          <div style={styles.label}>Today's In time</div>
        </div>
        <div style={styles.timeBox}>
          <div style={styles.time}>16:55</div>
          <div style={styles.label}>Today's In time</div>
        </div>
        <div style={styles.timeBox}>
          <div style={styles.time}>16:55</div>
          <div style={styles.label}>Today's In time</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#cfd9ea",
    borderRadius: "16px",
    padding: "16px",
    gap: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    maxWidth: "800px",
    margin: "auto",
  },
  imageContainer: {
    flexShrink: 0,
  },
  image: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  },
  name: {
    fontSize: "20px",
    margin: 0,
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#333",
  },
  icon: {
    fontSize: "16px",
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  role: {
    marginTop: "4px",
    padding: "4px 8px",
    backgroundColor: "#d7deec",
    borderRadius: "12px",
    width: "fit-content",
    fontSize: "13px",
  },
  timeContainer: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    flexWrap: "wrap",
  },
  timeBox: {
    backgroundColor: "#b9c8dd",
    borderRadius: "12px",
    padding: "10px 16px",
    width: "100px",
    height: "60px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  time: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  label: {
    fontSize: "12px",
    opacity: 0.7,
  },
};


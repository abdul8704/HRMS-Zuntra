import React, { useState } from "react";

const darkenColor = (hex, percent = 10) => {
  if (!hex || typeof hex !== "string") return "#888";
  let col = hex.replace("#", "");
  if (col.length === 3) col = col.split("").map(c => c + c).join("");
  const r = parseInt(col.substring(0, 2), 16);
  const g = parseInt(col.substring(2, 4), 16);
  const b = parseInt(col.substring(4, 6), 16);

  const toHSL = (r, g, b) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; }
    else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return { h, s, l };
  };

  const hsl = toHSL(r, g, b);
  hsl.l = Math.max(0, hsl.l - percent / 100);
  const h = Math.round(hsl.h * 360);
  const s = Math.round(hsl.s * 100);
  const l = Math.round(hsl.l * 100);
  return `hsl(${h}, ${s}%, ${l}%)`;
};

export const EmployeeCard = ({ name, email, phone, role, image, inTime, outTime, workTime, breakTime, bgColor = "#cfd9ea" }) => {
  const [tooltip, setTooltip] = useState({ show: false, text: "", top: 0, left: 0 });
  const timeBoxColor = darkenColor(bgColor);

  const showTooltip = (e, text) => {
    const rect = e.target.getBoundingClientRect();
    setTooltip({
      show: true,
      text,
      top: rect.top + window.scrollY - 40,
      left: rect.left + window.scrollX,
    });
  };

  const hideTooltip = () => setTooltip({ show: false, text: "", top: 0, left: 0 });
  
  return (
    <>
      <div className="employee-card" style={styles.card(bgColor)}>
        <div className="card-content" style={styles.cardContent}>
          <div className="left-section" style={styles.leftSection}>
            <div style={styles.imageContainer}>
              <img src={image} alt="Profile" style={styles.image} />
            </div>
            <div style={styles.infoContainer}>
              <h2 style={styles.name} onMouseEnter={(e) => showTooltip(e, name)} onMouseLeave={hideTooltip}>
                <span style={styles.text}>{name}</span>
              </h2>
              <div style={styles.row} onMouseEnter={(e) => showTooltip(e, email)} onMouseLeave={hideTooltip}>
                <span style={styles.icon}>📧</span>
                <span style={styles.text}>{email}</span>
              </div>
              <div style={styles.row} onMouseEnter={(e) => showTooltip(e, phone)} onMouseLeave={hideTooltip}>
                <span style={styles.icon}>📞</span>
                <span style={styles.text}>{phone}</span>
              </div>
              <div style={styles.role(timeBoxColor)}>{role}</div>
            </div>
          </div>
          <div className="time-container" style={styles.timeContainer}>
            {[{time: workTime, label: "Work time"}, {time: inTime, label: "Today's In time"}, {time: breakTime, label: "Break time"}, {time: outTime, label: "Today's Out time"}].map(({time, label}) => (
              <div key={label} style={styles.timeBox(timeBoxColor)}>
                <div style={styles.time}>{time}</div>
                <div style={styles.label}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {tooltip.show && (
        <div style={{
          position: "absolute",
          top: `${tooltip.top}px`,
          left: `${tooltip.left}px`,
          backgroundColor: "#333",
          color: "#fff",
          padding: "6px 12px",
          borderRadius: "6px",
          fontSize: "14px",
          whiteSpace: "nowrap",
          zIndex: 9999,
          boxShadow: "0 2px 6px rgba(0,0,0,0.2)"
        }}>{tooltip.text}</div>
      )}

     <style>{`
  @media (max-width: 768px) {
    .card-content {
      flex-direction: column !important;
      align-items: center;
    }
    .left-section {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .time-container {
      grid-template-columns: 1fr !important;
      width: 100%;
    }
    .time-box {
      width: 100%;
    }
  }
`}</style>

    </>
  );
};

const styles = {
  card: (bgColor) => ({
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: bgColor,
    borderRadius: "16px",
    padding: "16px",
    gap: "16px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
    width: "100%",
    position: "relative",
  }),
  cardContent: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "16px",
    width: "100%",
  },
   '@media (max-width: 768px)': {
      flexDirection: "column",
      alignItems: "center",
    },
  leftSection: {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    flex: 1,
    minWidth: "240px"
  },
 imageContainer: {
    width: "80px",
    flexShrink: 0,
    '@media (max-width: 768px)': {
      alignSelf: "center",
    },
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
    minWidth: 0,
    overflow: "hidden",
    '@media (max-width: 768px)': {
      alignItems: "center",
      textAlign: "center",
    },
  },
  name: {
    fontSize: "20px",
    margin: 0,
    cursor: "pointer",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    color: "#333",
    maxWidth: "100%",
    cursor: "pointer",
  },
  icon: {
    fontSize: "16px",
    flexShrink: 0,
  },
  text: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "180px",
    display: "inline-block",
  },
  role: (bg) => ({
    marginTop: "4px",
    padding: "4px 8px",
    backgroundColor: bg,
    borderRadius: "12px",
    width: "fit-content",
    fontSize: "13px",
    color: "#fff",
  }),
  timeContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    minWidth: "300px",
    marginLeft: "auto",

    '@media (max-width: 768px)': {
      marginLeft: 0,
      gridTemplateColumns: "1fr",
      width: "100%",
    },
  },

  timeBox: (bg) => ({
    backgroundColor: bg,
    borderRadius: "12px",
    padding: "10px 16px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "#fff",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  }),
  time: {
    fontWeight: "bold",
    fontSize: "18px",
  },
  label: {
    fontSize: "12px",
    opacity: 0.85,
  },
};

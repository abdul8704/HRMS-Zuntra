import React, { useState } from "react";

const iconSvgStyle = {
  width: "20px",
  height: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
};


// SVG Icons
const icons = {
  "Work time": (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 39 37" style={iconSvgStyle}>
      <path fill="#000" d="M15.584 0h7.792a3.92 3.92 0 0 1 2.755 1.13 3.842 3.842 0 0 1 1.141 2.73v3.86h7.792a3.92 3.92 0 0 1 2.755 1.13 3.842 3.842 0 0 1 1.141 2.73v21.23c0 1.024-.41 2.005-1.141 2.73a3.915 3.915 0 0 1-2.755 1.13H3.896a3.914 3.914 0 0 1-2.755-1.13A3.842 3.842 0 0 1 0 32.81V11.58c0-2.142 1.734-3.86 3.896-3.86h7.792V3.86c0-2.142 1.734-3.86 3.896-3.86Zm7.792 7.72V3.86h-7.792v3.86h7.792Z"/>
    </svg>
  ),
  "Today's In time": (
    <svg width="25" height="25" viewBox="0 0 39 37" fill="none" xmlns="http://www.w3.org/2000/svg" style={iconSvgStyle}>
      <path d="M32.083 0.5H36.667C37.142 0.500087 37.5977 0.688589 37.9336 1.02441C38.2696 1.36042 38.458 1.81681 38.458 2.29199V34.375C38.458 34.8501 38.2695 35.3056 37.9336 35.6416C37.5977 35.9775 37.1421 36.1669 36.667 36.167H32.083C31.6079 36.1669 31.1523 35.9775 30.8164 35.6416C30.4805 35.3056 30.292 34.8501 30.292 34.375C30.292 33.8999 30.4805 33.4444 30.8164 33.1084C31.1523 32.7725 31.6079 32.5831 32.083 32.583H34.875V4.08301H32.083C31.6079 4.08292 31.1523 3.89452 30.8164 3.55859C30.4805 3.22267 30.2921 2.76705 30.292 2.29199C30.292 1.81681 30.4804 1.36042 30.8164 1.02441C31.1523 0.688591 31.608 0.500086 32.083 0.5ZM18.5869 7.39258C18.9984 7.45139 19.3747 7.6515 19.6533 7.95508L19.7666 8.0918L26.6875 17.3047C26.9092 17.6105 27.0293 17.9786 27.0293 18.3564C27.0293 18.7364 26.9077 19.1063 26.6836 19.4131L26.6787 19.4199L20.2178 28.585C20.0529 28.8165 19.8354 29.0059 19.583 29.1367C19.3307 29.2675 19.0508 29.3366 18.7666 29.3379H18.7646C18.3933 29.3406 18.0301 29.2272 17.7256 29.0146C17.5323 28.879 17.3676 28.7064 17.2412 28.5068C17.1146 28.307 17.0292 28.0837 16.9893 27.8506C16.9493 27.6175 16.9551 27.3789 17.0078 27.1484C17.0606 26.9178 17.1594 26.6994 17.2969 26.5068L17.2979 26.5049L21.2402 20.9131L21.7959 20.125H2.29199C1.81681 20.125 1.36042 19.9366 1.02441 19.6006C0.688411 19.2646 0.5 18.8082 0.5 18.333C0.500086 17.858 0.68859 17.4023 1.02441 17.0664C1.36042 16.7304 1.81681 16.542 2.29199 16.542H21.625L21.0254 15.7412L16.9004 10.2412C16.6153 9.86109 16.4924 9.38345 16.5596 8.91309C16.6268 8.44275 16.8787 8.01847 17.2588 7.7334C17.6389 7.44843 18.1166 7.32539 18.5869 7.39258Z" fill="black" stroke="black"/>
    </svg>
  ),
  "Break time": (
  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 38 38">
  <path fill="#000" d="M27.313 9.333c.321 0 .6-.132.835-.396A1.36 1.36 0 0 0 28.5 8c0-.32.087-.604.26-.854a2.51 2.51 0 0 1 .612-.625c.433-.333.872-.667 1.317-1 .446-.333.866-.695 1.262-1.083.396-.39.705-.84.928-1.355.223-.514.346-1.097.371-1.75 0-.36-.117-.673-.352-.937C32.662.132 32.383 0 32.062 0c-.321 0-.6.132-.834.396a1.363 1.363 0 0 0-.353.937c0 .32-.087.605-.26.855a2.49 2.49 0 0 1-.612.624c-.42.334-.86.667-1.317 1a10.21 10.21 0 0 0-1.262 1.084c-.384.389-.693.84-.928 1.354-.235.514-.359 1.097-.371 1.75 0 .361.117.674.352.938.236.263.514.395.835.395Zm-8.313 0c.322 0 .6-.132.835-.396A1.36 1.36 0 0 0 20.187 8c0-.32.087-.604.26-.854.173-.25.378-.458.613-.625.433-.333.872-.667 1.317-1a12.53 12.53 0 0 0 1.262-1.083c.396-.39.705-.84.927-1.355.223-.514.347-1.097.372-1.75 0-.36-.118-.673-.353-.937S24.072 0 23.75 0c-.322 0-.6.132-.835.396a1.363 1.363 0 0 0-.352.937c0 .32-.087.605-.26.855-.173.25-.378.458-.613.624-.42.334-.86.667-1.317 1a10.21 10.21 0 0 0-1.262 1.084c-.383.389-.692.84-.927 1.354-.235.514-.36 1.097-.372 1.75 0 .361.118.674.353.938.235.263.513.395.835.395Zm-8.313 0c.322 0 .6-.132.836-.396A1.36 1.36 0 0 0 11.875 8c0-.32.087-.604.26-.854a2.51 2.51 0 0 1 .612-.625c.433-.333.872-.667 1.318-1a12.52 12.52 0 0 0 1.261-1.083c.396-.39.705-.84.928-1.355.223-.514.346-1.097.371-1.75 0-.36-.117-.673-.352-.937C16.037.132 15.759 0 15.438 0c-.322 0-.6.132-.836.396a1.363 1.363 0 0 0-.352.937c0 .32-.087.605-.26.855a2.49 2.49 0 0 1-.612.624c-.42.334-.86.667-1.318 1a10.21 10.21 0 0 0-1.26 1.084c-.384.389-.693.84-.928 1.354-.235.514-.359 1.097-.371 1.75 0 .361.118.674.353.938.235.263.513.395.835.395ZM8.22 24.667c.408 1.041.915 2 1.521 2.875A18.414 18.414 0 0 0 11.782 30h-8.22v2.667c0 .625.087 1.25.26 1.875.173.625.42 1.194.742 1.708s.724.93 1.207 1.25c.482.32 1.032.486 1.65.5h26.72c.618 0 1.162-.16 1.632-.48a4.34 4.34 0 0 0 1.206-1.25 6.1 6.1 0 0 0 .761-1.708c.173-.624.26-1.256.26-1.895V30h-7.032a15.534 15.534 0 0 0 3.414-4.98c.816-1.888 1.23-3.93 1.243-6.124v-7.563H5.845c-.817 0-1.577.174-2.282.521a5.894 5.894 0 0 0-1.856 1.438 6.765 6.765 0 0 0-1.243 2.125A7.716 7.716 0 0 0 0 18c0 .903.148 1.757.445 2.563a6.765 6.765 0 0 0 1.243 2.125 5.894 5.894 0 0 0 1.856 1.437 5.344 5.344 0 0 0 2.3.542H8.22ZM7.125 14c0 .583-.006 1.167-.019 1.75a83.528 83.528 0 0 0-.018 1.77c0 .765.018 1.522.056 2.272.037.75.136 1.486.296 2.208H5.845a3.01 3.01 0 0 1-1.355-.313c-.42-.208-.791-.5-1.113-.875a3.83 3.83 0 0 1-.724-1.27A5.525 5.525 0 0 1 2.375 18c0-.542.087-1.056.26-1.542.173-.486.42-.91.742-1.27a3.733 3.733 0 0 1 1.095-.855c.408-.208.866-.32 1.373-.333h1.28Zm.297 21.333a.89.89 0 0 1-.668-.291 2.56 2.56 0 0 1-.464-.688 3.208 3.208 0 0 1-.26-.875 8.56 8.56 0 0 1-.093-.812h29.688c0 .236-.025.507-.074.812-.05.306-.143.59-.279.854a3.9 3.9 0 0 1-.463.709.774.774 0 0 1-.668.291H7.42Z"/>
</svg>

),

  "Today's Out time": (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="none" viewBox="0 0 39 37" style={iconSvgStyle}>
      <path fill="#000" d="M32.086 4.584a2.291 2.291 0 0 1 0-4.584h4.583a2.291 2.291 0 0 1 2.291 2.292v32.086a2.292 2.292 0 0 1-2.291 2.292h-4.583a2.291 2.291 0 0 1 0-4.584h2.291V4.584h-2.291ZM.419 17.006 6.88 7.838a2.291 2.291 0 1 1 3.736 2.659l-3.942 5.546h18.538a2.291 2.291 0 0 1 0 4.584H6.88l4.125 5.5a2.293 2.293 0 0 1-2.858 3.425 2.29 2.29 0 0 1-.808-.674L.465 19.71a2.292 2.292 0 0 1-.046-2.704Z"/>
    </svg>
  ),
};


const darkenColor = (hex, percent = 10) => {
  if (!hex || typeof hex !== "string") return "#888";
  let col = hex.replace("#", "");
  if (col.length === 3) col = col.split("").map((c) => c + c).join("");
  const r = parseInt(col.substring(0, 2), 16);
  const g = parseInt(col.substring(2, 4), 16);
  const b = parseInt(col.substring(4, 6), 16);

  const toHSL = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
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
const styles = {
card: (bgColor) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  backgroundColor: bgColor,
  borderRadius: "16px",
  padding: "12px",       // Reduced from 16px to 12px
  gap: "12px",           // Reduced gap between content
  boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
  width: "100%",
  position: "relative",
  maxWidth:"441px",
}),


  cardContent: {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
},



 leftSection: {
  display: "flex",
  flexDirection: "row",
  gap: "12px",
  alignItems: "center",         // Vertically center image + text block
  justifyContent: "flex-start",
},



imageContainer: {
  display: "flex",
  alignItems: "center",       // Center vertically within the section
  justifyContent: "flex-start", // Align image to the left inside the container
  width: "60px",
  height: "100%",              // Full height of parent container
  padding: 0,                  // Ensure no internal padding pushes image
},

image: {
  width: "60px",               // Maintain fixed width
  height: "80px",              // Or height as desired
  objectFit: "contain",        // Prevent distortion
  display: "block",
  marginLeft: "0",             // Explicitly remove margin if exists
},








  infoContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
  },
  name: {
  fontSize: "18px",
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
  flexWrap: "nowrap", // Prevent wrapping
  overflow: "hidden", // Hide overflow
},

  icon: {
    fontSize: "16px",
    flexShrink: 0,
  },
 text: {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  maxWidth: "120px",  // You can tweak this to control truncation point
  display: "inline-block",
},

 role: (bg) => ({
  marginTop: "4px",
  padding: "3px 6px",
  backgroundColor: bg,
  borderRadius: "10px",
  width: "fit-content",
  fontSize: "11px",
  color: "black",
}),

 timeContainer: {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "8px",            // Reduced spacing between boxes
  minWidth: "200px",     // Reduced overall width
  marginLeft: "20px",    // Small fixed margin to separate from left details
},



  timeBox: (bg) => ({
  backgroundColor: bg,
  borderRadius: "10px",
  padding: "6px 10px",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",
  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
  width: "80px",
  height: "50px",
  boxSizing: "border-box",
}),

  timeRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  timeText: {
  fontWeight: "bold",
  fontSize: "16px",
  color: "#777",
},
};

export const EmployeeCard = ({
  name,
  email,
  phone,
  role,
  image,
  inTime,
  outTime,
  workTime,
  breakTime,
  bgColor = "#cfd9ea",
}) => {
  const [tooltip, setTooltip] = useState({ show: false, text: "", top: 0, left: 0 });
  const cardColor = darkenColor(bgColor);
  const lightAccentColor = darkenColor(bgColor, 6);

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
      <div className="employee-card" style={styles.card(cardColor)}>
        <div className="card-content" style={styles.cardContent}>
          <div className="left-section" style={styles.leftSection}>
            <div style={styles.imageContainer}>
              <img src={image} alt="Profile" style={styles.image} />
            </div>
            <div style={styles.infoContainer}>
              <h2
                style={styles.name}
                onMouseEnter={(e) => showTooltip(e, name)}
                onMouseLeave={hideTooltip}
              >
                <span style={styles.text}>{name}</span>
              </h2>
              <div style={styles.row} onMouseEnter={(e) => showTooltip(e, email)} onMouseLeave={hideTooltip}>
                <span style={styles.icon}><svg
                width="1rem"
                height="1rem"
                viewBox="0 0 24 24"
                fill="black"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  marginRight: "0.15rem",
                  minWidth: "1rem",
                  flexShrink: 0,
                  verticalAlign: "middle"
                }}
              >
                <path d="M20 4H4C2.9 4 2 4.9 2 6v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
              </svg></span>
                <span style={styles.text}>{email}</span>
              </div>
              <div style={styles.row} onMouseEnter={(e) => showTooltip(e, phone)} onMouseLeave={hideTooltip}>
                <span style={styles.icon}>📞</span>
                <span style={styles.text}>{phone}</span>
              </div>
              <div style={styles.role(lightAccentColor)}>{role}</div>
            </div>
          </div>
          <div className="time-container" style={styles.timeContainer}>
            {[
              { time: workTime, label: "Work time" },
              { time: inTime, label: "Today's In time" },
              { time: breakTime, label: "Break time" },
              { time: outTime, label: "Today's Out time" },
            ].map(({ time, label }) => (
              <div key={label} style={styles.timeBox(lightAccentColor)}>
                <div style={styles.timeRow}>
                  {icons[label]}
                  <span style={styles.timeText}>{time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {tooltip.show && (
        <div
          style={{
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
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
};


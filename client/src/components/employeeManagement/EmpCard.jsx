import React from "react";

export const EmpCard = ({ name, email, phone, date, image, bgColor }) => {
  return (
    <div className={`emp-card ${bgColor}`}>
      <div className="emp-info">
        <img src={image} alt="profile" />
        <div className="emp-text">
          <h3>{name}</h3>
          <p>
            <span className="icon">
              {/* Email Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none" viewBox="0 0 18 14">
                <path fill="#000" d="M1.891 13.838a1.67 1.67 0 0 1-1.193-.472A1.518 1.518 0 0 1 .2 12.228v-9.66c0-.444.165-.823.497-1.138.331-.315.73-.472 1.193-.473h13.526c.465 0 .863.158 1.194.473.331.316.497.695.496 1.137v9.66c0 .444-.165.823-.496 1.139-.33.315-.729.473-1.194.472H1.89Zm6.763-5.635 6.763-4.026v-1.61L8.654 6.592 1.891 2.567v1.61l6.763 4.026Z"/>
              </svg>
            </span>
            {email}
          </p>
          <p>
            <span className="icon">
              {/* Phone Icon */}
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2a1.004 1.004 0 0 1 1.05-.24 11.36 11.36 0 0 0 3.58.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17.93 17.93 0 0 1 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.36 11.36 0 0 0 .57 3.58 1.004 1.004 0 0 1-.24 1.05l-2.2 2.16Z" />
              </svg>
            </span>
            {phone}
          </p>
          <p className="small">{date}</p>
        </div>
      </div>
      <div className="emp-actions">
        <button className="approve">✓</button>
        <button className="reject">✕</button>
      </div>

      <style jsx>{`
  .emp-card {
    display: flex;
    justify-content: space-between;
    align-items: stretch; /* This makes children stretch to full height */
    border-radius: 12px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s;
    width: 30%;
    background-color: #eadaff;
  }

  .emp-card:hover {
    transform: scale(1.01);
  }

  .emp-info {
    display: flex;
    gap: 16px;
    align-items: stretch; /* Important: stretch items like image */
    flex: 1;
  }

  .emp-info img {
    width: 100px;
    height: 100%; /* Image fills full height of card */
    object-fit: cover;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  .emp-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* Ensures all text is aligned left */
  text-align: left;
  padding: 10px 0;
}

.emp-text h3 {
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  text-align: left; /* Explicitly aligns name */
}

.emp-text p {
  margin: 2px 0;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
  opacity: 0.7;
  text-align: left;
}

.emp-text .small {
  font-size: 12px;
  color: black;
  background-color: white;
  border-radius: 50px;
  width: fit-content;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}

  .icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: black;
  }

  .emp-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
    padding: 10px;
  }

  .emp-actions button {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 12px;
    width: 40px;
    height: 36px;
    font-size: 20px;
    font-weight: bold;
    color: white;
    cursor: pointer;
  }

  .emp-actions .approve {
    background-color: green;
  }

  .emp-actions .reject {
    background-color: red;
  }
`}</style>

    </div>
  );
};

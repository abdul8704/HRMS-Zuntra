import React from 'react';

export const UserGreetings = () => {
  const userName = "Harini";  // Later, replace with dynamic user data
  const profileImageURL = "https://via.placeholder.com/60";  // Replace with actual image URL

  return (
    <>
      <div className="greetings-container">
        <div className="greetings-top">
          <div className="greetings-text">
            <h2>Welcome, {userName}! 👋</h2>
            <p>Wishing you a productive day!</p>
          </div>
          <img src={profileImageURL} alt="Profile" className="profile-pic" />
        </div>
      </div>

      <style>
        {`
          .greetings-container {
            background-color: #ffffff;
            border-radius: 20px;
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-family: Arial, sans-serif;
          }

          .greetings-top {
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .greetings-text h2 {
            font-size: 1.4rem;
            margin: 0;
            color: #333333;
          }

          .greetings-text p {
            font-size: 1rem;
            color: #666666;
            margin-top: 0.3rem;
          }

          .profile-pic {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            object-fit: cover;
          }
        `}
      </style>
    </>
  );
};

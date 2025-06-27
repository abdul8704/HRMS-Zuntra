import React from "react";

export const EmpCourseCard = ({ courseName, authorName, imageUrl, onRemove }) => {
  return (
    <div className="course-card">
      <div className="remove-btn" onClick={onRemove}>×</div>
      <div className="image-wrapper">
        <img src={imageUrl} alt={courseName} />
      </div>
      <div className="text-wrapper">
        <div className="course-name">{courseName}</div>
        <div className="author-name">{authorName}</div>
      </div>

      <style>{`
        .course-card {
          position: relative;
          display: flex;
          align-items: center;
          background-color: #c3dad7;
          border-radius: 999px;
          padding: 0.5rem 1rem;
          gap: 0.8rem;
          width: fit-content;
        }

        .remove-btn {
          position: absolute;
          top: -6px;
          right: -6px;
          background: #ff4d4d;
          color: white;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: bold;
          cursor: pointer;
        }

        .image-wrapper img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          object-fit: cover;
        }

        .text-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .course-name {
          font-weight: bold;
          font-size: 0.95rem;
        }

        .author-name {
          font-size: 0.8rem;
          color: #555;
        }
      `}</style>
    </div>
  );
};

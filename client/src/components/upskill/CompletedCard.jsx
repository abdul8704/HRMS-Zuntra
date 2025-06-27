import React from "react";
import { FaStar, FaRedoAlt, FaDownload } from "react-icons/fa";

export const CompletedCard = ({ image, title, instructor, date, rating }) => {
  return (
    <div className="course-card">
      <img src={image} alt="course" className="card-img" />
      <div className="card-body">
        <div className="card-top">
          <div>
            <h3 className="card-title">{title}</h3>
            <p className="card-instructor">by {instructor}</p>
          </div>
          <div className="card-rating">
            <span>{rating}</span>
            <FaStar className="text-yellow-500" />
          </div>
        </div>

        <div className="card-footer">
          <span className="badge">Completed on: {date}</span>
          <div className="card-actions">
            <div className="icon-wrapper">
              <FaRedoAlt className="icon" />
            </div>
            <div className="icon-wrapper">
              <FaDownload className="icon" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .course-card {
          display: flex;
          flex-direction: row;
          background-color: #f5f5f5;
          border-radius: 0.8rem;
          overflow: hidden;
          width: 100%;
          max-width: 600px;
          height: auto;
          box-sizing: border-box;
          margin: auto;
          margin-bottom: 1rem;
        }

        .card-img {
          width: 160px;
          height: 160px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .card-body {
          flex-grow: 1;
          padding: 1.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          flex-wrap: wrap;
        }

        .card-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.3rem;
        }

        .card-instructor {
          font-size: 0.9rem;
          color: #555;
        }

        .card-rating {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 500;
          margin-top: 0.25rem;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 0.8rem;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .badge {
          padding: 0.4rem 0.8rem;
          border-radius: 1rem;
          font-size: 0.8rem;
          background-color: #7B08BD21;
          color: #7B08BD;
          font-weight: 500;
        }

        .card-actions {
          display: flex;
          gap: 0.8rem;
        }

        .icon-wrapper {
          background-color: #08BD1D21;
          padding: 0.4rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon {
          font-size: 1rem;
          color: #08BD1D;
        }

        @media (max-width: 768px) {
          .course-card {
            flex-direction: column;
            align-items: center;
          }

          .card-img {
            width: 100%;
            height: 180px;
          }

          .card-body {
            padding: 1rem;
          }

          .card-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .card-actions {
            justify-content: flex-start;
          }
        }

        @media (max-width: 480px) {
          .card-title {
            font-size: 1.1rem;
          }

          .badge {
            font-size: 0.75rem;
          }

          .icon {
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
};

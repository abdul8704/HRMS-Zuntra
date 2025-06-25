import React from 'react';
import zuntraLogo from '../assets/zuntra.png';

export const NotFound = () => {
  return (
    <div className="notfound-container">
      <img src={zuntraLogo} alt="Zuntra Logo" className="notfound-logo" />
      <main className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Oops! The page you're looking for doesn't exist.</p>
        <button onClick={() => window.history.back()} className="notfound-link">
  Go back
</button>

      </main>

      <style>{`
        .notfound-container {
          background-color: #ffffff;
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .notfound-logo {
          position: absolute;
          top: 1rem;
          left: 1rem;
          height: 3rem;
          width: auto;
          animation: fadeInSlide 1s ease forwards;
        }

        .notfound-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          animation: fadeInUp 1s ease 0.3s forwards;
          opacity: 0;
        }

        .notfound-title {
          font-size: 6rem;
          font-weight: bold;
          color: #2e2e2e;
          margin: 0;
          animation: popIn 0.8s ease;
        }

        .notfound-message {
          font-size: 1.5rem;
          color: #444;
          margin: 1rem 0;
        }

        .notfound-link {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.75rem 1.5rem;
          background-color: #bcd4cd;
          color: #2e2e2e;
          text-decoration: none;
          border-radius: 0.5rem;
          font-weight: 500;
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
          transition: all 0.3s ease;
        }

        .notfound-link:hover {
          background-color: #a4c0b8;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          transform: scale(1.05);
        }

        @media (max-width: 600px) {
          .notfound-title {
            font-size: 4rem;
          }

          .notfound-message {
            font-size: 1.2rem;
          }
        }

        @keyframes fadeInSlide {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes popIn {
          0% {
            transform: scale(0.8);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

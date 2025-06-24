import React from "react";

const GoToLoomButton = () => {
  return (
    <>
      <a
        href="https://www.loom.com"
        target="_blank"
        rel="noopener noreferrer"
        className="loom-go-btn"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
          className="loom-icon"
        >
          <path
            fill="#625DF5"
            d="M40 17.776H28.303l10.13-5.849-2.224-3.854-10.13 5.849 5.847-10.13-3.854-2.225-5.847 10.129V0h-4.45v11.697l-5.85-10.13-3.852 2.225 5.848 10.129-10.13-5.848-2.224 3.853 10.13 5.849H0v4.45h11.695L1.567 28.072l2.224 3.854 10.13-5.848-5.85 10.13 3.855 2.224 5.848-10.13V40h4.45V28.304l5.847 10.13 3.854-2.225-5.849-10.13 10.13 5.848 2.225-3.854-10.129-5.848h11.696v-4.45H40ZM20 26.05a6.074 6.074 0 1 1 0-12.148 6.074 6.074 0 1 1 0 12.148Z"
          />
        </svg>

        <span>Go to Loom Website</span>
      </a>

      <style>{`
        .loom-go-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background-color: #BBD3CC;
          color: black;
          font-weight: 500;
          border-radius: 9999px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          text-decoration: none;
          transition: background-color 0.3s ease;
        }

        .loom-go-btn:hover {
          background-color: ##BBD3CC;
        }

        .loom-icon {
          width: 24px;
          height: 24px;
        }
      `}</style>
    </>
  );
};

export default GoToLoomButton;



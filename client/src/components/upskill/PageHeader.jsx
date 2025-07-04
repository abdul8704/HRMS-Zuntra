import React from "react";

export const PageHeader = () => {
  return (
    <div className="intro-header">
      <div className="text-center">
        <h2 className="title">Introduction to course</h2>
        <p className="instructor">by Prof.Dr.Diwakar</p>
      </div>

      {/* Half rectangle open to the RIGHT */}
      
      <span className="arrow"><svg xmlns="http://www.w3.org/2000/svg" width="41" height="38" fill="none" viewBox="0 0 41 38">
  <path fill="#000" fill-opacity=".5" d="M25.65 37.8a1.35 1.35 0 1 0 0-2.7H8.1a5.4 5.4 0 0 1-5.4-5.4V8.1a5.4 5.4 0 0 1 5.4-5.4h17.55a1.35 1.35 0 0 0 0-2.7H8.1A8.1 8.1 0 0 0 0 8.1v21.6a8.1 8.1 0 0 0 8.1 8.1h17.55Zm3.094-29.306a1.35 1.35 0 0 1 1.912 0l9.45 9.45a1.35 1.35 0 0 1 0 1.912l-9.45 9.45a1.351 1.351 0 1 1-1.912-1.912l7.147-7.144H12.15a1.35 1.35 0 1 1 0-2.7h23.741l-7.147-7.144a1.35 1.35 0 0 1 0-1.912Z"/>
</svg>
</span>
      

      <style>{`
        .intro-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #bbd3cc;
  padding: 1rem;
  border-radius: 0.625rem;
  margin-bottom: 2rem;
  box-shadow: 0 0.125rem 0.375rem rgba(0,0,0,0.1);
}

.text-center {
  flex-grow: 1;
  text-align: center;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
}

.instructor {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: #1f2937;
}

.right-half-rect {
  border: 0.1875rem solid #1f2937;
  border-right: none;
  border-radius: 0.5rem 0rem 0rem 0.5rem;
  height: 2.625rem;
  width: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow {
  font-size: 2.6875rem;
  font-weight: 700;
  color: #1f2937;
  width: 1.5625rem;
  display: flex;
  justify-content: left;
  align-items: center;
  transform: translateX(-0.625rem);
  margin-left: 1.25rem;
  margin-top: -0.5rem;
}

      `}</style>
    </div>
  );
};

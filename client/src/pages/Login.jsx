import React, { useState } from 'react';
import zuntraLogo from "../assets/zuntra.png";

export const Login = () => {
  const [view, setView] = useState(0); // 0: login, 1: reset, 2: signup
  const [otpSent, setOtpSent] = useState(false);

  const toggleSwitch = () => {
    if (view === 2) setView(0);
    else if (view === 0) setView(2);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpSent(true);
  };

  return (
    <div>
      <img className="login-logo-container" src={zuntraLogo} alt="ZUNTRA" />
      <div className="login-container">
        <div className={`login-card-wrapper ${view === 2 ? 'flip-right' : view === 0 ? 'flip-left' : ''}`}>
          <div className="login-card">

            {/* LOGIN VIEW */}
            {view === 0 && (
              <>
                <h1 className="login-title">Login</h1>
                <form className="login-form">
                  <input className="login-input" type="email" placeholder="Email" />
                  <input className="login-input" type="password" placeholder="Password" />
                  <p className="login-forgot" onClick={() => setView(1)}>Forgot Password?</p>
                  <button type="submit" className="login-button">Clock In</button>
                </form>
                <div className="login-divider"><span>or</span></div>
                <button type="button" className="login-google-button">
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="login-google-icon" />
                  Sign up with Google
                </button>
              </>
            )}

            {/* SIGNUP VIEW */}
            {view === 2 && (
              <>
                <h1 className="login-title">Sign up</h1>
                <form className="login-form">
                  <input className="login-input" type="text" placeholder="Name" />
                  <input className="login-input" type="email" placeholder="Email" />
                  <input className="login-input" type="tel" placeholder="Phone Number" />
                  <input className="login-input" type="password" placeholder="Password" />
                  <input className="login-input" type="password" placeholder="Confirm Password" />
                  <button type="submit" className="login-button">Sign Up</button>
                </form>
                <div className="login-divider"><span>or</span></div>
                <button type="button" className="login-google-button">
                  <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="login-google-icon" />
                  Sign up with Google
                </button>
              </>
            )}

            {/* RESET PASSWORD */}
            {view === 1 && (
              <>
                <h1 className="login-title">Reset Password</h1>
                <form className="login-form">
                  <input className="login-input" type="email" placeholder="Email" />
                  <input className="login-input" type="text" placeholder="Enter OTP" />
                  <button className="login-button" onClick={handleSendOtp}>
                    {otpSent ? "Resend OTP" : "Send OTP"}
                  </button>
                  <input className="login-input" type="password" placeholder="New Password" />
                  <input className="login-input" type="password" placeholder="Confirm Password" />
                  <button type="submit" className="login-button">Confirm</button>
                </form>
              </>
            )}

            {/* TOGGLE SWITCH */}
            {view !== 1 && (
              <div className="login-switch" onClick={toggleSwitch}>
                <span className={`login-switch-label ${view === 0 ? "login-switch-label-active" : ""}`}>Login</span>
                <div className={`login-toggle ${view === 2 ? "login-toggle-active" : ""}`}>
                  <div className={`login-knob ${view === 2 ? "login-knob-active" : ""}`}></div>
                </div>
                <span className={`login-switch-label ${view === 2 ? "login-switch-label-active" : ""}`}>Sign up</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .login-logo-container {
          position: absolute;
          width: 10rem;
          top: 1rem;
          left: 1rem;
        }

        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
          perspective: 1500px;
        }

        .login-card-wrapper {
          transition: transform 0.6s ease-in-out;
        }

        .flip-left {
          transform: rotateY(0deg);
        }

        .flip-right {
          transform: rotateY(180deg);
        }

        .login-card {
          background: white;
          border-radius: 1rem;
          width: 22rem;
          padding: 2rem 1.2rem;
          box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
          display: flex;
          flex-direction: column;
          align-items: center;
          backface-visibility: hidden;
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-input {
          width: 92%;
          font-size: 1rem;
          padding: 0.4rem 0.8rem;
          margin-top: 0.6rem;
          border-radius: 0.5rem;
          border: 0.11rem solid #000;
        }

        .login-forgot {
          width: 85%;
          text-align: right;
          font-size: 0.85rem;
          margin-top: 0.2rem;
          color: #0000ff;
          cursor: pointer;
        }

        .login-button {
          margin-top: 1rem;
          padding: 0.5rem 1.2rem;
          font-size: 1rem;
          background-color: #08BDB1;
          color: #ffffff;
          border: none;
          border-radius: 5rem;
          cursor: pointer;
        }

        .login-divider {
          width: 85%;
          display: flex;
          align-items: center;
          text-align: center;
          margin: 1rem 0 0.6rem;
        }

        .login-divider::before,
        .login-divider::after {
          content: "";
          flex: 1;
          border-top: 0.1rem solid #ccc;
        }

        .login-divider span {
          margin: 0 0.5rem;
          font-size: 0.9rem;
          color: #999;
        }

        .login-google-button {
          width: 85%;
          font-size: 0.95rem;
          padding: 0.4rem 0.8rem;
          background-color: #fff;
          color: #000;
          border: 0.125rem solid #000;
          border-radius: 5rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.6rem;
        }

        .login-google-icon {
          width: 1.25rem;
          height: 1.25rem;
        }

        .login-switch {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          margin-top: 1.2rem;
          cursor: pointer;
        }

        .login-switch-label {
          font-size: 1rem;
          color: #333;
          font-weight: 500;
        }

        .login-switch-label-active {
          text-decoration: underline;
        }

        .login-toggle {
          width: 3rem;
          height: 1.25rem;
          background-color: #ccc;
          border-radius: 1rem;
          position: relative;
          transition: background-color 0.3s;
        }

        .login-toggle-active {
          background-color: #08BDB1;
        }

        .login-knob {
          width: 1rem;
          height: 1rem;
          background-color: #fff;
          border-radius: 50%;
          position: absolute;
          top: 0.125rem;
          left: 0.125rem;
          transition: left 0.3s;
        }

        .login-knob-active {
          left: 1.625rem;
        }
      `}</style>
    </div>
  );
};

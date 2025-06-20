import React, { useState } from 'react';
import zuntraLogo from "../assets/zuntra.png";

export const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [resetData, setResetData] = useState({ email: '', otp: '', password: '', confirmPassword: '' });

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setShowReset(false);
  };

  const handleLoginChange = (e) => setLoginData({ ...loginData, [e.target.name]: e.target.value });
  const handleSignupChange = (e) => setSignupData({ ...signupData, [e.target.name]: e.target.value });
  const handleResetChange = (e) => setResetData({ ...resetData, [e.target.name]: e.target.value });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("Please enter both email and password.");
      return;
    }
    console.log('Login Data:', loginData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword } = signupData;
    if (!name || !email || !phone || !password || !confirmPassword) {
      alert("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    console.log('Signup Data:', signupData);
  };

  const handleResetSubmit = (e) => {
    e.preventDefault();
    const { email, otp, password, confirmPassword } = resetData;

    if (!otpSent) {
      if (!email) {
        alert("Please enter your email to receive OTP.");
        return;
      }
      setOtpSent(true);
      console.log('OTP sent to:', email);
    } else {
      if (!otp || !password || !confirmPassword) {
        alert("Please fill all fields.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      console.log('Reset Data:', resetData);
    }
  };

  const renderGoogleButton = () => (
    <>
      <div className="login-divider"><span>or</span></div>
      <button type="button" className="login-google-button">
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="login-google-icon" />
        Continue with Google
      </button>
    </>
  );

  return (
    <div className="login-page">
      <img className="login-logo-container" src={zuntraLogo} alt="ZUNTRA" />

      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-card">
            {!showReset ? (
              isSignup ? (
                <>
                  <h1 className="login-title">Sign up</h1>
                  <form className="login-form" onSubmit={handleSignupSubmit}>
                    <input name="name" value={signupData.name} onChange={handleSignupChange} className="login-input" type="text" placeholder="Name" />
                    <input name="email" value={signupData.email} onChange={handleSignupChange} className="login-input" type="email" placeholder="Email" />
                    <input name="phone" value={signupData.phone} onChange={handleSignupChange} className="login-input" type="tel" placeholder="Phone Number" />
                    <input name="password" value={signupData.password} onChange={handleSignupChange} className="login-input" type="password" placeholder="Password" />
                    <input name="confirmPassword" value={signupData.confirmPassword} onChange={handleSignupChange} className="login-input" type="password" placeholder="Confirm Password" />
                    <button type="submit" className="login-button">Sign Up</button>
                  </form>
                  {renderGoogleButton()}
                </>
              ) : (
                <>
                  <h1 className="login-title">Login</h1>
                  <form className="login-form" onSubmit={handleLoginSubmit}>
                    <input name="email" value={loginData.email} onChange={handleLoginChange} className="login-input" type="email" placeholder="Email" />
                    <input name="password" value={loginData.password} onChange={handleLoginChange} className="login-input" type="password" placeholder="Password" />
                    <p className="login-forgot" onClick={() => setShowReset(true)}>Forgot Password?</p>
                    <button type="submit" className="login-button">Clock In</button>
                  </form>
                  {renderGoogleButton()}
                </>
              )
            ) : (
              <>
                <h1 className="login-title">Reset Password</h1>
                <form className="login-form" onSubmit={handleResetSubmit}>
                  <input name="email" value={resetData.email} onChange={handleResetChange} className="login-input" type="email" placeholder="Enter Email" />
                  <input name="otp" value={resetData.otp} onChange={handleResetChange} className="login-input" type="text" placeholder="Enter OTP" />
                  {otpSent && (
                    <>
                      <input name="password" value={resetData.password} onChange={handleResetChange} className="login-input" type="password" placeholder="New Password" />
                      <input name="confirmPassword" value={resetData.confirmPassword} onChange={handleResetChange} className="login-input" type="password" placeholder="Confirm Password" />
                    </>
                  )}
                  <button type="submit" className="login-button">{otpSent ? "Confirm" : "Send OTP"}</button>
                </form>
              </>
            )}
            {!showReset && (
              <div className="login-switch" onClick={handleToggle}>
                <span className={`login-switch-label ${!isSignup ? "login-switch-label-active" : ""}`}>Login</span>
                <div className={`login-toggle ${isSignup ? "login-toggle-active" : ""}`}>
                  <div className={`login-knob ${isSignup ? "login-knob-active" : ""}`}></div>
                </div>
                <span className={`login-switch-label ${isSignup ? "login-switch-label-active" : ""}`}>Sign up</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
      .login-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f8f9fa;
        }

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
          width: 100%;
        }

        .login-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-switch {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          cursor: pointer;
          margin-top: 2rem;
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
          background-color: #8C8C8C;
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

        .login-card {
          background-color: #f2f1f1;
          border-radius: 1rem;
          box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
          padding: 1.5rem 1rem;
          width: 24rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .login-title {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          text-align: center;
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

        .login-input::placeholder {
          color: #000;
          opacity: 0.9;
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
          font-size: 0.75rem;
          padding: 0.6rem 1rem;
          background-color: #fff;
          color: #000;
          border: 0.104rem solid #000;
          border-radius: 5rem;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 0.5rem;
          margin-top: 0.6rem;
          transition: background-color 0.3s;
        }

        .login-google-button:hover {
          background-color: #f5f5f5;
        }

        .login-google-icon {
          width: 1.25rem;
          height: 1.25rem;
        }
        /* Already present styles remain unchanged */

@media (max-width: 768px) {
  .login-card {
    width: 90%;
    padding: 1rem 0.8rem;
  }

  .login-input {
    font-size: 0.9rem;
    padding: 0.35rem 0.7rem;
  }

  .login-button {
    font-size: 0.9rem;
    padding: 0.45rem 1rem;
  }

  .login-title {
    font-size: 1.25rem;
  }

  .login-google-button {
    font-size: 0.7rem;
    padding: 0.5rem 0.8rem;
  }

  .login-logo-container {
    width: 8rem;
    top: 0.5rem;
    left: 0.5rem;
  }

  .login-switch {
    margin-top: 1rem;
    gap: 0.8rem;
  }

  .login-switch-label {
    font-size: 0.9rem;
  }

  .login-toggle {
    width: 2.5rem;
    height: 1.1rem;
  }

  .login-knob {
    width: 0.9rem;
    height: 0.9rem;
    top: 0.1rem;
    left: 0.1rem;
  }

  .login-knob-active {
    left: 1.5rem;
  }
}

@media (max-width: 480px) {
  .login-title {
    font-size: 1.15rem;
  }

  .login-input {
    width: 95%;
    font-size: 0.85rem;
  }

  .login-google-icon {
    width: 1rem;
    height: 1rem;
  }

  .login-divider span {
    font-size: 0.8rem;
  }
}

      `}</style>
    </div>
  );
};

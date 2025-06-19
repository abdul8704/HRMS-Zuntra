import React, { useState, useEffect } from "react"; 
import zuntraLogo from "../assets/zuntra.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Popup } from "../components/Popup";

export const Login = () => {
  const [view, setView] = useState(0); // 0: login, 1: reset password, 2: signup
  const [otpSent, setOtpSent] = useState(false);
  const [flipDirection, setFlipDirection] = useState("");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", confirmpassword: "" });
  const [forgotPasswordData, setForgotPasswordData] = useState({ email: "", otp: "", password: "", confirmpassword: "" });
  const [forgotStep, setForgotStep] = useState("email");
  const [popupMessage, setPopupMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (popupMessage) {
      const timer = setTimeout(() => setPopupMessage(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [popupMessage]);

  const handleToggleSwitch = () => {
    if (view === 0) {
      setFlipDirection("flip-left-to-right");
      setTimeout(() => setView(2), 300);
    } else if (view === 2) {
      setFlipDirection("flip-right-to-left");
      setTimeout(() => setView(0), 300);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setPopupMessage({ message: "Please wait...", color: { background: "#d1ecf1", border: "#bee5eb", text: "#0c5460" } });
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/existinguser`, loginData);
      if (response.status === 200) {
        const role = response.data.userDetails.role;
        const popupData = {
          message: `Welcome back ${response.data.userDetails.username}!\nThe internet missed you,\neven the cookies were asking where you went.`,
          color: { background: "#d4edda", border: "#c3e6cb", text: "#155724" }
        };
        const userId = response.data.userDetails.userid;
        if (role === "admin") {
          navigate(`/admin/dashboard/${userId}/employee/details`, { state: { popupMessage: popupData } });
        } else {
          navigate(`/user/dashboard/${userId}`, { state: { popupMessage: popupData } });
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Something went wrong. Please try again.";
      setPopupMessage({ message: errorMessage, color: { background: "#f8d7da", border: "#f5c6cb", text: "#721c24" } });
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!otpSent) {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/signup/check`, { useremail: signupData.email });
        setPopupMessage({ message: "Please wait...", color: { background: "#d1ecf1", border: "#bee5eb", text: "#0c5460" } });
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/signup/send-otp`, { useremail: signupData.email });
        setPopupMessage({ message: "OTP sent to your email", color: { background: "#d1ecf1", border: "#bee5eb", text: "#0c5460" } });
        setOtpSent(true);
        setSignupData({ ...signupData, confirmpassword: "" });
      } catch (err) {
        if (err.response?.status === 400 && err.response.data.message === "User already exists") {
          setPopupMessage({ message: "User with this email already exists", color: { background: "#fff3cd", border: "#ffeeba", text: "#856404" } });
        } else {
          setPopupMessage({ message: "Network error: " + err.message, color: { background: "#f8d7da", border: "#f5c6cb", text: "#721c24" } });
        }
      }
    } else {
      try {
        setPopupMessage({ message: "Please wait...", color: { background: "#d1ecf1", border: "#bee5eb", text: "#0c5460" } });
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/signup/verify-otp`, { useremail: signupData.email, otp: signupData.confirmpassword });
        const signUp = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/signup/newuser`, {
          username: signupData.name,
          email: signupData.email,
          password: signupData.password
        });
        if (signUp.status === 201) {
          setPopupMessage({ message: "Signup successful! Welcome aboard 🎉", color: { background: "#d4edda", border: "#c3e6cb", text: "#155724" } });
          setTimeout(() => navigate(`/user/dashboard/${signUp.data.userid}`), 900);
        }
      } catch (err) {
        setPopupMessage({ message: "Incorrect OTP", color: { background: "#f8d7da", border: "#f5c6cb", text: "#721c24" } });
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      setPopupMessage({ message: "Please wait...", color: { background: "#d1ecf1", border: "#bee5eb", text: "#0c5460" } });
      if (forgotStep === "email") {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/forgot-password/send-otp`, { useremail: forgotPasswordData.email });
        setPopupMessage({ message: "OTP sent to your email", color: { background: "#d1ecf1", border: "#bee5eb", text: "#0c5460" } });
        setForgotStep("otp");
      } else if (forgotStep === "otp") {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/forgot-password/verify-otp`, { useremail: forgotPasswordData.email, otp: forgotPasswordData.otp });
        setPopupMessage({ message: "OTP verified! Now set your new password", color: { background: "#d4edda", border: "#c3e6cb", text: "#155724" } });
        setForgotStep("password");
      } else {
        if (forgotPasswordData.password !== forgotPasswordData.confirmpassword) {
          setPopupMessage({ message: "Passwords do not match", color: { background: "#f8d7da", border: "#f5c6cb", text: "#721c24" } });
          return;
        }
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/login/forgot-password/reset-password`, {
          email: forgotPasswordData.email,
          newPassword: forgotPasswordData.password
        });
        setPopupMessage({ message: "Password reset successful!", color: { background: "#d4edda", border: "#c3e6cb", text: "#155724" } });
        setTimeout(() => setView(0), 2000);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error occurred. Try again.";
      setPopupMessage({ message: errorMessage, color: { background: "#f8d7da", border: "#f5c6cb", text: "#721c24" } });
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
    <div>
      <img className="login-logo-container" src={zuntraLogo} alt="ZUNTRA" />
      {popupMessage && <Popup message={popupMessage.message} color={popupMessage.color} />}
      <div className="login-container">
        <div className={`login-card ${flipDirection}`} onAnimationEnd={() => setFlipDirection('')}>
          {view === 0 && (
            <>
              <h1 className="login-title">Login</h1>
              <form className="login-form" onSubmit={handleLoginSubmit}>
                <input className="login-input" type="email" placeholder="Email" name="email" value={loginData.email} onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} required />
                <input className="login-input" type="password" placeholder="Password" name="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                <p className="login-forgot" onClick={() => setView(1)}>Forgot Password?</p>
                <button type="submit" className="login-button">Clock In</button>
              </form>
              {renderGoogleButton()}
            </>
          )}

          {view === 1 && (
            <>
              <h1 className="login-title">Reset Password</h1>
              <form className="login-form" onSubmit={handleForgotPasswordSubmit}>
                {forgotStep !== "password" && (
                  <input className="login-input" type="email" placeholder="Email" name="email" value={forgotPasswordData.email} onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })} required />
                )}
                {forgotStep === "otp" && (
                  <input className="login-input" type="text" placeholder="Enter OTP" name="otp" value={forgotPasswordData.otp} onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, otp: e.target.value })} required />
                )}
                {forgotStep === "password" && (
                  <>
                    <input className="login-input" type="password" placeholder="New Password" name="password" value={forgotPasswordData.password} onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, password: e.target.value })} required />
                    <input className="login-input" type="password" placeholder="Confirm Password" name="confirmpassword" value={forgotPasswordData.confirmpassword} onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, confirmpassword: e.target.value })} required />
                  </>
                )}
                <button type="submit" className="login-button">{forgotStep === "email" ? "Send OTP" : forgotStep === "otp" ? "Verify" : "Confirm"}</button>
              </form>
            </>
          )}

          {view === 2 && (
            <>
              <h1 className="login-title">Sign up</h1>
              <form className="login-form" onSubmit={handleSignupSubmit}>
                <input className="login-input" type="text" placeholder="Name" name="name" value={signupData.name} onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} required />
                <input className="login-input" type="email" placeholder="Email" name="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />
                <input className="login-input" type="password" placeholder="Password" name="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
                <input className="login-input" type={otpSent ? "text" : "password"} placeholder={otpSent ? "Enter OTP" : "Confirm Password"} name="confirmpassword" value={signupData.confirmpassword} onChange={(e) => setSignupData({ ...signupData, confirmpassword: e.target.value })} required />
                <button type="submit" className="login-button">{otpSent ? "Confirm" : "Sign Up"}</button>
              </form>
              {renderGoogleButton()}
            </>
          )}

          {(view === 0 || view === 2) && (
            <div className="login-switch" onClick={handleToggleSwitch}>
              <span className={`login-switch-label ${view === 0 ? "login-switch-label-active" : ""}`}>Login</span>
              <div className={`login-toggle ${view === 2 ? "login-toggle-active" : ""}`}>
                <div className={`login-knob ${view === 2 ? "login-knob-active" : ""}`}></div>
              </div>
              <span className={`login-switch-label ${view === 2 ? "login-switch-label-active" : ""}`}>Sign up</span>
            </div>
          )}
        </div>
      </div>
      <style jsx>{`
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
  }

  .login-logo-container {
    position: absolute;
    width: 10rem;
    top: 1rem;
    left: 1rem;
  }

  .login-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 1rem;
    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
    padding: 1.5rem 1rem;
    background-color: #f2f1f1;
    width: 24rem;
    max-height: 95vh;
    overflow-y: auto;
    backface-visibility: hidden;
    transform-style: preserve-3d;
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
    border: 0.104rem solid #000;
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

  .login-button:hover {
    background-color: #069e96;
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

  .login-card.flip-left-to-right {
    animation: flipLeftToRight 0.6s forwards;
  }

  .login-card.flip-right-to-left {
    animation: flipRightToLeft 0.6s forwards;
  }

  @keyframes flipLeftToRight {
    0% { transform: rotateY(0); }
    100% { transform: rotateY(180deg); }
  }

  @keyframes flipRightToLeft {
    0% { transform: rotateY(180deg); }
    100% { transform: rotateY(0); }
  }

  @media (max-width: 768px) {
    .login-card {
      width: 90vw;
      padding: 1.2rem 1rem;
    }

    .login-title {
      font-size: 1.25rem;
    }

    .login-input {
      width: 95%;
      font-size: 0.95rem;
    }

    .login-button,
    .login-google-button {
      width: 95%;
      font-size: 0.70rem;
      padding: 0.5rem;
    }

    .login-divider {
      width: 95%;
    }

    .login-forgot {
      width: 95%;
      font-size: 0.8rem;
    }

    .login-switch-label {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 480px) {
    .login-title {
      font-size: 1.1rem;
    }

    .login-input {
      font-size: 0.9rem;
      padding: 0.35rem 0.7rem;
    }

    .login-button,
    .login-google-button {
      font-size: 0.9rem;
      padding: 0.45rem;
    }

    .login-google-icon {
      width: 1rem;
      height: 1rem;
    }

    .login-logo-container {
      width: 8rem;
      top: 0.5rem;
      left: 0.5rem;
    }
  }
`}</style>
    </div>
  );
};

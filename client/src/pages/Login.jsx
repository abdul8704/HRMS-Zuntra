import React, { useState } from 'react';
import zuntraLogo from "../assets/zuntra.png";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpPhase, setOtpPhase] = useState(false);
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', otp: '' });
  const [resetData, setResetData] = useState({ email: '', otp: '', password: '', confirmPassword: '' });

  const [formErrors, setFormErrors] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '', otp: ''
  });

  const [showPassword, setShowPassword] = useState(true);

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setShowReset(false);
    setFormErrors({});
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^@\s]+\.(com|in)$/.test(email);
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));

    setFormErrors(prev => {
      const updated = { ...prev, [name]: '' };

      if (name === "email" && value && !validateEmail(value)) {
        updated.email = "Enter a valid email.";
      }
      if (name === "confirmPassword" && value !== signupData.password) {
        updated.confirmPassword = "Passwords do not match.";
      }

      return updated;
    });
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));

    setFormErrors(prev => {
      const updated = { ...prev, [name]: '' };

      if (name === "email" && value && !validateEmail(value)) {
        updated.email = "Enter a valid email.";
      }

      return updated;
    });
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData(prev => ({ ...prev, [name]: value }));

    setFormErrors(prev => {
      const updated = { ...prev, [name]: '' };

      if (name === "email" && value && !validateEmail(value)) {
        updated.email = "Enter a valid email.";
      }

      if (name === "confirmPassword" && value !== resetData.password) {
        updated.confirmPassword = "Passwords do not match.";
      }

      return updated;
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const errors = { email: '', password: '' };
    let valid = true;

    if (!loginData.email) {
      errors.email = "Email is required.";
      valid = false;
    } else if (!validateEmail(loginData.email)) {
      errors.email = "Enter a valid email.";
      valid = false;
    }

    if (!loginData.password) {
      errors.password = "Password is required.";
      valid = false;
    }

    setFormErrors(errors);
    if (!valid) return;

    try {
      const response = await api.post("/auth/login", loginData);
      if (response.status !== 200) return alert("Something went wrong");

      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await api.post("/auth/geofence", {
            latitude, longitude, email: loginData.email
          });

          if (res.status === 200) {
            console.log("Attendance Marked");
            navigate("/dashboard");
          } else if (res.status === 206) {
            alert("Your signup request is pending approval.");
            navigate("/");
          }
        },
        (error) => console.error("Error getting location:", error)
      );
    } catch (err) {
      if (err?.response?.status === 401) {
        const msg = err.response.data?.data?.message;
        alert(msg === "Wrong Password" ? "Wrong Password!!" : "User not found!!");
      } else {
        console.log(err.response);
      }
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword, otp } = signupData;

    const errors = {
      name: '', email: '', phone: '', password: '', confirmPassword: '', otp: ''
    };
    let valid = true;

    if (!otpPhase) {
      if (!name) { errors.name = "Name is required."; valid = false; }
      if (!email) { errors.email = "Email is required."; valid = false; }
      else if (!validateEmail(email)) { errors.email = "Enter a valid email."; valid = false; }
      if (!phone) { errors.phone = "Phone number is required."; valid = false; }
      if (!password) { errors.password = "Password is required."; valid = false; }
      if (!confirmPassword || confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match.";
        valid = false;
      }

      setFormErrors(errors);
      if (!valid) return;

      try {
        const userExist = await api.post("/auth/check", { email });
        if (userExist.data.exists) return alert("User already exists");

        const sendotp = await api.post("/auth/signup/send-otp", { useremail: email });
        if (sendotp.status === 200) {
          setOtpPhase(true);
          alert("OTP sent to your email/phone.");
        } else alert("Failed to send OTP");
      } catch (error) {
        alert("Something went wrong");
      }

    } else {
      if (!otp) {
        setFormErrors(prev => ({ ...prev, otp: "Please enter the OTP." }));
        return;
      }

      try {
        const verifyOtp = await api.post("/auth/signup/verify-otp", { useremail: email, otp });
        if (verifyOtp.status === 200) {
          const newUser = await api.post("/auth/signup/newuser", {
            username: name, email, phoneNum: phone, password
          });

          if (newUser.status === 200) {
            localStorage.setItem("accessToken", newUser.data.accessToken);
            alert("Signup successful! Login to your account.");
            setSignupData({ name: '', email: '', phone: '', password: '', confirmPassword: '', otp: '' });
            setFormErrors({});
            setIsSignup(false);
            setOtpPhase(false);
            navigate("/");
          } else alert("Failed to create user");
        }
      } catch (error) {
        if (error.response?.data?.error === "Incorrect OTP") {
          setFormErrors(prev => ({ ...prev, otp: "Incorrect OTP" }));
        } else {
          alert("Something went wrong");
        }
      }
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const { email, otp, password, confirmPassword } = resetData;

    const errors = { email: '', otp: '', password: '', confirmPassword: '' };
    let valid = true;

    if (!otpSent) {
      if (!email) { errors.email = "Email is required."; valid = false; }
      else if (!validateEmail(email)) { errors.email = "Enter a valid email."; valid = false; }
      setFormErrors(errors);
      if (!valid) return;

      try {
        const userExist = await api.post("/auth/check", { email });
        if (!userExist.data.exists) return alert("We couldn't find a user with this email");

        const sendotp = await api.post("/auth/signup/send-otp", { useremail: email });
        if (sendotp.status === 200) {
          setOtpSent(true);
          alert("OTP sent to your email/phone.");
        } else alert("Failed to send OTP");
      } catch (error) {
        alert("Something went wrong");
      }
    } else if (!otpVerified) {
      if (!otp) {
        setFormErrors(prev => ({ ...prev, otp: "Please enter the OTP." }));
        return;
      }

      try {
        const verifyOtp = await api.post("/auth/signup/verify-otp", { useremail: email, otp });
        if (verifyOtp.status === 200) setOtpVerified(true);
        else alert("Something went wrong");
      } catch (error) {
        if (error.response?.data?.error === "Incorrect OTP") {
          setFormErrors(prev => ({ ...prev, otp: "Incorrect OTP" }));
        } else alert("Something went wrong");
      }
    } else {
      if (!password) { errors.password = "Password is required."; valid = false; }
      if (!confirmPassword || confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match.";
        valid = false;
      }

      setFormErrors(errors);
      if (!valid) return;

      try {
        const resetPass = await api.post("/auth/reset-password", { email, password });
        if (resetPass) {
          alert("Password Changed Successfully");
          setShowReset(false);
          setOtpSent(false);
          setOtpVerified(false);
          setResetData({ email: '', otp: '', password: '', confirmPassword: '' });
        }
      } catch (error) {
        alert("Something went wrong");
      }
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
    <>
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
                      <div className="login-input-container">
                        <div>
                          <input name="name" value={signupData.name} onChange={handleSignupChange} className="login-input" type="text" placeholder="Name" />
                          {formErrors.name && <p className="login-error-text">{formErrors.name}</p>}
                        </div>
                        <div>
                          <input name="email" value={signupData.email} onChange={handleSignupChange} className="login-input" type="email" placeholder="Email" />
                          {formErrors.email && <p className="login-error-text">{formErrors.email}</p>}
                        </div>
                        <div>
                          <input name="phone" value={signupData.phone} onChange={handleSignupChange} className="login-input" type="tel" placeholder="Phone Number" />
                          {formErrors.phone && <p className="login-error-text">{formErrors.phone}</p>}
                        </div>

                        {!otpPhase ? (
                          <>
                            <div>
                              <input name="password" value={signupData.password} onChange={handleSignupChange} className="login-input" type="password" placeholder="Password" />
                              {formErrors.password && <p className="login-error-text">{formErrors.password}</p>}
                            </div>
                            <div>
                              <input name="confirmPassword" value={signupData.confirmPassword} onChange={handleSignupChange} className="login-input" type="password" placeholder="Confirm Password" />
                              {formErrors.confirmPassword && <p className="login-error-text">{formErrors.confirmPassword}</p>}
                            </div>
                          </>
                        ) : (
                          <div>
                            <input name="otp" value={signupData.otp} onChange={handleSignupChange} className="login-input" type="text" placeholder="Enter OTP" />
                            {formErrors.otp && <p className="login-error-text">{formErrors.otp}</p>}
                          </div>
                        )}
                      </div>
                      <button type="submit" className="login-button">{otpPhase ? "Submit" : "Sign Up"}</button>
                    </form>
                    {renderGoogleButton()}
                  </>
                ) : (
                  <>
                    <h1 className="login-title">Login</h1>
                    <form className="login-form" onSubmit={handleLoginSubmit}>
                      <div className="login-input-container">
                        <div>
                          <input name="email" value={loginData.email} onChange={handleLoginChange} className="login-input" type="email" placeholder="Email" />
                          {formErrors.email && <p className="login-error-text">{formErrors.email}</p>}
                        </div>
                        <div style={{ position: 'relative' }}>
                          <input
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                            className="login-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            required
                          />

                          <div
                            className="login-password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            role="button"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                          >
                            {showPassword ? (
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgba(32, 30, 30, 0.82)">
                                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="rgba(32, 30, 30, 0.82)">
                                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                              </svg>
                            )}
                          </div>
                        </div>

                      </div>
                      <div className="login-forgot-container">
                        {formErrors.password && <p className="login-error-text flex-[1]">{formErrors.password}</p>}
                        <label className="login-forgot" onClick={() => setShowReset(true)}>Forgot Password?</label>
                      </div>
                      <button type="submit" className="login-button">Clock in</button>
                    </form>
                    {renderGoogleButton()}
                  </>
                )
              ) : (
                <>
                  <h1 className="login-title">Reset Password</h1>
                  <form className="login-form" onSubmit={handleResetSubmit}>
                    <div className="login-input-container">
                      {!otpSent && (
                        <div>
                          <input name="email" value={resetData.email} onChange={handleResetChange} className="login-input" type="email" placeholder="Enter Email" />
                          {formErrors.email && <p className="login-error-text">{formErrors.email}</p>}
                        </div>
                      )}
                      {otpSent && !otpVerified && (
                        <div>
                          <input name="otp" value={resetData.otp} onChange={handleResetChange} className="login-input" type="text" placeholder="Enter OTP" />
                          {formErrors.otp && <p className="login-error-text">{formErrors.otp}</p>}
                        </div>
                      )}
                      {otpVerified && (
                        <>
                          <div>
                            <input name="password" value={resetData.password} onChange={handleResetChange} className="login-input" type="password" placeholder="New Password" />
                            {formErrors.password && <p className="login-error-text">{formErrors.password}</p>}
                          </div>
                          <div>
                            <input name="confirmPassword" value={resetData.confirmPassword} onChange={handleResetChange} className="login-input" type="password" placeholder="Confirm Password" />
                            {formErrors.confirmPassword && <p className="login-error-text">{formErrors.confirmPassword}</p>}
                          </div>
                        </>
                      )}
                    </div>
                    <button type="submit" className="login-button">
                      {!otpSent ? "Send OTP" : !otpVerified ? "Submit" : "Confirm"}
                    </button>
                    <div className="back-login-container">
                      <label className="back-login" onClick={() => {
                        setShowReset(false);
                        setOtpSent(false);
                        setOtpVerified(false);
                        setFormErrors({});
                        setResetData({ email: '', otp: '', password: '', confirmPassword: '' });
                      }}>
                        Back to login
                      </label>
                    </div>
                  </form>
                </>
              )}
              {!showReset && (
                <div className="login-switch" onClick={handleToggle}>
                  <h6 className={`login-switch-label ${!isSignup ? "login-switch-label-active" : ""}`}>Clock in</h6>
                  <div className={`login-toggle ${isSignup ? "login-toggle-active" : ""}`}>
                    <div className={` ${isSignup ? "login-knob-active" : "login-knob"}`}></div>
                  </div>
                  <h6 className={`login-switch-label ${isSignup ? "login-switch-label-active" : ""}`}>Sign up</h6>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
  .login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    position: relative;
    padding: 1rem;
    box-sizing: border-box;
  }

  .login-logo-container {
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 9rem;
  }

  .login-card {
    background-color: #f2f1f1;
    border-radius: 0.7rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    padding: 2rem;
    width: 26rem;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
  }

  .login-title {
    font-size: clamp(1.25rem, 4vw, 1.75rem);
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
    line-height: 1.2;
  }

  .login-form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .login-input-container{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem; 
  }

  .login-input {
    width: 100%;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    padding: clamp(0.5rem, 1.5vw, 0.6rem) clamp(0.7rem, 2vw, 0.9rem);
    border-radius: 0.5rem;
    border: 1px solid #aaa;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
  }

  .login-input:focus {
  border-color: #08BDB1;
  outline: none;
  border-width: 1.7px;
}

  .login-input::placeholder {
    color: #888;
  }

  .login-password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color:rgb(15, 15, 16);
  width: 23px;
  height: 23px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  padding: 2px;
}

  .login-forgot-container {
    display:flex;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
  }

  .back-login-container {
    margin-top: 0.9rem;
    align-self: center;
    text-align: center;
    width: 100%;
  }
  
  .login-forgot {
    margin-top: 4px;
    font-size: clamp(0.7rem, 2vw, 0.8rem);
    color: #215E97;;
    cursor: pointer;
    text-align: right;
    word-wrap: break-word;
    flex: 1;
  }

  .back-login {
    text-decoration: underline;
    width: 100%;
    text-align: center;
    font-size: clamp(0.7rem, 2vw, 0.8rem);
    color: #215E97;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
    word-wrap: break-word;
  }

  .login-button {
    background-color: #08BDB1;
    color: white;
    padding: clamp(0.5rem, 1.5vw, 0.6rem) clamp(0.5rem, 1.5vw, 0.6rem);
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    border: none;
    border-radius: 2rem;
    cursor: pointer;
    width: 40%;
    min-width: 6rem;
    transition: background-color 0.3s;
    margin-top: 1rem;
  }

  .login-button:hover {
    background-color: #07a599;
  }

  .login-divider {
    width: 100%;
    display: flex;
    align-items: center;
    text-align: center;
    margin: 1.5rem 0 1.5rem;
  }

  .login-divider::before,
  .login-divider::after {
    content: "";
    flex: 1;
    border-top: 1px solid #ccc;
  }

  .login-divider span {
    margin: 0 0.5rem;
    font-size: clamp(0.75rem, 2vw, 0.85rem);
    color: #999;
    white-space: nowrap;
  }

  .login-google-button {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: clamp(0.45rem, 1.4vw, 0.55rem);
    border: 1px solid #000;
    border-radius: 2rem;
    background-color: #fff;
    cursor: pointer;
    font-size: clamp(0.75rem, 2vw, 0.85rem);
    margin-bottom: 1.8rem;
    transition: background-color 0.3s;
    box-sizing: border-box;
  }

  .login-google-button:hover {
    background-color: #f0f0f0;
  }

  .login-google-icon {
    width: clamp(1rem, 3vw, 1.25rem);
    height: clamp(1rem, 3vw, 1.25rem);
    flex-shrink: 0;
  }

  .login-switch {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(0.5rem, 2vw, 1rem);
    font-size: clamp(0.75rem, 2vw, 0.85rem);
    flex-wrap: wrap;
  }

  .login-switch-label {
    font-weight: 500;
    color: #333;
    white-space: nowrap;
  }

  .login-switch-label-active {
    text-decoration: underline;
  }

  .login-toggle {
    width: clamp(2.5rem, 7vw, 3rem);
    height: clamp(1.1rem, 3vw, 1.3rem);
    background-color: #8c8c8c;
    border-radius: 1rem;
    position: relative;
    transition: background-color 0.3s;
    flex-shrink: 0;
  }

  .login-toggle-active {
    background-color: #08bdb1;
  }

  .login-knob {
    width: clamp(1rem, 3vw, 1.3rem);
    height: clamp(1rem, 3vw, 1.3rem);
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 0rem;
    left: 0rem;
    border: 0.2rem solid #8c8c8c;
    transition: left 0.3s;
    box-sizing: border-box;
  }
    
  .login-knob-active {
    width: clamp(1rem, 3vw, 1.3rem);
    height: clamp(1rem, 3vw, 1.3rem);
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    top: 0rem;
    transition: left 0.3s;
    border: 0.2rem solid #08bdb1;
    right: 0rem;
    box-sizing: border-box;
  }

  .login-error-text {
    color: #dc2626;
    font-size: 0.675rem;
    margin-top: 0.25rem;
    margin-left: 0.25rem;
  }

  /* Tablet and smaller desktop styles */
  @media (max-width: 1024px) {
    .login-logo-container {
      width: 8rem;
    }
  }

  /* Tablet styles */
  @media (max-width: 768px) {
    .login-page {
      padding: 0.5rem;
    }
    
    .login-logo-container {
      top: 0.5rem;
      left: 0.5rem;
      width: 7rem;
    }

    .login-card {
      padding: 1.5rem;
      margin: 0.5rem;
    }

    .login-switch {
      gap: 0.5rem;
    }
  }

  /* Mobile landscape */
  @media (max-width: 640px) and (orientation: landscape) {
    .login-page {
      height: auto;
      min-height: 100vh;
      padding: 0.5rem;
    }
    
    .login-card {
      margin: 1rem 0;
    }
  }

  /* Mobile portrait */
  @media (max-width: 480px) {
    .login-page {
      padding: 0.25rem;
    }
    
    .login-logo-container {
      top: 0.25rem;
      left: 0.25rem;
      width: 6rem;
    }

    .login-card {
      padding: 1.25rem;
      margin: 0.25rem;
      border-radius: 0.5rem;
    }

    .login-input {
      margin-bottom: 0.8rem;
    }

    .login-title {
      margin-bottom: 1.25rem;
    }

    .login-google-button {
      margin-bottom: 1.5rem;
    }

    .login-switch {
      gap: 0.5rem;
      text-align: center;
    }
  }

  /* Very small screens */
  @media (max-width: 320px) {
    .login-card {
      padding: 1rem;
    }
    
    .login-button {
      width: 50%;
      min-width: 5rem;
    }
  }

  /* High DPI screens */
  @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
    .login-card {
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }
  }

  /* Reduced motion preference */
  @media (prefers-reduced-motion: reduce) {
    .login-button,
    .login-google-button,
    .login-toggle,
    .login-knob,
    .login-knob-active {
      transition: none;
    }
  }

`}</style>
    </>
  );
};

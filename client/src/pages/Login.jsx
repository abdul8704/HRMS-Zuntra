import React, { useState } from 'react';
import zuntraLogo from "../assets/zuntra.png";
import api from "../api/axios";
import { useNavigate } from "react-router-dom"


export const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpPhase, setOtpPhase] = useState(false);
  const navigate = useNavigate();


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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("Please enter both email and password.");
      return;
    }
    try {
      const response = await api.post("/auth/login", loginData);
      if (response.status !== 200) {
        alert("Something went wrong")
      }
      const token = response.data.accessToken;
      localStorage.setItem("accessToken", token);

      if (!navigator.geolocation) {
        console.error("Geolocation is not supported by your browser");
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          const res = await api.post("/auth/geofence", {
            latitude: latitude,
            longitude: longitude,
            email: loginData.email
          })

          if (res.status === 200) {
            console.log("Attendace Marked buddy");
            navigate("/dashboard")
          }
          else if (res.status === 206) {
            console.log("attendance not marked");
            navigate("/");
            //TODO: after implementing authentication, let new user see the waiting page. 
            alert("Your signup request is pending approval. Please wait for the HR to approve your request.");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
    catch (err) {
      if (err.status === 401) {
        if (err.response.data.data.message === "Wrong Password") {
          alert("Wrong Password!!")
        }
        else if (err.response.data.data.message === 'User not found') {
          alert("User not found!!")
        }
        console.log(err.response.data);

      }
    }

  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, confirmPassword, otp } = signupData;

    try {
      if (!otpPhase) {
        if (!name || !email || !phone || !password || !confirmPassword) {
          alert("All fields are required.");
          return;
        }
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }

        const userExist = await api.post("/auth/check", {
          email: email
        })

        if (userExist.data.exists === true) {
          alert("User already exists");
          return;
        }
        const sendotp = await api.post("/auth/signup/send-otp", {
          useremail: email
        })

        if (sendotp.status === 200) {
          setOtpPhase(true);
          alert("OTP sent to your email/phone.");
          return;
        }
        else {
          alert("Failed to send OTP");
          return;
        }

      }
      else {
        if (!otp) {
          alert("Please enter the OTP.");
          return;
        }

        const verifyOtp = await api.post("/auth/signup/verify-otp", {
          useremail: email,
          otp: otp
        })

        console.log(verifyOtp)

        if (verifyOtp.status === 200) {
          const newUser = await api.post("/auth/signup/newuser", {
            username: name,
            email: email,
            phoneNum: phone,
            password: password
          })
          console.log(newUser)

          if (newUser.status === 200) {
            localStorage.setItem("accessToken", newUser.data.accessToken)
            
            setIsSignup(false);
            setOtpPhase(false);
            setSignupData({ name: '', email: '', phone: '', password: '', confirmPassword: '', otp: '' });
            alert("Signup successful! login to your account");
            //TODO: after implementing authentication, let new user see the waiting page. 
            navigate("/")

          }
          else {
            alert("Failed to create user");
            return;
          }
        }
      }
    }
    catch (error) {
      if (error.response.data.error === "Incorrect OTP")
        alert("Incorrect OTP")
      else {
        alert("Something went wrong")
        console.log(error.response)
      }
    }
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const { email, otp, password, confirmPassword } = resetData;

    try {
      if (!otpSent) {
        if (!email) {
          alert("Please enter your email to receive OTP.");
          return;
        }
        const userExist = await api.post("/auth/check", {
          email: email
        })

        if (userExist.data.exists === false) {
          alert("We couldn't find a user with this email");
          return;
        }

        const sendotp = await api.post("/auth/signup/send-otp", {
          useremail: email
        })

        if (sendotp.status === 200) {
          setOtpSent(true);
          alert("OTP sent to your email/phone.");
          return;
        }
        else {
          alert("Failed to send OTP");
          return;
        }
      }
      else if (!otpVerified) {
        if (!otp) {
          alert("Please enter the OTP.");
          return;
        }

        const verifyOtp = await api.post("/auth/signup/verify-otp", {
          useremail: email,
          otp: otp
        })

        if (verifyOtp.status !== 200) {
          alert("Something went wrong")
          return
        }
        setOtpVerified(true);


      }
      else {
        if (!password || !confirmPassword) {
          alert("Please fill all password fields.");
          return;
        }
        if (password !== confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
        const resetPass = await api.post("/auth/reset-password", {
          email: email,
          password: password
        })

        if (resetPass) {
          alert("Password Changed Successfully")
          setShowReset(false);
          setOtpSent(false);
          setOtpVerified(false);
          setResetData({ email: '', otp: '', password: '', confirmPassword: '' });
          return;
        }
      }
    } catch (error) {
      if (error.response.data.error === "Incorrect OTP")
        alert("Incorrect OTP")
      else {
        alert("Something went wrong")
        console.log(error.response)
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

                    {!otpPhase ? (
                      <>
                        <input name="password" value={signupData.password} onChange={handleSignupChange} className="login-input" type="password" placeholder="Password" />
                        <input name="confirmPassword" value={signupData.confirmPassword} onChange={handleSignupChange} className="login-input" type="password" placeholder="Confirm Password" />
                      </>
                    ) : (
                      <input name="otp" value={signupData.otp} onChange={handleSignupChange} className="login-input" type="text" placeholder="Enter OTP" />
                    )}

                    <div className="login-forgot"></div>
                    <button type="submit" className="login-button">{otpPhase ? "Submit" : "Sign Up"}</button>
                  </form>
                  {renderGoogleButton()}
                </>
              ) : (
                <>
                  <h1 className="login-title">Login</h1>
                  <form className="login-form" onSubmit={handleLoginSubmit}>
                    <input name="email" value={loginData.email} onChange={handleLoginChange} className="login-input" type="email" placeholder="Email" />
                    <input style={{ marginBottom: 0 }} name="password" value={loginData.password} onChange={handleLoginChange} className="login-input" type="password" placeholder="Password" />
                    <div className="login-forgot-container"><label className="login-forgot" onClick={() => setShowReset(true)}>Forgot Password?</label></div>
                    <button type="submit" className="login-button">Clock in</button>
                  </form>
                  {renderGoogleButton()}
                </>
              )
            ) : (
              <>
                <h1 className="login-title">Reset Password</h1>
                <form className="login-form" onSubmit={handleResetSubmit}>
                  {!otpSent && (
                    <input
                      name="email"
                      value={resetData.email}
                      onChange={handleResetChange}
                      className="login-input"
                      type="email"
                      placeholder="Enter Email"
                    />
                  )}
                  {otpSent && !otpVerified && (
                    <input
                      name="otp"
                      value={resetData.otp}
                      onChange={handleResetChange}
                      className="login-input"
                      type="text"
                      placeholder="Enter OTP"
                    />
                  )}
                  {otpVerified && (
                    <>
                      <div style={{ fontSize: '0.9rem', color: '#555', marginBottom: '0.5rem' }}>
                      </div>
                      <input
                        name="password"
                        value={resetData.password}
                        onChange={handleResetChange}
                        className="login-input"
                        type="password"
                        placeholder="New Password"
                      />
                      <input
                        name="confirmPassword"
                        value={resetData.confirmPassword}
                        onChange={handleResetChange}
                        className="login-input"
                        type="password"
                        placeholder="Confirm Password"
                      />
                    </>
                  )}
                  <button type="submit" className="login-button">
                    {!otpSent ? "Send OTP" : !otpVerified ? "Submit" : "Confirm"}
                  </button>
                  <div className="back-login-container">
                    <label className="back-login" onClick={() => {
                      setShowReset(false);
                      setOtpSent(false);
                      setOtpVerified(false);
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

  .login-input {
    width: 100%;
    font-size: clamp(0.9rem, 2.5vw, 1rem);
    padding: clamp(0.5rem, 1.5vw, 0.6rem) clamp(0.7rem, 2vw, 0.9rem);
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #aaa;
    background-color: #fff;
    box-sizing: border-box;
  }

  .login-input:focus {
  border-color: #08BDB1;
  outline: none;
  border-width: 1.7px;
}

  .login-input::placeholder {
    color: #888;
  }

  .login-forgot-container {
    align-self: flex-end;
    margin-bottom: 0.8rem;
    text-align: right;
    width: 100%;
  }

  .back-login-container {
    margin-top: 0.9rem;
    align-self: center;
    text-align: center;
    width: 100%;
  }
  
  .login-forgot {
    width: 100%;
    font-size: clamp(0.7rem, 2vw, 0.8rem);
    color: #215E97;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
    cursor: pointer;
    word-wrap: break-word;
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
    </div>
  );
};
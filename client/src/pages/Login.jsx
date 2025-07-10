import React, { useState } from 'react';
import zuntraLogo from "../assets/zuntra.png";
import userIcon from "../assets/user-icon.jpg";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { PopupCard } from '../components/PopupCard';
import { Loading } from "../components/Loading";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showResetConfirmPassword, setShowResetConfirmPassword] = useState(false);

  const [showLoginPassword, setShowLoginPassword] = useState(false);

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({
    type: 'info',
    title: '',
    message: '',
    duration: 5000,
  });

  const [profileImage, setProfileImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleToggle = () => {
    setIsSignup(!isSignup);
    setShowReset(false);
    setFormErrors({});
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
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

      if (name === "phone" && value && !validatePhone(value)) {
        updated.phone = "Enter a valid phone number.";
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
    setLoading(true);
    try {
      const response = await api.post("/auth/login", loginData);
      if (response.status !== 200) {
        setPopupContent({ type: 'error', title: 'Login Error', message: 'Something went wrong' });
        setShowPopup(true);
        return;
      }
      const token = response.data.accessToken;

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const res = await api.post("/auth/geofence", {
            latitude, longitude, email: loginData.email
          });

          if (res.status === 200) {
            console.log("Attendance Marked");
            localStorage.setItem("accessToken", token);

            setLoading(false);
            navigate("/dashboard");
          }
          else if (res.status === 206) {
            console.log("Request Pending Approval");
            alert("Wait for aproval")
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setPopupContent({
            type: 'error',
            title: 'Location Access Denied',
            message: 'We couldn’t access your location.'
          });
          setShowPopup(true);
        }
      );
    } catch (err) {
      if (!err.response) {
        setPopupContent({
          type: 'error',
          title: 'Server Unreachable',
          message: 'We couldn’t reach the server. Please check your internet or try again later.'
        });
        setShowPopup(true);
      }
      else if (err?.response?.status === 400) {
        const msg = err.response.data?.data?.message;
        setPopupContent({
          type: 'error',
          title: 'Login Failed',
          message: msg === "Wrong Password" ? "Wrong Password!!" : "User not found with this email!!"
        });
        setShowPopup(true);
      } else {
        console.log(err.response);
      }
    }
    finally {
      setLoading(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, password, confirmPassword, otp } = signupData;

    const errors = { name: '', email: '', phone: '', password: '', confirmPassword: '', otp: '' };
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

      if (valid && !profileImage) {
        setPopupContent({
          type: 'notification',
          title: 'Submission Denied',
          message: 'Please upload profile picture'
        });
        setShowPopup(true);
        valid = false;
      }

      setFormErrors(errors);
      if (!valid) return;
      setLoading(true);
      try {
        const userExist = await api.post("/auth/check", { email });
        if (userExist.data.exists) {
          setPopupContent({ type: 'error', title: 'Signup Failed', message: 'User already exists' });
          setShowPopup(true);
          return;
        }

        const sendotp = await api.post("/auth/signup/send-otp", { useremail: email });
        if (sendotp.status === 200) {
          setOtpPhase(true);
          setPopupContent({ type: 'success', title: 'OTP Sent', message: 'OTP sent to your email/phone.' });
          setShowPopup(true);
        } else {
          setPopupContent({ type: 'error', title: 'OTP Failed', message: 'Failed to send OTP' });
          setShowPopup(true);
        }
      } catch (error) {
        if (!error.response) {
          setPopupContent({
            type: 'error',
            title: 'Server Unreachable',
            message: 'We couldn’t reach the server. Please check your internet or try again later.'
          });
          setShowPopup(true);
        }
        else {
          setPopupContent({ type: 'error', title: 'Signup Failed', message: 'Something went wrong' });
          setShowPopup(true);
        }
      } finally {
        setLoading(false);
      }

    } else {
      if (!otp) {
        setFormErrors(prev => ({ ...prev, otp: "Please enter the OTP." }));
        return;
      }

      setLoading(true);
      try {
        const verifyOtp = await api.post("/auth/signup/verify-otp", { useremail: email, otp });
        if (verifyOtp.status === 200) {
          const newUser = await api.post("/auth/signup/newuser", {
            username: name, email, phoneNum: phone, password
          });

          if (newUser.status === 200) {
            localStorage.setItem("accessToken", newUser.data.accessToken);
            setPopupContent({ type: 'success', title: 'Signup Successful', message: 'Signup successful! Login to your account.' });
            setShowPopup(true);
            setSignupData({ name: '', email: '', phone: '', password: '', confirmPassword: '', otp: '' });
            setFormErrors({});
            setIsSignup(false);
            setOtpPhase(false);
            navigate("/");
          } else {
            setPopupContent({ type: 'error', title: 'Signup Failed', message: 'Failed to create user' });
            setShowPopup(true);
          }
        }
      } catch (error) {
        if (!error.response) {
          setPopupContent({
            type: 'error',
            title: 'Server Unreachable',
            message: 'We couldn’t reach the server. Please check your internet or try again later.'
          });
          setShowPopup(true);
        }
        else if (error.response?.data?.error === "Incorrect OTP") {
          setFormErrors(prev => ({ ...prev, otp: "Incorrect OTP" }));
        } else {
          setPopupContent({ type: 'error', title: 'Signup Failed', message: 'Something went wrong' });
          setShowPopup(true);
        }
      }
      finally {
        setLoading(false);
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
      setLoading(true);
      try {
        const userExist = await api.post("/auth/check", { email });
        if (!userExist.data.exists) {
          setPopupContent({ type: 'error', title: 'OTP not sent!', message: "We couldn't find a user with this email" });
          setShowPopup(true);
          setLoading(false);
          return;
        }

        const sendotp = await api.post("/auth/signup/send-otp", { useremail: email });
        if (sendotp.status === 200) {
          setOtpSent(true);
          setPopupContent({ type: 'success', title: 'OTP Sent', message: 'OTP sent to your email/phone.' });
          setShowPopup(true);
        } else {
          setPopupContent({ type: 'error', title: 'OTP Failed', message: 'Failed to send OTP' });
          setShowPopup(true);
        }
      } catch (error) {
        if (!error.response) {
          setPopupContent({
            type: 'error',
            title: 'Server Unreachable',
            message: 'We couldn’t reach the server. Please check your internet or try again later.'
          });
          setShowPopup(true);
        }
        else {
          setPopupContent({ type: 'error', title: 'Reset Failed', message: 'Something went wrong' });
          setShowPopup(true);
        }
      }
      finally {
        setLoading(false);
      }
    } else if (!otpVerified) {
      if (!otp) {
        setLoading(false);
        setFormErrors(prev => ({ ...prev, otp: "Please enter the OTP." }));
        return;
      }
      setLoading(true);
      try {
        const verifyOtp = await api.post("/auth/signup/verify-otp", { useremail: email, otp });
        if (verifyOtp.status === 200) {
          setOtpVerified(true);
        } else {
          setPopupContent({ type: 'error', title: 'OTP Verification', message: 'Something went wrong' });
          setShowPopup(true);
        }
      } catch (error) {
        if (!error.response) {
          setPopupContent({
            type: 'error',
            title: 'Server Unreachable',
            message: 'We couldn’t reach the server. Please check your internet or try again later.'
          });
          setShowPopup(true);
        }
        else if (error.response?.data?.error === "Incorrect OTP") {
          setFormErrors(prev => ({ ...prev, otp: "Incorrect OTP" }));
        } else {
          setPopupContent({ type: 'error', title: 'OTP Verification', message: 'Something went wrong' });
          setShowPopup(true);
        }
      }
      finally {
        setLoading(false);
      }
    } else {
      if (!password) { errors.password = "Password is required."; valid = false; }
      if (!confirmPassword || confirmPassword !== password) {
        errors.confirmPassword = "Passwords do not match.";
        valid = false;
      }

      setFormErrors(errors);
      if (!valid) return;
      setLoading(true);
      try {
        const resetPass = await api.post("/auth/reset-password", { email, password });
        if (resetPass) {
          setPopupContent({ type: 'success', title: 'Password Reset', message: 'Password Changed Successfully' });
          setShowPopup(true);
          setShowReset(false);
          setOtpSent(false);
          setOtpVerified(false);
          setResetData({ email: '', otp: '', password: '', confirmPassword: '' });
        }
      } catch (error) {
        if (!error.response) {
          setPopupContent({
            type: 'error',
            title: 'Server Unreachable',
            message: 'We couldn’t reach the server. Please check your internet or try again later.'
          });
          setShowPopup(true);
        }
        else {
          setPopupContent({ type: 'error', title: 'Reset Failed', message: 'Something went wrong' });
          setShowPopup(true);
        }
      }
      finally {
        setLoading(false);
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

  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  return (
    <>
      {showPopup && (
        <PopupCard
          isVisible={true}
          onClose={() => setShowPopup(false)}
          type={popupContent.type}
          title={popupContent.title}
          message={popupContent.message}
          duration={popupContent.duration}
        />
      )}

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
                        <div className="profile-picture-wrapper">
                          <div className="profile-picture-circle">
                            {profileImage ? (
                              <img
                                src={URL.createObjectURL(profileImage)}
                                alt="Profile"
                                className="profile-picture-img"
                              />
                            ) : (
                              <img
                                src={userIcon}
                                alt="Default Profile"
                                className="profile-picture-img"
                              />
                            )}
                          </div>

                          <label htmlFor="profile-upload" className="profile-edit-icon">
                            <span className="edit-icon">
                              {profileImage ? '✎' : '+'}
                            </span>
                            <input
                              id="profile-upload"
                              type="file"
                              accept="image/*"
                              onChange={handleProfileImageUpload}
                              hidden
                            />
                          </label>
                        </div>

                        <div>
                          <input name="name" value={signupData.name} onChange={handleSignupChange} className="login-input" type="text" placeholder="Name" />
                          {formErrors.name && <p className="login-error-text">{formErrors.name}</p>}
                        </div>
                        <div>
                          <input name="email" value={signupData.email} onChange={handleSignupChange} className="login-input" type="text" placeholder="Email" />
                          {formErrors.email && <p className="login-error-text">{formErrors.email}</p>}
                        </div>
                        <div>
                          <input name="phone" value={signupData.phone} onChange={handleSignupChange} className="login-input" type="text" placeholder="Phone Number" />
                          {formErrors.phone && <p className="login-error-text">{formErrors.phone}</p>}
                        </div>

                        {!otpPhase ? (
                          <>
                            <div className="password-field-container">
                              <div className="password-input-flex">
                                <input
                                  name="password"
                                  value={signupData.password}
                                  onChange={handleSignupChange}
                                  className="login-input"
                                  type={showPassword ? "text" : "password"}
                                  placeholder="Password"
                                />
                                <span
                                  className="eye-icon"
                                  onClick={() => setShowPassword((prev) => !prev)}
                                >
                                  {showPassword ? (
                                    // Show icon
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z" />
                                    </svg>
                                  ) : (
                                    // Hide icon
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                    </svg>
                                  )}
                                </span>
                              </div>
                              {formErrors.password && <p className="login-error-text">{formErrors.password}</p>}
                            </div>

                            <div className="password-field-container">
                              <div className="password-input-flex">
                                <input
                                  name="confirmPassword"
                                  value={signupData.confirmPassword}
                                  onChange={handleSignupChange}
                                  className="login-input"
                                  type={showConfirmPassword ? "text" : "password"}
                                  placeholder="Confirm Password"
                                />
                                <span
                                  className="eye-icon"
                                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                  {showConfirmPassword ? (
                                    // Show icon
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z" />
                                    </svg>
                                  ) : (
                                    // Hide icon
                                    <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                    </svg>
                                  )}
                                </span>

                              </div>
                              {formErrors.confirmPassword && <p className="login-error-text">{formErrors.confirmPassword}</p>}
                            </div>


                          </>
                        ) : (
                          <div style={{ marginBottom: '0.7rem' }}>
                            <input name="otp" value={signupData.otp} onChange={handleSignupChange} className="login-input" type="text" placeholder="Enter OTP" />
                            {formErrors.otp && <p className="login-error-text">{formErrors.otp}</p>}
                          </div>
                        )}
                      </div>
                      {loading ? <button className={`login-button ${loading ? 'cursor-none' : 'cursor-pointer'}`}><Loading useGif={true} /></button> : <button type="submit" className="login-button" style={{ marginTop: '1rem' }}>{otpPhase ? "Submit" : "Sign Up"}</button>}
                    </form>
                    {renderGoogleButton()}
                  </>
                ) : (
                  <>
                    <h1 className="login-title">Login</h1>
                    <form className="login-form" onSubmit={(e) => {
                      e.preventDefault();
                      if (!loading) {
                        handleLoginSubmit(e);
                      }
                    }}>
                      <div className="login-input-container">
                        <div>
                          <input name="email" value={loginData.email} onChange={handleLoginChange} className="login-input" type="text" placeholder="Email" />
                          {formErrors.email && <p className="login-error-text">{formErrors.email}</p>}
                        </div>
                        <div className="password-field-container">
                          <div className="password-input-flex">
                            <input
                              name="password"
                              value={loginData.password}
                              onChange={handleLoginChange}
                              className="login-input"
                              type={showLoginPassword ? "text" : "password"}
                              placeholder="Password"
                            />
                            <span
                              className="eye-icon"
                              onClick={() => setShowLoginPassword(prev => !prev)}
                            >
                              {showLoginPassword ? (
                                // Show icon
                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                  <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z" />
                                </svg>
                              ) : (
                                // Hide icon
                                <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                  <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                </svg>
                              )}
                            </span>
                          </div>
                        </div>

                      </div>
                      <div className="login-forgot-container">
                        {formErrors.password && <p className="login-error-text flex-[1]">{formErrors.password}</p>}
                        <label className="login-forgot" onClick={() => setShowReset(true)}>Forgot Password?</label>
                      </div>
                      {loading ? <button className={`login-button ${loading ? 'cursor-none' : 'cursor-pointer'}`} disabled={loading}><Loading useGif={true} /></button> :
                        <button type="submit" className="login-button">Clock in</button>}
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
                          <input name="email" value={resetData.email} onChange={handleResetChange} className="login-input" type="text" placeholder="Enter Email" />
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
                          <div className="password-field-container">
                            <div className="password-input-flex">
                              <input
                                name="password"
                                value={resetData.password}
                                onChange={handleResetChange}
                                className="login-input"
                                type={showResetPassword ? "text" : "password"}
                                placeholder="New Password"
                              />
                              <span
                                className="eye-icon"
                                onClick={() => setShowResetPassword(prev => !prev)}
                              >
                                {showResetPassword ? (
                                  // Show icon
                                  <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z" />
                                  </svg>
                                ) : (
                                  // Hide icon
                                  <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                  </svg>
                                )}
                              </span>
                            </div>
                            {formErrors.password && <p className="login-error-text">{formErrors.password}</p>}
                          </div>

                          <div className="password-field-container">
                            <div className="password-input-flex" style={{ marginBottom: '0.7rem' }}>
                              <input
                                name="confirmPassword"
                                value={resetData.confirmPassword}
                                onChange={handleResetChange}
                                className="login-input"
                                type={showResetConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                              />
                              <span
                                className="eye-icon"
                                onClick={() => setShowResetConfirmPassword(prev => !prev)}
                              >
                                {showResetConfirmPassword ? (
                                  <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Z" />
                                  </svg>
                                ) : (
                                  // Hide icon
                                  <svg xmlns="http://www.w3.org/2000/svg" height="22px" viewBox="0 -960 960 960" width="22px" fill="rgba(45, 42, 42, 0.73)">
                                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                                  </svg>
                                )}
                              </span>
                            </div>
                            {formErrors.confirmPassword && <p className="login-error-text">{formErrors.confirmPassword}</p>}
                          </div>

                        </>
                      )}
                    </div>
                    {loading ? <button className={`login-button ${loading ? 'cursor-none' : 'cursor-pointer'}`}><Loading useGif={true} /></button>
                      : <button type="submit" className="login-button" style={{ marginTop: '1rem' }}>
                        {!otpSent ? "Send OTP" : !otpVerified ? "Submit" : "Confirm"}
                      </button>}
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

.profile-picture-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  margin: 0 auto 12px;
}

.profile-picture-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: bold;
  color: #000;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.profile-picture-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-initial {
  font-size: 32px;
}

.profile-edit-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #08BDB1;
  color: white;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid white;
}

.plus-icon {
  font-size: 14px;
  line-height: 1;
}

.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
  padding: 0.5rem;
  box-sizing: border-box;
  overflow: hidden;
}

.login-logo-container {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 7rem;
  z-index: 10;
}

.login-card {
  background-color: #f2f1f1;
  border-radius: 0.6rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  padding: 1.5rem;
  width: 20rem;
  max-width: calc(100vw - 1rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.login-title {
  font-size: clamp(1.1rem, 3.5vw, 1.4rem);
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.2;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.login-input-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.login-input {
  width: 100%;
  height: 2.5rem;
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  padding: 0 clamp(0.6rem, 2vw, 0.8rem);
  border-radius: 0.4rem;
  border: 1px solid #aaa;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
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
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.back-login-container {
  margin-top: 0.6rem;
  align-self: center;
  text-align: center;
  width: 100%;
}

.login-forgot {
  margin-top: 4px;
  font-size: clamp(0.65rem, 2vw, 0.75rem);
  color: #215E97;
  cursor: pointer;
  text-align: right;
  word-wrap: break-word;
  flex: 1;
}

.back-login {
  text-decoration: underline;
  width: 100%;
  text-align: center;
  font-size: clamp(0.65rem, 2vw, 0.75rem);
  color: #215E97;
  margin-top: -0.3rem;
  margin-bottom: 0.7rem;
  cursor: pointer;
  word-wrap: break-word;
}

.login-button {
  background-color: #08BDB1;
  color: white;
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border: none;
  border-radius: 1.8rem;
  width: fit-content; /* Fits content with padding */
  width: clamp(120px, 8vw, 180px); /* Responsive minimum width */
  transition: background-color 0.3s;
  margin-top: 0.7rem;
}

.login-button:hover {
  background-color: #07a599;
}

.login-divider {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 1rem 0;
}

.login-divider::before,
.login-divider::after {
  content: "";
  flex: 1;
  border-top: 1px solid #ccc;
}

.login-divider span {
  margin: 0 0.5rem;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  color: #999;
  white-space: nowrap;
}

.login-google-button {
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: 1px solid #000;
  border-radius: 1.8rem;
  background-color: #fff;
  cursor: pointer;
  font-size: clamp(0.7rem, 2vw, 0.8rem);
  margin-bottom: 1.2rem;
  transition: background-color 0.3s;
  box-sizing: border-box;
}

.login-google-button:hover {
  background-color: #f0f0f0;
}

.login-google-icon {
  width: clamp(0.9rem, 3vw, 1.1rem);
  height: clamp(0.9rem, 3vw, 1.1rem);
  flex-shrink: 0;
}

.login-switch {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(0.4rem, 2vw, 0.8rem);
  font-size: clamp(0.7rem, 2vw, 0.8rem);
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
  width: clamp(2.2rem, 6vw, 2.7rem);
  height: clamp(1rem, 3vw, 1.2rem);
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
  width: clamp(0.9rem, 3vw, 1.2rem);
  height: clamp(0.9rem, 3vw, 1.2rem);
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0rem;
  left: 0rem;
  border: 0.15rem solid #8c8c8c;
  transition: left 0.3s;
  box-sizing: border-box;
}

.login-knob-active {
  width: clamp(0.9rem, 3vw, 1.2rem);
  height: clamp(0.9rem, 3vw, 1.2rem);
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0rem;
  transition: left 0.3s;
  border: 0.15rem solid #08bdb1;
  right: 0rem;
  box-sizing: border-box;
}

.login-error-text {
  color: #dc2626;
  font-size: 0.6rem;
  margin-top: 0.2rem;
  margin-left: 0.2rem;
}

.password-input-flex {
  width: 100%;
  height: 2.5rem;
  display: flex;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 0.4rem;
  background: white;
  box-sizing: border-box;
  padding: 0 clamp(0.6rem, 2vw, 0.8rem);
}

.password-input-flex:focus-within {
  border-color: #08BDB1;
  border-width: 1.7px;
}

.password-input-flex input {
  flex: 1;
  border: none;
  outline: none;
  font-size: clamp(0.85rem, 2.5vw, 0.95rem);
  background: transparent;
  height: 100%;
  padding: 0;
  margin: 0;
}

.password-input-flex input::placeholder {
  color: #888;
}

.eye-icon {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  flex-shrink: 0;
}

/* Tablet and smaller desktop styles */
@media (max-width: 1024px) {
  .login-logo-container {
    width: 6.5rem;
  }
  
  .login-card {
    width: 18rem;
    padding: 1.3rem;
  }
}

/* Tablet styles */
@media (max-width: 768px) {
  .login-page {
    padding: 0.3rem;
  }
  
  .login-logo-container {
    top: 0.3rem;
    left: 0.3rem;
    width: 6rem;
  }

  .login-card {
    padding: 1.2rem;
    width: 16rem;
    max-width: calc(100vw - 0.6rem);
  }

  .login-switch {
    gap: 0.4rem;
  }
}

/* Mobile landscape and portrait */
@media (max-width: 480px) {
  .login-page {
    padding: 0.3rem;
    align-items: center;
    justify-content: center;
    padding-top: 1rem;
  }
  
  .login-logo-container {
    top: 0.2rem;
    left: 0.2rem;
    width: 5rem;
  }

  .login-card {
    padding: 1rem;
    width: 100%;
    max-width: calc(100vw - 0.6rem);
    margin-top: 1rem;
  }

  .login-title {
    margin-bottom: 0.8rem;
  }

  .login-input-container {
    gap: 0.6rem;
  }

  .login-divider {
    margin: 0.8rem 0;
  }

  .login-google-button {
    margin-bottom: 1rem;
  }

  .login-switch {
    gap: 0.4rem;
  }
  
  .profile-picture-wrapper {
    width: 70px;
    height: 70px;
    margin: 0 auto 10px;
  }
  
  .profile-initial {
    font-size: 28px;
  }
  
  .profile-edit-icon {
    width: 20px;
    height: 20px;
  }
}

/* Very small screens */
@media (max-width: 320px) {
  .login-card {
    padding: 0.8rem;
    max-width: calc(100vw - 0.4rem);
  }
  
  .login-button {
    width: 40%;
    min-width: 4.5rem;
  }
  
  .login-logo-container {
    width: 4.5rem;
  }
  
  .login-title {
    margin-bottom: 0.7rem;
  }
  
  .login-input-container {
    gap: 0.5rem;
  }
  
  .login-divider {
    margin: 0.7rem 0;
  }
  
  .login-google-button {
    margin-bottom: 0.8rem;
  }
}

/* Mobile landscape specific adjustments */
@media (max-width: 640px) and (orientation: landscape) {
  .login-page {
    padding: 0.2rem;
    align-items: center;
    justify-content: center;
    padding-top: 0.5rem;
  }
  
  .login-card {
    width: 14rem;
    padding: 0.8rem;
    margin-top: 0;
  }
  
  .login-title {
    margin-bottom: 0.6rem;
  }
  
  .login-input-container {
    gap: 0.4rem;
  }
  
  .login-divider {
    margin: 0.6rem 0;
  }
  
  .login-google-button {
    margin-bottom: 0.8rem;
  }
  
  .profile-picture-wrapper {
    width: 60px;
    height: 60px;
    margin: 0 auto 8px;
  }
  
  .profile-initial {
    font-size: 24px;
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

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
  box-shadow: 0 0 0 1000px white inset !important;
  -webkit-text-fill-color: #000 !important;
  transition: background-color 5000s ease-in-out 0s;
}

input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}

`}</style>
    </>
  );
};



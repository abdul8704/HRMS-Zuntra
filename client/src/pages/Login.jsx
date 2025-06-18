import React, { useState } from 'react';
import zuntraLogo from "../assets/zuntra.png";

export const Login = () => {
    const [view, setView] = useState(0); // 0: login, 1: reset password, 2: signup
    const [otpSent, setOtpSent] = useState(false);

    const handleSendOtp = (e) => {
        e.preventDefault();
        setOtpSent(true);
    };

    const toggleSwitch = () => {
        setView(view === 2 ? 0 : 2);
    };

    return (
        <div>
            <img className="login-logo-container" src={zuntraLogo} alt="ZUNTRA" />
            <div className="login-container">
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

                    {/* RESET PASSWORD VIEW */}
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
                {/* TOGGLE SWITCH (only show for Login and Signup views) */}
{(view === 0 || view === 2) && (
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
                    background-color: #fff;
                    width: 22rem;
                    max-height: 95vh;
                    overflow-y: auto;
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
                        font-size: 0.95rem;
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

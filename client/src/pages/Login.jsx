import React, { useState, useRef } from 'react';

export const Login = () => {
    const [view, setView] = useState(0); // 0: login, 1: reset, 2: signup
    const [otpSent, setOtpSent] = useState(false);
    const [flipDirection, setFlipDirection] = useState('');
    const cardRef = useRef(null);

    const handleSendOtp = (e) => {
        e.preventDefault();
        setOtpSent(true);
    };

    const toggleSwitch = () => {
        if (view === 0) {
            setFlipDirection('flip-left');
            setView(2);
        } else if (view === 2) {
            setFlipDirection('flip-right');
            setView(0);
        }
    };

    return (
        <div>
            <div className="login-logo-container">
                <div className="logo-placeholder">ZUNTRA</div>
            </div>
            <div className="login-container">
                <div className="login-card-wrapper">
                    <div className={`login-card-inner ${flipDirection}`} ref={cardRef}>
                        {/* LOGIN CARD */}
                        <div className={`login-card front ${view === 0 ? 'show' : ''}`}>
                            <h1 className="login-title">Login</h1>
                            <div className="login-form">
                                <input className="login-input" type="email" placeholder="Email" />
                                <input className="login-input" type="password" placeholder="Password" />
                                <p className="login-forgot" onClick={() => setView(1)}>Forgot Password?</p>
                                <button type="submit" className="login-button">Clock In</button>
                            </div>
                            <div className="login-divider"><span>or</span></div>
                            <button type="button" className="login-google-button">
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="login-google-icon" />
                                Sign up with Google
                            </button>
                            <div className="login-switch" onClick={toggleSwitch}>
                                <span className={`login-switch-label ${view === 0 ? "login-switch-label-active" : ""}`}>Login</span>
                                <div className={`login-toggle ${view === 2 ? "login-toggle-active" : ""}`}>
                                    <div className={`login-knob ${view === 2 ? "login-knob-active" : ""}`}></div>
                                </div>
                                <span className={`login-switch-label ${view === 2 ? "login-switch-label-active" : ""}`}>Sign up</span>
                            </div>
                        </div>

                        {/* SIGNUP CARD */}
                        <div className={`login-card back ${view === 2 ? 'show' : ''}`}>
                            <h1 className="login-title">Sign up</h1>
                            <div className="login-form">
                                <input className="login-input" type="text" placeholder="Name" />
                                <input className="login-input" type="email" placeholder="Email" />
                                <input className="login-input" type="tel" placeholder="Phone Number" />
                                <input className="login-input" type="password" placeholder="Password" />
                                <input className="login-input" type="password" placeholder="Confirm Password" />
                                <button type="submit" className="login-button">Sign Up</button>
                            </div>
                            <div className="login-divider"><span>or</span></div>
                            <button type="button" className="login-google-button">
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="login-google-icon" />
                                Sign up with Google
                            </button>
                            <div className="login-switch" onClick={toggleSwitch}>
                                <span className={`login-switch-label ${view === 0 ? "login-switch-label-active" : ""}`}>Login</span>
                                <div className={`login-toggle ${view === 2 ? "login-toggle-active" : ""}`}>
                                    <div className={`login-knob ${view === 2 ? "login-knob-active" : ""}`}></div>
                                </div>
                                <span className={`login-switch-label ${view === 2 ? "login-switch-label-active" : ""}`}>Sign up</span>
                            </div>
                        </div>
                    </div>

                    {/* RESET CARD (outside flip) */}
                    {view === 1 && (
                        <div className="login-card reset">
                            <h1 className="login-title">Reset Password</h1>
                            <div className="login-form">
                                <input className="login-input" type="email" placeholder="Email" />
                                <input className="login-input" type="text" placeholder="Enter OTP" />
                                <button className="login-button" onClick={handleSendOtp}>
                                    {otpSent ? "Resend OTP" : "Send OTP"}
                                </button>
                                <input className="login-input" type="password" placeholder="New Password" />
                                <input className="login-input" type="password" placeholder="Confirm Password" />
                                <button type="submit" className="login-button">Confirm</button>
                            </div>
                            <p className="login-forgot" onClick={() => setView(0)}>← Back to Login</p>
                        </div>
                    )}
                </div>
            </div>

            <style jsx>{`
                .login-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    min-height: 100vh;
                    width: 100vw;
                    position: relative;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .login-logo-container {
                    position: absolute;
                    width: 10rem;
                    top: 1rem;
                    left: 1rem;
                    z-index: 10;
                }

                .logo-placeholder {
                    background-color: #08BDB1;
                    color: white;
                    padding: 10px;
                    border-radius: 8px;
                    text-align: center;
                    font-weight: bold;
                }

                .login-card-wrapper {
                    perspective: 1200px;
                    width: 24rem;
                    position: relative;
                    min-height: 500px;
                }

                .login-card-inner {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    transition: transform 0.8s ease;
                    transform-style: preserve-3d;
                }

                .flip-left {
                    transform: rotateY(180deg);
                }

                .flip-right {
                    transform: rotateY(0deg);
                }

                .login-card {
                    width: 100%;
                    max-width: 24rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                    padding: 1.5rem 1rem;
                    border-radius: 1rem;
                    background-color: #fff;
                    box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.25);
                    display: none;
                    flex-direction: column;
                    align-items: center;
                    min-height: 450px;
                    justify-content: center;
                    box-sizing: border-box;
                }

                .login-card.show {
                    display: flex;
                    z-index: 2;
                }

                .reset {
                    position: relative;
                    transform: none;
                    z-index: 3;
                    display: flex;
                    min-height: 500px;
                }

                .front {
                    transform: rotateY(0deg);
                    backface-visibility: hidden;
                }

                .back {
                    transform: rotateY(180deg);
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
                    box-sizing: border-box;
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
                    background-color: #07a399;
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

                /* Responsive design */
                @media (max-height: 600px) {
                    .login-container {
                        padding: 10px;
                    }
                    
                    .login-card {
                        min-height: auto;
                    }
                    
                    .reset {
                        min-height: auto;
                    }
                }
            `}</style>
        </div>
    );
};
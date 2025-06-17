import React from 'react';
import zuntraLogo from "../assets/zuntra.png";

export const Login = () => {
    return (
        <div>
            <img className="login-logo-container" src={zuntraLogo} alt="ZUNTRA" />
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-card-title">LOGIN</h1>
                    <form>
                        <input className="login-card-input" type="email" placeholder="Email" />
                        <input className="login-card-input" type="password" placeholder="Password" />
                        <p className="login-card-forgot">Forgot Password?</p>
                        <button type="submit" className="login-card-button">Clock In</button>
                    </form>

                    <hr className="login-divider" />

                    <div className="login-switch">
                        <span className="switch-label login-label active">Login</span>
                        <div className="switch-toggle">
                            <div className="switch-knob"></div>
                        </div>
                        <span className="switch-label signup-label">Sign up</span>
                    </div>
                {/*<div className="login-signup-card">
                    <h1 className="login-card-title">SIGN UP</h1>
                    <form>
                        <input className="login-card-input" type="text" placeholder="Name" />
                        <input className="login-card-input" type="email" placeholder="Email" />
                        <input className="login-card-input" type="tel" placeholder="Phone Number" />
                        <input className="login-card-input" type="password" placeholder="Password" />
                        <input className="login-card-input" type="password" placeholder="Confirm Password" />
                        <button type="submit" className="login-card-button">Sign Up</button>
                    </form>

                    <hr className="login-divider" />

                    <div className="login-switch">
                        <span className="login-label">Login</span>
                        <div className="login-toggle active">
                            <div className="login-knob active"></div>
                        </div>
                        <span className="login-label signup-label active">Sign up</span>
                    </div>*/}
                </div>
            </div>

            <style jsx>{`
                .login-container {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: 100vw;
                }

                .login-logo-container {
                    position: absolute;
                    width: 15vw;
                    margin: 1rem;
                }

                .login-card,
                .login-signup-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    border-radius: 1rem;
                    box-shadow: 0 0 26px 0px rgba(0, 0, 0, 0.25);
                    padding: 2rem 1rem;
                    background-color: #fff;
                }

                .login-card {
                    width: 24vw;
                }

                .login-signup-card {
                    width: 28vw;
                }

                .login-card-title {
                    font-size: 2rem;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .login-card form,
                .login-signup-card form {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                }

                .login-card-input {
                    width: 80%;
                    font-size: 1rem;
                    padding: 0.9rem;
                    margin-top: 1rem;
                    border-radius: 0.5rem;
                    border: 2px solid #000;
                }

                .login-card-forgot {
                    width: 80%;
                    text-align: right;
                    font-size: 0.9rem;
                    margin-top: 0.3rem;
                    color: #0000ff;
                    cursor: pointer;
                }

                .login-card-button {
                    margin-top: 2rem;
                    padding: 0.8rem 2rem;
                    font-size: 1rem;
                    background-color: #08BDB1;
                    color: #ffffff;
                    border: none;
                    border-radius: 0.5rem;
                    cursor: pointer;
                }

                .login-card-button:hover {
                    background-color: #069e96;
                }

                .login-divider {
                    width: 80%;
                    margin: 2rem auto 1rem;
                    border: none;
                    border-top: 1px solid #ccc;
                }

                .login-switch {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }

                .login-label {
                    font-size: 1rem;
                    cursor: pointer;
                    color: #333;
                    font-weight: 500;
                }

                .login-label.active,
                .signup-label.active {
                    text-decoration: underline;
                }

                .login-toggle {
                    width: 50px;
                    height: 24px;
                    background-color: #ccc;
                    border-radius: 12px;
                    position: relative;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }

                .login-knob {
                    width: 20px;
                    height: 20px;
                    background-color: #fff;
                    border-radius: 50%;
                    position: absolute;
                    top: 2px;
                    left: 2px;
                    transition: left 0.3s;
                }

                /* Switch Active State */
                .login-toggle.active {
                    background-color: #08BDB1;
                }

                .login-toggle.active .login-knob {
                    left: 28px;
                }
            `}</style>
        </div>
    );
};

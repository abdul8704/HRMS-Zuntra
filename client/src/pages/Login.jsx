import React from 'react';
import zuntraLogo from "../assets/zuntra.png"
export const Login = () => {
    return (
        <div>
            <img className="login-logo-container" src={zuntraLogo} alt="ZUNTRA"/>
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-card-title">LOGIN</h1>
                    <form>
                        <input className="login-card-input" type="email" placeholder='Email'></input>
                        <input className="login-card-input" type="password" placeholder='Password'></input>
                        <label className="login-card-forgot">Forgot Password?</label>
                    </form>
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
                    // background-color: #00ffff;
                }
                .login-logo-container{
                    position: absolute;
                    width: 15vw;
                    margin: 1rem;
                    // background-color: #ff0000;
                }
                .login-card{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    width: 30vw;
                    border-radius: 1rem;
                    box-shadow: 0 0 26px 0px rgba(0, 0, 0, 0.25);
                    // background-color:rgb(255, 255, 255);
                }
                .login-card-title{
                    margin: 2rem;
                    font-weight: block;
                }
                .login-card form{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: flex-end;
                    padding: 0;
                    width: 80%;
                }
                .login-card-input{
                    width: 90%;
                    font-size: 1rem;
                    padding: 1rem;
                    margin-top: 1rem;
                    border-radius: 0.5rem;
                    border: 2px solid #000000;
                }
                .login-card-forgot{
                    font-size: 0.8rem;
                    margin: 0.2rem;
                    color: #0000ff;
                }
            `}</style>
        </div>
    );
};

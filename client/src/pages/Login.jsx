import React from 'react';
import zuntraLogo from "../assets/zuntra.png"
export const Login = () => {
    return (
        <div>
            <img className="login-logo-container" src={zuntraLogo} alt="ZUNTRA"/>
            <div className="login-container">
                <div className="login-card">
                    112
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
                    width: 30vw;
                    background-color: #00ff00;
                }
            `}</style>
        </div>
    );
};

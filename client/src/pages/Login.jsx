import React from 'react';

export const Login = () => {
    return (
        <div>
            <div className="login-container">
                <div className="login-logo-container">
                    dfasf
                </div>
                <div>

                </div>
            </div>
            <style jsx>{`
                .login-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100vw;
                    background-color: #00ffff;
                }
                .login-logo-container{
                    position: absolute;
                    width: auto;
                    height: auto;
                    top: 0;
                    left: 10px;
                    background-color: #ff0000;
                }
            `}</style>
        </div>
    );
};

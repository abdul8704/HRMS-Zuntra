import React from 'react'
import { Sidebar } from "../components/Sidebar";

export const DashBoard = () => {
    return (
        <>
            <div className="website-container">
                <Sidebar />
                <div className="website-module">
                    <div className='dash-grid'>
                        <div className='greetings'>User Greetings</div>
                        <div className='intime'>In time </div>
                        <div className='outtime'>Out Time </div>
                        <div className='worktime'>Work Time </div>
                        <div className='breaktime'>Break Time </div>
                        <div className='remainder'>Remainder </div>
                        <div className='workbreak'>Work Break Composition </div>
                        <div className='deadline'>Project Deadline </div>
                        <div className='notification'>Notification</div>
                        <div className='leave'>Employee on Leave </div>
                    </div>
                </div>
            </div>
            <style>
                {
                    `
                .dash-grid
                {
                    display:grid;
                    border:1rem;
                    grid-template-columns:repeat(8,1fr);
                    grid-template-rows:repeat(9,1fr);
                    place-content:center;
                    gap: 1rem;
                    width: 100%;
                    height:100%;
                }
                .greetings
                {
                    grid-column: 1/5;
                    grid-row: 1/2;
                    background-color: #FFFFFF;
                    border-radius: 20px;
                }
                    .intime
                {
                    grid-column: 1/3;
                    grid-row: 2/3;
                    background-color: #C1E8BD;
                    border-radius: 20px;
                }
                       .outtime
                {
                    grid-column: 1/3;
                    grid-row: 3/4;
                    background-color: #E1BEC5;
                    border-radius: 20px;
                }
                       .worktime
                {
                    grid-column: 3/5;
                    grid-row: 2/3;
                    background-color: #C3E4EE;
                    border-radius: 20px;
                }
                       .breaktime
                {
                    grid-column: 3/5;
                    grid-row: 3/4;
                    background-color: #DECEB9;
                    border-radius: 20px;                }
                    .remainder
                {
                    grid-column: 1/5;
                    grid-row: 4/7;
                    background-color: #BFBFF7;
                    border-radius: 20px;
                }
                    .workbreak
                {
                    grid-column: 1/4;
                    grid-row: 7/10;
                    background-color: #DDB3DD;
                    border-radius: 20px;
                }
                    .deadline
                {
                    grid-column: 5/9;
                    grid-row: 1/5;
                    background-color: #F2C3B9;
                    border-radius: 20px;
                }
                    .notification
                {
                    grid-column: 5/9;
                    grid-row: 5/7;
                    background-color: #F6E0BF;
                    border-radius: 20px;
                }
                    .leave
                {
                    grid-column: 4/9;
                    grid-row: 7/10;
                    background-color: #ADC0DA;
                    border-radius: 20px;
                }
                    .greetings,
                    .intime,
                    .outtime,
                    .worktime,
                    .breaktime,
                    .remainder,
                    .workbreak,
                    .deadline,
                    .notification,
                    .leave {
                        padding: 1rem; 
                }
       
            `
                }
            </style>
        </>
    )
}



import React, { useState } from 'react';
import '../sass/index.scss';

let initialState = [
    {id: 0, interviewer: 'Henry', interviewee: 'Jimmy', date: new Date()},
    {id: 1, interviewer: 'Johnny', interviewee: 'Jimmy', date: new Date()},
    {id: 2, interviewer: 'Albert', interviewee: 'Evan', date: new Date()},
    {id: 3, interviewer: 'Evan', interviewee: 'Jimmy', date: new Date()},
]

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <h1>Horse Field Interviews</h1>
            <div class='dash-interview-container'>
            {initialState.map((interview, id) => {
                console.log(interview.date);
                return (
                    <a className='interview-card' key={id} href={`/api/interviews/` + interview.id}>
                        <p>Interviewee: {interview.interviewee}</p>
                        <p>Interviewer: {interview.interviewer}</p>
                        <p>{interview.date.toString().slice(0, 15)}</p>
                    </a>
                )
            })}
            </div>
        </div>
    )
}

export default Dashboard;
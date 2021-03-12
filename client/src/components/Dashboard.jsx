import React, { useState, useEffect } from 'react';
import '../sass/index.scss';
import axios from 'axios';

const Dashboard = () => {
    const [initialState, setIntialState] = useState([])
    const [loggedIn, setLoggedIn] = useState(false);
    useEffect(() => {
        let logged = localStorage.getItem('horsefield');
        if(logged) {
            setLoggedIn(true);
        }
        axios.get('http://localhost:8080/api/interviews')
        .then((res) => setIntialState(res.data));
        console.log(initialState);
    }, [])


    return (
        <div className='dashboard-container'>
            {loggedIn ? 
            <div>
                <h1 className='interview-header'>Horse Field Interviews</h1>
                <div className='interview-nav_home'>
                <a className='create-interview-btn' href='/interviews'>Create Interview</a>
                <a className='create-interview-btn' href='/schedule'>Schedule</a>
                </div>
                <div class='dash-interview-container'>
                {initialState.map((interview, id) => {
                return (
                <a className='interview-card' key={id} href={`/interviews/` + interview.id}>
                <p>Interviewee: {interview.interviewee}</p>
                <p>Interviewer: {interview.interviewer}</p>
                <p>{interview.date.toString().slice(0, 10)}</p>
                </a>
                )
                })}
                </div>
            </div> 
            : <div>You do not have access to this page</div>}
        </div>
    )
}

export default Dashboard;
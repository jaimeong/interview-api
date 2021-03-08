import React, { useState, useEffect } from 'react';
import '../sass/index.scss';
import axios from 'axios';

const Dashboard = () => {
    const [initialState, setIntialState] = useState([])
    useEffect(() => {
        axios.get('http://localhost:8000/api/interviews')
        .then((res) => setIntialState(res.data));
    }, [])


    return (
        <div className='dashboard-container'>
            <h1 className='interview-header'>Horse Field Interviews</h1>
            <a className='create-interview-btn' href='/api/interviews'>Create Interview</a>
            <div class='dash-interview-container'>
            {initialState.map((interview, id) => {
                return (
                    <a className='interview-card' key={id} href={`/api/interviews/` + interview.id}>
                        <p>Interviewee: {interview.interviewee}</p>
                        <p>Interviewer: {interview.interviewer}</p>
                        <p>{interview.date.toString().slice(0, 10)}</p>
                    </a>
                )
            })}
            </div>
        </div>
    )
}

export default Dashboard;
import React, { useState } from 'react';
import '../sass/index.scss';

let initialState =  [
    {
        id: "utgt-JfIs3",
        interviewee: "Henry",
        date: "2021-03-03T01:36:13.895Z",
        interviewer: "Johnny",
        questionData: [
            {
                id: 0,
                type: "conversational",
                question: "sdfsd",
                response: "sdsd",
                notes: "sdsdfsdfsd",
                date: "2021-03-03T01:36:08.767Z",
                score: "3"
            },
            {
                id: 1,
                type: "conversational",
                question: "asdasd",
                response: "asdasd",
                notes: "asdasda",
                date: "2021-03-03T01:36:12.353Z",
                score: "1"
            }
        ]
},
{
    id: "utgt-JfIs3",
    interviewee: "Albert",
    date: "2021-03-03T01:36:13.895Z",
    interviewer: "Evan",
    questionData: [
        {
            id: 0,
            type: "conversational",
            question: "sdfsd",
            response: "sdsd",
            notes: "sdsdfsdfsd",
            date: "2021-03-03T01:36:08.767Z",
            score: "3"
        },
        {
            id: 1,
            type: "conversational",
            question: "asdasd",
            response: "asdasd",
            notes: "asdasda",
            date: "2021-03-03T01:36:12.353Z",
            score: "1"
        }
    ]
},
{
    id: "utgt-JfIs3",
    interviewee: "Johnny",
    date: "2021-03-03T01:36:13.895Z",
    interviewer: "Jimmy",
    questionData: [
        {
            id: 0,
            type: "conversational",
            question: "sdfsd",
            response: "sdsd",
            notes: "sdsdfsdfsd",
            date: "2021-03-03T01:36:08.767Z",
            score: "3"
        },
        {
            id: 1,
            type: "conversational",
            question: "asdasd",
            response: "asdasd",
            notes: "asdasda",
            date: "2021-03-03T01:36:12.353Z",
            score: "1"
        }
    ]
}
]

const Dashboard = () => {
    console.log(initialState);
    return (
        <div className='dashboard-container'>
            <h1 className='interview-header'>Horse Field Interviews</h1>
            <a className='create-interview-btn' href='/api/interviews'>Create Interview</a>
            <div class='dash-interview-container'>
            {initialState.map((interview, id) => {
                console.log(interview.date);
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
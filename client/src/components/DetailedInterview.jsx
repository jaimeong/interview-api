import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../sass/index.scss';

const DetailedInterview = () => {
    const initialState = {
        id: "utgt-JfIs3",
        interviewee: "",
        date: "2021-03-03T01:36:13.895Z",
        interviewer: "",
        questionData: [
            {
                id: 0,
                type: "conversational",
                question: "'What is a binary search tree?'",
                response: "A binary search tree is a tree data structure that starts with a root and can have at most two children. Children to the left of the parent are less than the parent and children to the right of the parent are greater than the parent",
                notes: "Good understanding of binary search tree",
                date: "2021-03-03T01:36:08.767Z",
                score: "3"
            },
            {
                id: 1,
                type: "conversational",
                question: 'What is a linked list?', 
                response: 'A linked list is a data structure of nodes attached together with a next pointer, good for inserting and removal at the beginning and end of the list O(1) time',
                notes: 'Good understanding of linked list',
                date: "2021-03-03T01:36:12.353Z",
                score: "1"
            }
        ]
}
    const [data, setData] = useState(initialState);
    const [id, setId] = useState('');
    useEffect(() => {
        let url = window.location.href.split('/');
        let id = url[url.length - 1];
        setId(id);
        
        axios.get(`http://localhost:8000/api/interview/${id}`)
        .then((res) => {
            setData(res.data);
            console.log(data);
        })
    }, [])
    return (
        <div>
            <div class='interview-nav'>
                <a className='home-btn' href='/dashboard'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <polyline points="5 12 3 12 12 3 21 12 19 12" />
                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                    </svg>
                </a>
                <a href='create-btn' href='/api/interviews/'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="12" cy="12" r="9" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="12" y1="9" x2="12" y2="15" />
                    </svg>
                </a>
                <a href='schedule-btn' href='/api/schedule/'>
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-calendar-event" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <rect x="4" y="5" width="16" height="16" rx="2" />
                    <line x1="16" y1="3" x2="16" y2="7" />
                    <line x1="8" y1="3" x2="8" y2="7" />
                    <line x1="4" y1="11" x2="20" y2="11" />
                    <rect x="8" y="15" width="2" height="2" />
                    </svg>
                </a>
            </div>
            <h1>Interviewee: {data.interviewee}</h1>
            <h1>Interviewer: {data.interviewer}</h1>
            <p>{data.date.toString().slice(0, 10)}</p>
            <div className='interaction-buttons'>
                <a href={`/api/interview/delete/` + id}>Delete</a>
                <a href={`/api/interview/update/` + id}>Update</a>
            </div>
            {data.questionData.map((item, index) => {
                return (
                    <div className='detailed-question' key={index}>
                        <h4>{index + 1}. {item.question}</h4>
                        <p className='interview-type'>{item.type}</p>
                        <p>Response: {item.response}</p>
                        <p>Notes: {item.notes}</p>
                        <p className='interview-score'>Score: {item.score} / 5</p>
                        <div className='border-bottom'></div>
                    </div>
                )
            })}
        </div>
    )
}

export default DetailedInterview;
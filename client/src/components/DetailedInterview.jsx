import React, { useState } from 'react';
import '../sass/index.scss';

const DetailedInterview = () => {
    const initialState = [
        {interviewer: 'Henry', interviewee: 'Jimmy'},
        {questionData: [
            {
                date: new Date(),
                id: 0, 
                type: 'conversational', 
                question: 'What is a binary search tree?', 
                response: 'A binary search tree is a tree data structure that starts with a root and can have at most two children. Children to the left of the parent are less than the parent and children to the right of the parent are greater than the parent',
                notes: 'Good understanding of BST',
                score: '5'
            },
            {
                date: new Date(),
                id: 1, 
                type: 'conceptual', 
                question: 'What is a linked list?', 
                response: 'A linked list is a data structure of nodes attached together with a next pointer, good for inserting and removal at the beginning and end of the list O(1) time',
                notes: 'Good understanding of linked list',
                score: '4'
            },
        ]}
    ]
    const [data, setData] = useState(initialState);

    return (
        <div>
            <h1>Interviewee: {data[0].interviewee}</h1>
            <h1>Interviewer: {data[0].interviewer}</h1>
            <p>{data[1].questionData[0].date.toString().slice(0, 15)}</p>
            {data[1].questionData.map((item, index) => {
                return (
                    <div className='detailed-question' key={index}>
                        <h4>{index + 1}. {item.question}</h4>
                        <p style={{textTransform: 'capitalize', color: 'orange'}}>{item.type}</p>
                        <p>Response: {item.response}</p>
                        <p>Notes: {item.notes}</p>
                        <p>Score: {item.score} / 5</p>
                        <div className='border-bottom'></div>
                    </div>
                )
            })}
        </div>
    )
}

export default DetailedInterview;
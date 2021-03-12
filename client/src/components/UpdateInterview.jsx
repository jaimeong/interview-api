import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Question from './Question';

const UpdateInterview = () => {
    const [questionData, setQuestionData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [interviewer, setInterviewer] = useState('');
    const [interviewee, setInterviewee] = useState('');
    const [interviewData, setInterviewData] = useState({});
    const [id, setId] = useState('');
    let questionContainer = useRef(null);

    function addQuestion() {
        let question = questionContainer.current;
        setCounter((prevState) => prevState + 1);
    }

    function handlePassedData(data) {
        setQuestionData([...questionData, data]);
    }

    function handleChange(e, operation) {
        operation(e.target.value);
    }

    function handleUpdate() {
        // pack the data to be sent over to backend api
        let data = {id: interviewData.id, interviewee: interviewee, date: interviewData.date, interviewer: interviewer, questionData: questionData}

        axios.put(`http://localhost:8000/api/interview/${id}`, data)
        // complete async post request then redirect user to detailed interview page
        .then((res) => {
            window.location = `http://localhost:3000/interviews/${id}`
        });
    }


    useEffect(() => {
        let url = window.location.href.split('/');
        let id = url[url.length - 1];
        setId(id);
        
        axios.get(`http://localhost:8000/api/interview/${id}`)
        .then((res) => {
            setInterviewData(res.data);
            setCounter(res.data.questionData.length);
            setInterviewer(res.data.interviewer);
            setInterviewee(res.data.interviewee);
        })
    }, [])

    return (
        <div className='interview-container'>
        <div class='interview-nav'>
            <a className='home-btn' href='/dashboard'>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-home" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <polyline points="5 12 3 12 12 3 21 12 19 12" />
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                </svg>
            </a>
        </div>
        <h1>Update Interview: {id}</h1>
        <form>
            <div>
            <label>Interviewer</label>
            <input type = 'text' name='interviewer' placeholder='Interviewer Name' value={interviewer} onChange={(e) => handleChange(e, setInterviewer)} />
            </div>
            <div>
            <label>Interviewee</label>
            <input type = 'text' name='interviewee' placeholder='Interviewee Name' value={interviewee} onChange={(e) => handleChange(e, setInterviewee)} />
            </div>
        </form>
        <div className='question-box' ref={questionContainer}>
            {[...Array(counter)].map((item, index) => <Question key={index} setData={handlePassedData} setQuestionData={setQuestionData} index={index} questionData={questionData} interviewData={interviewData.questionData} update={true} />)}
        </div>
        <div className='btns'>
        <button className='add-btn' onClick={addQuestion}>Add question</button>
        <button className='completed-btn' onClick={handleUpdate}>Update Interview</button>
        </div>
    </div>
    )
}

export default UpdateInterview;
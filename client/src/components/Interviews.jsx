import React, { useState, useRef, useEffect } from 'react';
import Question from './Question';
import '../sass/index.scss';
import axios from 'axios';

const Interviews = function () {
    const [questionData, setQuestionData] = useState([]);
    const [counter, setCounter] = useState(0);
    const [interviewer, setInterviewer] = useState('');
    const [interviewee, setInterviewee] = useState('');
    let questionContainer = useRef(null);

    function addQuestion() {
        let question = questionContainer.current;
        setCounter((prevState) => prevState + 1);
    }

    function handlePassedData(data) {
        setQuestionData([...questionData, data]);
    }

    useEffect(() => {
        console.log(questionData);
    }, [questionData])

    function handleChange(e, operation) {
        operation(e.target.value);
    }

    // tied to complete interview btn
    function handleSubmit() {
        // pack the data to be sent over to backend api
        let data = [{interviewer, interviewee}, {questionData}]
        console.log(data);
        axios.post('http://localhost:8000/api/interviews', data)
        // complete async post request then redirect user to detailed interview page
        .then((res) => console.log(res));
    }

    return (
        <div className='interview-container'>
            <h1>Create an Interview</h1>
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
                {[...Array(counter)].map((item, index) => <Question key={index} setData={handlePassedData} setQuestionData={setQuestionData} index={index} questionData={questionData} />)}
            </div>
            <div className='btns'>
            <button className='add-btn' onClick={addQuestion}>Add question</button>
            <button className='completed-btn' onClick={handleSubmit}>Complete Interview</button>
            </div>
        </div>
    )
}


export default Interviews;
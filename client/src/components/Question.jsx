import React, { useState, useRef, useEffect } from 'react';
import '../sass/index.scss';

const Question = function({setData, questionData, index, setQuestionData, interviewData}) {
    const questionType = useRef(null);
    const questionBox = useRef(null);
    const responseBox = useRef(null);
    const notesBox = useRef(null);
    const scoreInput = useRef(null);
    const questionContainer = useRef(null);
    const error = useRef(null);
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [notes, setNotes] = useState('');
    const [score, setScore] = useState('');
    const [saved, setSaved] = useState(false);
    
    useEffect(() => {
        if(interviewData && index < interviewData.length) {
            setQuestion(interviewData[index].question)
            setResponse(interviewData[index].response)
            setNotes(interviewData[index].notes)
            setScore(interviewData[index].score)
            setQuestionData(interviewData);
        }
    }, [])

    function handleSave() {
        let current = parseInt(questionContainer.current.id, 10);
        console.log(questionData.length, current);
        if(!question.length || !response.length || !notes.length) {
            error.current.textContent = 'Entry is empty, please enter some text';
            questionBox.current.style.border = '2px solid red';
            responseBox.current.style.border = '2px solid red';
            notesBox.current.style.border = '2px solid red';
        } else if(current === questionData.length) {
            let type = questionType.current.value;
            let data = {id: questionData.length, type: type, question: question, response: response, notes: notes, date: new Date(), score: score};
            setData(data);
            console.log(questionData);
            questionBox.current.readOnly = true;
            questionBox.current.style.border = '2px solid green';
            responseBox.current.readOnly = true;
            responseBox.current.style.border = '2px solid green';
            notesBox.current.readOnly = true;
            notesBox.current.style.border = '2px solid green';
            questionType.current.disabled = true;
            error.current.textContent = '';
            setSaved(true);
        } else {
            setQuestion(questionBox.current.value);
            setResponse(responseBox.current.value);
            setNotes(notesBox.current.value);
            let type = questionType.current.value;
            let data = {id: index, type: type, question: question, response: response, notes: notes, score: score};
            console.log(data);
            for(let i = 0; i < questionData.length; i++) {
                if(questionData[i].id === current) {
                    data.date = questionData[i].date;
                    questionData[i] = data;
                }
            }

            questionBox.current.readOnly = true;
            questionBox.current.style.border = '2px solid green';
            responseBox.current.readOnly = true;
            responseBox.current.style.border = '2px solid green';
            notesBox.current.readOnly = true;
            notesBox.current.style.border = '2px solid green';
            questionType.current.disabled = true;
            error.current.textContent = '';

            setSaved(true);
        }
    }

    function handleUpdate() {
        let type = questionType.current.value;
        setSaved(false);
        questionBox.current.readOnly = false;
        questionBox.current.style.border = '2px solid orange';
        responseBox.current.readOnly = false;
        responseBox.current.style.border = '2px solid orange';
        notesBox.current.readOnly = false;
        notesBox.current.style.border = '2px solid orange';
        questionType.current.disabled = false;
    }

    function handleChange(e, operation) {
        operation(e.target.value);
    }
    return (
        <div className='question-container' id={index} ref={questionContainer}>
            <select ref={questionType}>
                <option value='conversational'>Conversational</option>
                <option value='conceptual'>Conceptual</option>
                <option value='technical'>Technical</option>
            </select>
            <textarea type='text' placeholder='Enter your question' name='question' rows="4" cols="50" ref={questionBox} value={question} onChange={(e) => handleChange(e, setQuestion)}></textarea>
            <textarea type='text' placeholder='Enter their response' name='response' rows="4" cols="50" ref={responseBox} value={response} onChange={(e) => handleChange(e, setResponse)}></textarea>
            <textarea type='text' placeholder='Enter your notes for this question' name='notes' rows="4" cols="50" ref={notesBox} value={notes} onChange={(e) => handleChange(e, setNotes)}></textarea>
            <input type="number" max="5" onChange={(e) => handleChange(e, setScore)} value={score} ref={scoreInput} />
            {!saved ? <button className='saved-btn' onClick={handleSave}>Save</button> : <button className='update-btn' onClick={handleUpdate}>Update</button>}
            <p className='errorMsg' ref={error}></p>
        </div>
    )
}

export default Question;
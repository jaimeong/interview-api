import React, { useState, useRef } from 'react';
import '../sass/index.scss';

const Question = function({setData, questionData, index, setQuestionData}) {
    const questionType = useRef(null);
    const questionBox = useRef(null);
    const responseBox = useRef(null);
    const notesBox = useRef(null);
    const questionContainer = useRef(null);
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [notes, setNotes] = useState('');
    const [saved, setSaved] = useState(false);
    function handleSave() {
        let current = parseInt(questionContainer.current.id, 10);
        if(current >= questionData.length) {
            let type = questionType.current.value;
            let data = {id: questionData.length, type: type, question: question, response: response, notes: notes, date: new Date()};
            setData(data);
            console.log(questionBox);
            questionBox.current.readOnly = true;
            questionBox.current.style.border = '2px solid green';
            responseBox.current.readOnly = true;
            responseBox.current.style.border = '2px solid green';
            notesBox.current.readOnly = true;
            notesBox.current.style.border = '2px solid green';
            questionType.current.disabled = true;
            setSaved(true);
        } else {
            setQuestion(questionBox.current.value);
            setResponse(responseBox.current.value);
            setNotes(notesBox.current.value);
            let type = questionType.current.value;
            let data = {id: index, type: type, question: question, response: response, notes: notes};
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

            setSaved(true);
        }
    }

    function handleUpdate() {
        let type = questionType.current.value;
        setSaved(false);
        questionBox.current.readOnly = false;
        questionBox.current.style.border = '2px solid gold';
        responseBox.current.readOnly = false;
        responseBox.current.style.border = '2px solid gold';
        notesBox.current.readOnly = false;
        notesBox.current.style.border = '2px solid gold';
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
            {!saved ? <button className='saved-btn' onClick={handleSave}>Save</button> : <button className='update-btn' onClick={handleUpdate}>Update</button>}
        </div>
    )
}

export default Question;
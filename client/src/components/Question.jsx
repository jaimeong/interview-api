import React, { useState, useRef } from 'react';
import '../sass/index.scss';

const Question = function({setData, questionData, index, setQuestionData}) {
    const questionType = useRef(null);
    const questionBox = useRef(null);
    const responseBox = useRef(null);
    const notesBox = useRef(null);
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState('');
    const [notes, setNotes] = useState('');
    const [saved, setSaved] = useState(false);
    function handleSave() {
        let type = questionType.current.value;
        let data = {id: questionData.length, type: type, question: question, response: response, notes: notes};
        setData(data);
        questionBox.current.readOnly = true;
        questionBox.current.style.border = '2px solid green';
        responseBox.current.readOnly = true;
        responseBox.current.style.border = '2px solid green';
        notesBox.current.readOnly = true;
        notesBox.current.style.border = '2px solid green';
        setSaved(true);
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
    }

    function handleChange(e, operation) {
        operation(e.target.value);
    }
    return (
        <div className='question-container'>
            <select ref={questionType}>
                <option value='conversational'>Conversational</option>
                <option value='conceptual'>Conceptual</option>
                <option value='technical'>Technical</option>
            </select>
            <textarea type='text' placeholder='Enter your question' name='question' rows="4" cols="50" ref={questionBox} onChange={(e) => handleChange(e, setQuestion)}></textarea>
            <textarea type='text' placeholder='Enter their response' name='response' rows="4" cols="50" ref={responseBox} onChange={(e) => handleChange(e, setResponse)}></textarea>
            <textarea type='text' placeholder='Enter your notes for this question' name='notes' rows="4" cols="50" ref={notesBox} onChange={(e) => handleChange(e, setNotes)}></textarea>
            {!saved ? <button onClick={handleSave}>Save</button> : <button onClick={handleUpdate}>Update</button>}
        </div>
    )
}

export default Question;
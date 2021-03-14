import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';

const DeleteInterview = () => {
    const [id, setId] = useState('');
    const [input, setInput] = useState('');
    const correctId = useRef(null);

    useEffect(() => {
        let url = window.location.href.split('/');
        let id = url[url.length - 1];
        setId(id);
        console.log(id);
    }, [])

    useEffect(() => {
        if(input !== id && input.length > 0) {
            correctId.current.style.border = '2px solid red';
        } else if(input === id) {
            correctId.current.style.border = '2px solid green';
        } else {
            correctId.current.style.border = '2px solid black';
        }
    }, [input])

    function handleChange(e) {
        setInput(e.target.value);
    }

    function handleDelete() {
        if(input === id) {
            axios.delete(`https://horsefields.wl.r.appspot.com/api/interview/${id}`)
            .then(() => {
                window.location = '/dashboard';
            });
        }
    }

    return (
        <div>
            <h1>Delete interview: {id} ?</h1>
            <div className='delete-interaction'>
                <label>Please enter id in order to be deleted</label>
                <input type='text' placeholder='Enter' value={input} onChange={(e) => handleChange(e)} ref={correctId} />
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteInterview;
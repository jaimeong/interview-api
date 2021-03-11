import React, { useState, useRef, useEffect } from 'react';

const Password = () => {
    const [pass, setPass] = useState('');
    let error = useRef(null);

    function handleInput(e) {
        setPass(e.target.value);
        error.current.textContent = ''
    }

    function handleSubmit(e) {
        let demonstrable = 'demonstrable';
        if(demonstrable === pass) {
            window.location = '/dashboard';
            localStorage.setItem('horsefield', true);
        } else {
            error.current.textContent = 'Wrong password, please try again.'
            error.current.style.color = 'red'
        }
    }

    useEffect((e) => {
        const listener = (event) => {
            if(event.code === 'Enter') {
                handleSubmit();
            }
        }
        document.addEventListener("keydown", listener);
        return () => {
          document.removeEventListener("keydown", listener);
        }; 
    })
    return (
        <div className='password-container'>
            <div className='password-intro'>
                <h1>Welcome to Horse Field Interviews</h1>
                <div>
                <p>Horse Field Interviews is a web application that serves the purpose of conducting mock interviews with friends.</p>
                <p>Be better prepared for your next interview by recording your questions, responses, and notes.</p>
                <p>We give you the ability to review your interviews and gain feedback on areas of improvement!</p>
                </div>
            </div>
            <div className='password-entry'>
                <h1>Please enter password</h1>
                <div className='password-div'>
                    <input type='password' placeholder='Password' value={pass} onChange={(e) => handleInput(e)}/>
                    <button className='password-btn' type='submit' onClick={handleSubmit}>Submit</button>
                    <p ref={error}></p>
                </div>
            </div>
        </div>
    )
}

export default Password;
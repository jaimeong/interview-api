import React, { useState, useRef } from 'react';

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
    return (
        <div className='password-container'>
            <h1>Please enter password</h1>
            <div className='password-div'>
                <input type='text' placeholder='Password' value={pass} onChange={(e) => handleInput(e)}/>
                <button className='password-btn' onClick={handleSubmit}>Submit</button>
                <p ref={error}></p>
            </div>
        </div>
    )
}

export default Password;
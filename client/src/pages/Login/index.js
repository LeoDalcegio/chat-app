import React, { useState } from 'react';

import './styles.css'

export default function Login({ history }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    function handleSubmit(event){
        event.preventDefault();

        if(!name || !room){
            alert('Inform a name and a room');
        }else{
            history.push(`/chat?name=${name}&room=${room}`)
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit = {handleSubmit}>
                <h1 className="heading">Login</h1>
                
                    <input 
                        placeholder="Name" 
                        className="login-input" 
                        type="text" 
                        onChange={(event) => setName(event.target.value)}
                    />

                    <input 
                        placeholder="Room" 
                        className="login-input mt-20" 
                        type="text" 
                        onChange={(event) => setRoom(event.target.value)}
                    />

                <button className="button mt-20" type="submit">Sign In</button>                    
            </form>
        </div>
    )
}
import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css'

export default function Login({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [room, setRoom] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        if(!email || !room || !password){
            alert('Please login and inform a room');
        }else{
            const response = await api.post('/users/auth/login', {
                email,
                password
            });

            if(response.status !== 200){
                return;
            }

            const { _id } = response.data;
            const { name } = response.data;
            const { authorization } = response.headers;

            localStorage.setItem('user_id', _id);
            localStorage.setItem('user_name', name);
            localStorage.setItem('authorization', authorization);
            localStorage.setItem('user_email', email);

            history.push(`/chat?name=${name}&room=${room}`)
        }
    }
    
    return (
        <div className="login-container">
            <form className="login-form" onSubmit = {handleSubmit}>
                <h1 className="heading">Login</h1>
                
                    <input 
                        placeholder="Email" 
                        className="login-input" 
                        type="email" 
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input 
                        placeholder="Password" 
                        className="login-input mt-20" 
                        type="password" 
                        onChange={(event) => setPassword(event.target.value)}
                    />

                    <input 
                        placeholder="Room" 
                        className="login-input mt-20" 
                        type="text" 
                        onChange={(event) => setRoom(event.target.value)}
                    />

                <button className="button mt-20" type="submit">Sign In</button>                    


                <button className="button mt-20" type="button" onClick={() => history.push('/register')}>Create account</button>
            </form>
        </div>
    )
}

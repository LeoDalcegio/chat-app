import React, { useState } from 'react';
import api from '../../services/api';

import './styles.css'

export default function Register({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        if(!email || !name || !password){
            alert('Please and inform an email, name and password');
        }else{
            const response = await api.post('/users/auth/register', {
                name,
                email,
                password
            });

            if(response.status !== 200){
                return;
            }

            history.push('/')                

        }
    }
   
    return (
        <div className="login-container">
            <form className="login-form" onSubmit = {handleSubmit}>
                <h1 className="heading">Register</h1>
                
                    <input 
                        placeholder="Name" 
                        className="login-input" 
                        type="text" 
                        onChange={(event) => setName(event.target.value)}
                    />

                    <input 
                        placeholder="Email" 
                        className="login-input mt-20" 
                        type="email" 
                        onChange={(event) => setEmail(event.target.value)}
                    />

                    <input 
                        placeholder="Password" 
                        className="login-input mt-20" 
                        type="password" 
                        onChange={(event) => setPassword(event.target.value)}
                    />

                <button className="button mt-20" type="submit">Sign Up</button>                    

            </form>
        </div>
    )
}

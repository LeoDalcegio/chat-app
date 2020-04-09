import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import './styles.css';

import Message from '../Message'

export default function Messages({ messages, name }){
    return (
        <ScrollToBottom className="messages">
            {messages.map((message, i) => (
                <div key={i}> 
                    <Message message={message} name={name}/> 
                </div>
            ))}
        </ScrollToBottom>
    )
}
import React from 'react';

import './styles.css';

export default function Input({ message, setMessage, sendMessage }){
    return (
        <form className="form" onSubmit={(event) => sendMessage(event)}>
            <input 
                value={message} 
                placeholder="Type a message..."
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={(event) => event.key === 'Enter' ? sendMessage(event) : null}
                type="text"
                className="input"
            />
            <button type="submit" className="sendButton">Send</button>
        </form>
    )
}
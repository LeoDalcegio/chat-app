import React from 'react';
import ReactEmoji from 'react-emoji';
import './styles.css';

export default function Message({ message: { user, text }, name }){
    let isSentByCurrentUser = false;

    if(user === name)
        isSentByCurrentUser = true;

    return (
        isSentByCurrentUser
            ? (
                <div className="message-container justify-end">
                    <p className="sent-text pr-10">{name}</p>
                    <div className="message-box background-blue">
                        <p className="message-text color-white">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="message-container justify-start">                    
                    <div className="message-box background-light">
                        <p className="message-text color-dark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="sent-text pl-10">{user}</p>
                </div>
            )
    )
}
import React from 'react';
import './styles.css';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

export default function InfoBar({ room }){
    return (
        <div className="info-bar">
            <div className="left-inner-container">
                <img className="online-icon" src={onlineIcon} alt="online"/>
                 
                <h3> {room} </h3>
            </div>
            
            <a href="/"><img src={closeIcon} alt="close"/></a>
        </div>
    )
}
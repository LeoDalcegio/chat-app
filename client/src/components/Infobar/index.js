import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

import closeIcon from '../../icons/closeIcon.png';
import onlineIcon from '../../icons/onlineIcon.png';

export default function InfoBar({ room }){
    
    const handleLogout = () => {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_name');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user_email');
    }

    return (
        <div className="info-bar">
            <div className="left-inner-container">
                <img className="online-icon" src={onlineIcon} alt="online"/>
                 
                <h3> {room} </h3>
            </div>
            
            <Link to="/">
                <a onClick={handleLogout} href="#"><img src={closeIcon} alt="close"/></a>
            </Link>
        </div>
    )
}
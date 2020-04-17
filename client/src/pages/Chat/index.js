import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import api from '../../services/api';

import './styles.css';

import Infobar from '../../components/Infobar';
import Input from '../../components/Input';
import Messages from '../../components/Messages';

let socket;

export default function Chat({ location }) {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [participants, setParticipants] = useState([localStorage.getItem('user_id')]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPONT = 'localhost:5000/'//'https://react-chat--test.herokuapp.com/';

    useEffect(() => {
        const { room } = queryString.parse(location.search);

        socket = io(ENDPONT);
        
        setName(localStorage.getItem('user_name'));
        setRoom(room);

        
        async function udateRoom(){
            const user_id = localStorage.getItem('user_id');

            const response = await api.post('/rooms/add-user', {
                name: room,
                user_id
            }, {
                headers: {
                    authorization: localStorage.getItem('authorization')
                }
            });

            const { participants } = response.data;

            setParticipants(participants);
        }
        udateRoom()
        
        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            
            socket.disconnect();
        }
    }, [ENDPONT, location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });
    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outer-container">
            <div className="container">
                <Infobar room={room}/>

                <Messages messages={messages} name={name}/>

                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    )
}

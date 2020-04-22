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
    const [roomId, setRoomId] = useState('');
    const [participants, setParticipants] = useState([]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const ENDPONT = 'https://react-chat--test.herokuapp.com/'

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPONT);
        
        setRoom(room)
        setName(name)

        socket.emit('join', { name, room }, (error) => {
            if(error) {
                alert(error);
            }
        });

        const token = localStorage.getItem('authorization');
        let room_id = '';

        const addUserToRoom = async (cb) => {
            const userId = localStorage.getItem('user_id');

            const response = await api.post('/rooms/add-user', {
                roomName: room,
                user_id: userId
            }, {
                headers: {
                    authorization: token
                }
            });
            
            setParticipants(response.data.participants);
            setRoomId(response.data._id);

            room_id = response.data._id;
            
            await cb();
        }

        const getRoomMessages = async () => {
            const response = await api.get('/messages', {
                params: {
                    room: room_id
                }
            });

            let roomMessages = [];

            response.data.map((doc) => {
                const newMessage =  {
                    user: doc.user.name,
                    text: doc.content,
                }
                
                roomMessages.push(newMessage)
            });

            setMessages([...messages, ...roomMessages]);
        }

        addUserToRoom(getRoomMessages);
       
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

            console.log(message)

            const sendMessageToDatabase = async () => {
                const userId = localStorage.getItem('user_id');
                const token = localStorage.getItem('authorization');

                const response = await api.post('/messages', {
                    content: message,
                    room: roomId,
                    user: userId
                }, {
                    headers: {
                        authorization: token
                    }
                });
            }
    
            sendMessageToDatabase();
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
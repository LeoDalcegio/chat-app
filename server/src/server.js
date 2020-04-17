const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const socketio = require('socket.io');
const http = require('http');

const UsersRoutes = require('./routes/UsersRoutes');
const AuthRoutes = require('./routes/AuthRoutes');
const RoomRoutes = require('./routes/RoomRoutes');
const MessageRoutes = require('./routes/MessageRoutes');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./util/users');

const app = express();

mongoose.connect(process.env.DB_CONNECT, 
{ 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
() => console.log('Connected to db!'));

const PORT = process.env.PORT || 5000

const server = http.createServer(app);
const io = socketio(server); 


const corsOptions = {
    exposedHeaders: 'authorization',
  };
  
app.use(cors(corsOptions));

app.use(express.json());

app.use('/api/users',UsersRoutes)
app.use('/api/users/auth',AuthRoutes)
app.use('/api/messages',MessageRoutes)
app.use('/api/rooms',RoomRoutes)
app.use(errors());

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ 
            id: socket.id, 
            name,
            room
        });

        if(error) return callback(error);

        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`});

        socket.join(user.room);

        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: user.name, text: message});
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
        }
        
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left`})
        }
    });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

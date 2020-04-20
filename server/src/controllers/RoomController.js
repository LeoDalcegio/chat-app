const Room = require('../models/Room');

const removeDuplicatesFromArray = require('../util/removeDuplicatesFromArray');

module.exports = {
    async addUserToRoom(request, response){
        const { user_id } = request.body;
        const { roomName } = request.body;
        let room;

        const roomExist = await Room.findOne({ name: roomName });
        
        if(roomExist){
            let { participants } = roomExist;

            participants = [...participants, user_id]

            roomExist.participants = removeDuplicatesFromArray(participants)
         
            room = await Room.findByIdAndUpdate(roomExist._id, roomExist, { new: true });
        }else{

            room = await Room.create({
                participants: user_id,
                roomName 
            });
        }

        await room.populate('participants').execPopulate();
        
        return response.json(room);
    },

    async removeUserFromRoom(request, response){
        const { user_id } = request.body;
        const { roomName } = request.body;

        const roomExist = await Room.findOne({ name: roomName });
        
        if(roomExist){
            const index = roomExist.participants.indexOf(user_id);

            if (index > -1) {
                roomExist.participants.splice(index, 1);

                const room = await Room.findByIdAndUpdate(roomExist._id, roomExist, { new: true });

                await room.populate('participants').execPopulate();

                return response.json(room);
            }

            return response.send({ error: 'Invalid user'})
        }

        return response.send({ error: 'Room doesn`t exist'})

    },
    
    async index(request, response){
        const { name } = request.body;

        const room = await Room.findOne({ name });        
        
        return response.json(room);
    },

    async destroy(request, response) {
        const { id } = request.params;
        
        try{
            await Room.findByIdAndDelete(id);
    
            return response.sendStatus(200)
        }catch(err){
            return response.status(400).send(err)
        }
    },

    async update(request, response){
        try{
            request.body.participants = [...new Set(request.body.participants)];

            const room = await Room.findByIdAndUpdate(request.params.id, request.body, { new: true });
            
            await room.populate('participants').execPopulate();
            
            return response.json(room);
        }catch(err){
            return response.status(400).send(err)
        }
    }
}

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
                name 
            });
        }

        await room.populate('participants').execPopulate();

        return response.json(room);
    },

    async removeUserFromRoom(request, response){
        const { user_id } = request.body;
        const { name } = request.body;

        let room;

        request.body.participants = [...new Set(request.body.participants)];

        const data = {
            participants: [...participants, participants],
            name
        }
        
        room = await Room.findByIdAndUpdate(roomExist._id, data, { new: true });

        return response.json(room);
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

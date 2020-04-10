const Message = require('../models/Message');

module.exports = {
    async store(req, res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date,
        });
        
        await booking.populate('spot').populate('user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if(ownerSocket){
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    },
    
    async index(request, response){
        const { page = 1 } = request.query;
        
        const messages = await Message.paginate({ }, { 
            page, 
            limit: 10 
        });
        
        return response.json(messages);
    },
    
    async show(request, response){
        const message = await Message.findById(request.params.id);

        if(!message) 
            return response.status(404).send({error: 'Message not found'});
        
        return response.json(message);
    },

    async destroy(request, response) {
        const { id } = request.params;
        
        try{
            await Message.findByIdAndDelete(id);
    
            return response.sendStatus(200)
        }catch(err){
            return response.status(400).send(err)
        }
    },

    async update(request, response){
        try{
            const message = await Message.findByIdAndUpdate(request.params.id, request.body, { new: true });
            
            return response.json(message);
        }catch(err){
            return response.status(400).send(err)
        }
    }
}

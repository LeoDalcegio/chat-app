const User = require('../models/User');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query;
        
        const users = await User.paginate({ }, { 
            page, 
            limit: 10 
        });
        
        return response.json(users);
    },
    
    async show(request, response){
        const user = await User.findById(request.params.id);

        if(!user) 
            return response.status(404).send({error: 'User not found'});
        
        return response.json(user);
    },

    async destroy(request, response) {
        const { id } = request.params;
        
        try{
            await User.findByIdAndDelete(id);
    
            return response.sendStatus(200)
        }catch(err){
            return response.status(400).send(err)
        }
    },

    async update(request, response){
        try{
            const user = await User.findByIdAndUpdate(request.params.id, request.body, { new: true });
            
            return response.json(user);
        }catch(err){
            return response.status(400).send(err)
        }
    }
}

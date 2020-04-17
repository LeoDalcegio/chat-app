const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const RoomSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    participants: [{ 
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}]
},{
    timestamps: true
});

RoomSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Room', RoomSchema);

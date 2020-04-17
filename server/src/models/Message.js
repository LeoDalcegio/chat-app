const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MessageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

MessageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Message', MessageSchema);

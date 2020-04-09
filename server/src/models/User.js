const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
        select: false
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false
    }
},{
    timestamps: true
});

UserSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', UserSchema);

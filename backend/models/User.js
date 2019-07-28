const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String
    },
    roleName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
},
{   timestamps: true
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
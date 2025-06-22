const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    lName: {
        type: String,
        unique: false,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    favorite: {
        type: [],
    },
    admin: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }

});





const userModule = mongoose.model('user', userSchema);

module.exports = userModule;





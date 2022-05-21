const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: {
        type: String, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email:{
        type: String,
        unique: true, 
        required: true
    },
    time:{
        type: Date,
        default: new Date(), 
    },

})

module.exports = model('User', schema)
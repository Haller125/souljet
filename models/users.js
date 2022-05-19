const { Schema, model } = require('mongoose')

const schema = new Schema({
    username: {
        type: String, 
        unique: true, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    email:{
        type: String,
        required: true
    },
    roles: [
        {
            type: String, 
            ref: 'Role'
        }
    ]

})

module.exports = model('User', schema)
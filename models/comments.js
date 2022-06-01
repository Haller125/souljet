const {Schema, model, mongoose} = require('mongoose')

const comments = new Schema({
    title:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
    },
    userComment:{
        type: String,
        required: true,
    },
    postingTime:{
        type: Date,
        default: new Date().toISOString().slice(0, 19).replace('T', ' '),
    },
})

module.exports = model('comments', comments)
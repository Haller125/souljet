const {Schema, model, mongoose} = require('mongoose')

const article = new Schema({
    title:{
        type: String,
        required: true,
    },
    paragraph:{
        type: String,
        required: true,
    },
    link:{
        type: String,
        required: true,
    },
    postingTime:{
        type: Date,
        default: new Date().toISOString().slice(0, 19).replace('T', ' '),
    },
})

module.exports = model('article', article)
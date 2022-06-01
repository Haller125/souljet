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
})

module.exports = model('article', article)
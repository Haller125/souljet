const {Schema, model} = require('mongoose')


const category = new Schema({
    value: {
        type: String, 
        required: true,
        default: "Things"
    },
})

module.exports = model('category', category);
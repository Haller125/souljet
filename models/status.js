const {Schema, model} = require('mongoose')



const status = new Schema({
    value: {
        type: String, 
        required: true,
        default: "InP" //in Progress
    },
})



module.exports = model('status', status)
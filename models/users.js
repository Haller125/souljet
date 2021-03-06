const { Schema, model, mongoose } = require('mongoose')

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
    lastOnl:{
        type: Date,
        default: new Date().toISOString().slice(0, 19).replace('T', ' '), 
    },
    regTime:{
        type: Date,
        default: new Date().toISOString().slice(0, 19).replace('T', ' '),
    },
    todo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: 'todo',
        }
    ]
    

})

module.exports = model('users', schema)
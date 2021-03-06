const {Schema, model, mongoose} = require('mongoose')

const todos = new Schema({
    title:{
        type: String,
        required: true,
    },
    status:{
        type: String, 
        default: 'inProgress'
    },
    category:{
        type: String,
        required: true,
    },
    deadline:{
        type: Date,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

})


module.exports = model('todos', todos)
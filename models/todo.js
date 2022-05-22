const {Schema, model, mongoose} = require('mongoose')

const todos = new Schema({
    title:{
        type: String,
        required: true,
    },
    status:{
        type: String, 
        ref: 'status',
    },
    category:{
        type: String,
        ref: 'category'
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

})


module.exports = model('todos', todos)
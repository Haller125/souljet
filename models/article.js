const {Schema, model, mongoose} = require('mongoose')

const acticle = new Schema({
    title:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },

})


module.exports = model('todos', todos)
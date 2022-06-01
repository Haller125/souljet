const {Schema, model} = require('mongoose')

const delayMail = new Schema({
    value: {
        type: Schema.Types.ObjectId,
        ref: 'todos'
    },
})


module.exports = model('delayMail', delayMail)
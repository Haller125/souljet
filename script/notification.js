const sendMail = require('../script/sendemail'); 
const delayMails = require('../models/delayMails');
const todos= require('../models/todo');
const users= require('../models/users');

module.exports = async function sendNotification(){
    let notifs = await delayMails.find({});

    for( let i = 0; i < notifs.length; i++){
        let todo2 = await todos.findOne(notifs[i].value);
        let user = await users.findOne(todo2.user_id);

        console.log(todo2.deadline - Date.now())

        if(todo2.deadline - Date.now() > 0){
            if(todo2.deadline - Date.now() < (2 * 864000000) - 1){
                let s = sendMail(user.email, todo2.value);
                await delayMails.deleteOne({_id:notifs[i]._id});
            }
        }else{
            await delayMails.deleteOne({_id:notifs[i]._id});
            
        }
    }
}
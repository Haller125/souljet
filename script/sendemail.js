const transporter = require('../transporter/transporter');

module.exports = async function sendMail(to, text, subject = "Don't forget about this" ){
    let result = await transporter.sendMail({
        from: '"Souljet" soul.jet@bk.ru',
        to: to,
        subject: subject,
        text: 'theme: ' + text,
    });

    console.log(result);
}
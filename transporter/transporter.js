const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
  service: '"Mail.ru"', // no need to set host or port etc.
  auth: {
      user: 'soul.jet@bk.ru',
      pass: 'fdJ7Ea60CpzyQc3dWwx8'
  }
});

module.exports = transporter
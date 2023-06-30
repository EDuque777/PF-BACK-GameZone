const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'carrizosamayito@gmail.com',
    pass: 'agicncfxjhijreqx'
  }
});

module.exports = transporter
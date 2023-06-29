// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     // TODO: replace `user` and `pass` values from <https://forwardemail.net>
//     user: 'esteban.duque911@gmail.com',
//     pass: 'zpfcnghfleafiuvk'
//   },
//   // tls: {
//   //   rejectUnauthorized: false
//   // }
// });

// transporter.verify().then(() => {
//     console.log('Ready for send mails');
// })

// module.exports = transporter








const mailer = require("nodemailer")

const transporter = mailer.createTransport({
    host: "smtp.gmail.com",// que tipo de correo se envia
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: 'esteban.duque911@gmail.com',// con variables de entorno
      pass: 'zpfcnghfleafiuvk'// con variables de entorno
    }
});

async function main(payload) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'esteban.duque911@gmail.com', // sender address // con variables de entorno
      to: "esteban.duque911@gmail.com", // list of receivers // datos de email de la db
      subject: "correo de prueba ✔", // Subject line // asunto de que tipo de peticion se esta haciendo
      //text: "", // plain text body
      html: `
      <b>Su contraseña fue actualizada de manera exitosa haga click para </b>
      <a href="http://localhost:3000/login" > Iniciar Sesion </a>
      `, // html body
    });

    console.log(info, "esto es de nodemailer")

}

module.exports = {
    main
}
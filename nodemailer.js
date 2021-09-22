const nodemailer =require('nodemailer');
const {nodemailer_passkey}=require('./secrets');
// https - 443 http 8080
//userObj-> name email password 
module.exports=async function sendMail(userObj) {
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'goelabhishek694@gmail.com', // generated ethereal user
      pass: nodemailer_passkey, // generated ethereal password
    },
  });

  var Osubject,Otext,Ohtml;

  Osubject=`Thank you for signing ${userObj.name}`;
  Otext=`
   Hope you have a good time !
   Here are your details-
   Name - ${userObj.name}
   Email- ${userObj.email}
   `
  Ohtml=`<h1>Welcome to foodAp.com</h1>`

  let info = await transporter.sendMail({
    from: '"FoodApp 🍱" <goelabhishek694@gmail.com>',// sender address <${userObj.email}>
    to: "deegoel.dg@gmail.com", // list of receivers
    subject: Osubject, // Subject line
    text: Otext, // plain text body
    html: Ohtml, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

  
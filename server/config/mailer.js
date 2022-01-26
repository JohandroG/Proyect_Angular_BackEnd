const nodemailer = require('nodemailer');

//! Password for Gmail "hckareyyegojgsha"

 // create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'elestadiocn.notific@gmail.com', // generated ethereal user
      pass: 'hckareyyegojgsha', // generated ethereal password
    },
});

transporter.verify().then(()=>{
    console.log("Ready for send emails");
})

module.exports = { transporter };



const nodemailer = require("nodemailer");
const { smtpUsername, smtpPassword } = require("../secret/secret");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: smtpUsername,
    pass: smtpPassword,
  }
});

const sendMail = async (emailData) =>{
     // send mail with defined transport object
 try {
    const info = await transporter.sendMail({
        from: smtpUsername, // sender address
        to: emailData.email, // list of receivers
        subject: emailData.subject, // Subject line
        html: emailData.html, // html body
      })
    
      console.log(info.response);
 } catch (error) {
    console.log("Error occured while sending mail", error);
    throw error;
 }

}

module.exports = sendMail;
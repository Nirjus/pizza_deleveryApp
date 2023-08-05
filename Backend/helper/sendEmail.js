const nodemailer = require("nodemailer");
const { SMTPUserName, SMTPPassword } = require("../secret");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: SMTPUserName,
      pass: SMTPPassword,
    }
  });
   
const sendEmailWithNodeMailer = async (emailData) => {
   try {
    const info = await transporter.sendMail({
        from: SMTPUserName, // sender address
        to: emailData.email, // list of receivers
        subject: emailData.subject, // Subject line
        html: emailData.html, // html body
  })
  console.log("Message sent", info.response);
   } catch (error) {
    throw error
   }
}
   
module.exports = sendEmailWithNodeMailer
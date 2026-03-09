const nodemailer = require("nodemailer");
const sendEmail=async(options)=>{
    // 1) create transporter to send email like "email","mailgun","mailtrap"
const transporter = nodemailer.createTransport({
  host:process.env.EMAIL_HOST,
  port:process.env.EMAIL_PORT,
  secure: true, // Use true for port 465, false for port 587
  auth: {
    user:process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// 2)create options
const mailOptions ={
    from: '"tarek el shenawy" <telshenawy562@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message, // Plain-text version of the message
}

await transporter.sendMail(mailOptions)
}

module.exports=sendEmail;
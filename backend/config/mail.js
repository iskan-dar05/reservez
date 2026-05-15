const nodemailer = require('nodemailer')


const mailTransport = ()=>{
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    })
    return transporter
}

module.exports = mailTransport




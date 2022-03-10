require('dotenv').config()
const nodemailer = require('nodemailer')

const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  host: 'smtp.gmail.com', // SMTP 서버 호스트 주소
  port: '587', // 포트 번호
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
})

module.exports = smtpTransport

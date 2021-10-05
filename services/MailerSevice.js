'use strict'

const nodemailer = require('nodemailer')
const CONFIG = require('../config')

const transporter = nodemailer.createTransport({
  service: CONFIG.MAIL.SERVICE,
  auth: {
    user: CONFIG.MAIL.USER,
    pass: CONFIG.MAIL.TOKEN
  }
})

exports.send = async function(to, subject, text) {
  var mailOptions = {
    from: CONFIG.MAIL.USER,
    to,
    subject,
    text
  }
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}

exports.sendError = async function(to) {
  var mailOptions = {
    from: CONFIG.MAIL.USER,
    to,
    subject: 'Ha ocurrido un error durante la construcción',
    text: `Ha ocurrido un error durante la construcción que ha solicitado`
  }
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  })
}
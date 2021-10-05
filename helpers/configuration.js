
const bcrypt = require('bcrypt') 
const randomstring = require("randomstring")
const saltRounds = 10

const MailerService = require('../services/MailerSevice')
const { USER } = require('../config')

/**
 * Initializes admin user into the system.
 *  
 * @param {*} params
 */
const initialConfiguration = async function(User) {
  let params = { 
    email: USER.ADMIN_USER
  }
  let user = await User.findOne({ where: { email: params.email } })
  if (!user) {
    createOrUpdateUser(params, User)
  }
}

/**
 * Creates or updates data of an user in the system.
 *  
 * @param {*} params
 */
const createOrUpdateUser = async function(params, User) {
  let created = true
  let user = await User.findOne({ where: { email: params.email } })
  let pass = randomstring.generate({ length: 8 })
  params.pass = await hashPass(pass)

  if (user === null) {
    user = await User.create(params)
  } else {
    created = false
    user.update(params, {
      where: { email: params.email }
    })
    await user.save()
  }

  console.log('Envía constraseña por correo.')
  MailerService.send(user.email, 
    'Chef-Mc-Front: Nueva contraseña.', 
    `Aquí tiene su nueva constraseña ${pass}`)
  
  return {
    created,
    user
  }
}

/**
 * Encrypts user pass.
 * 
 * @param {*} pass 
 */
const hashPass = async function(pass) {
  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(pass, saltRounds, function(err, hash) {
      if (err) reject(err)
      resolve(hash)
    });
  })

  return hashedPassword
}


module.exports = {
  initialConfiguration
}
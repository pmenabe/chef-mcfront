'use strict'

const bcrypt = require('bcrypt') 
const jwt = require('jsonwebtoken')
const { User } = require('../../models')

const login = async function(req, res) {
  let params = req.body
  let user = await User.findOne({ where: { email: params.email } })
  const failMessage = `El usuario o contraseña no son correctos.`
  if (!user) {
    res.send({ message: failMessage }, 401)
    return
  }

  let isRight = await compareHashPassword(params.pass, user)
  if (isRight) {
    let token = jwt.sign(params, 'secret')
    user.token = token
    await user.save()
    const message = `El usuario se ha logeado con éxito.`
    res.send({ data: {token}, message })
  } else {
    res.send({ message: failMessage }, 401)
  }
}

const logout = async function(req, res) {
  const message = 'Sesión cerrada.'
  req.user.token = null
  req.user.save()
  res.send({ message })
}

const compareHashPassword = async function (pass, user) {
  const comparedPassword = await new Promise((resolve, reject) => {
    bcrypt.compare(pass, user.pass, function(err, result) {
      if (err) reject(err)
      resolve(result)
    })
  })

  return comparedPassword
}

module.exports = {
  login,
  logout
}
'use strict'

const bcrypt = require('bcrypt') 
const randomstring = require("randomstring")
const saltRounds = 10

const { User } = require('../../models')

/**
 * Returns users registered in the system
 *  
 * @param {*} req 
 * @param {*} res 
 */
const list = async function(req, res) {
  const data = await User.findAll({
    attributes: {exclude: ['pass', 'token']},
    order: [['email','ASC']]
  })
  const message = 'Listado devuelto con éxito.'
  res.send({ data, message })
}

/**
 * Returns current authenticated user
 *  
 * @param {*} req 
 * @param {*} res 
 */
const getMyUser = async function(req, res) {
  const data = req.user
  delete data.pass
  delete data.token
  const message = 'Usuario devuelto con éxito.'
  res.send({ data, message })
}

/**
 * Returns token of user to get microapp
 *  
 * @param {*} req 
 * @param {*} res 
 */
const getToken = async function(req, res) {
  const token = req.user.id
  const data = { token }
  const message = 'Usuario devuelto con éxito.'
  res.send({ data, message })
}

/**
 * Registers o modifiies an user in the system
 *  
 * @param {*} req 
 * @param {*} res 
 */
const register = async function(req, res) {
  let params = req.body
  let { created, user } = await createOrUpdateUser(params, User)
  const message = `El usuario ${user.email} ha sido ${created ? 'registrado' : 'actualizado' } en el sistema con éxito.`
  res.send({ message })
}

/**
 * Creates or updates data of an user in the system.
 *  
 * @param {*} params
 * @param {User} Model 
 */
const createOrUpdateUser = async function(params, Model) {
  let created = true
  let user = await Model.findOne({ where: { email: params.email } })
  let pass = randomstring.generate({ length: 8 })
  params.pass = await hashPass(pass)

  if (user === null) {
    user = await Model.create(params)
  } else {
    created = false
    user.update(params, {
      where: { email: params.email }
    })
    await user.save()
  }

  console.log('Enviar constraseña por correo.', pass)

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
  getMyUser,
  getToken,
  list,
  register,
  createOrUpdateUser
}
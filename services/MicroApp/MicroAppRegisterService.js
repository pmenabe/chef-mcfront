'use strict'

const { MicroApp } = require('../../models')

const branchList = async function(req, res) {
  let { id } = req.params
  let data = []
  if (id) {
    let microApp = await MicroApp.findOne({ where: { id } })
    data = microApp.branchs.split(',')
  }
  const message = 'Listado devuelto con éxito.'
  res.send({ data, message })
}

const del = async function(req, res) {
  let { id } = req.params
  let data = []
  let message = ''
  if (id) {
    try {
      await MicroApp.destroy({ where: { id } })
      message = 'Elemento eliminado con éxito.'
    } catch(e) {
      message = 'Se ha encontrado un error durante el proceso de eliminación.'  
    }
  }
  res.send({ data, message })
}

const get = async function(req, res) {
  let { id } = req.params
  let data = {}
  let message = ''
  if (id) {
    try {
      data = await getItem(id)
      message = 'Elemento recuperado con éxito.'
    } catch(e) {
      message = 'Se ha encontrado un error durante el proceso de eliminación.'  
    }
  }
  res.send({ data, message })
}

const getItem = async function(id) {
  let microApp = await MicroApp.findOne({ where: { id } })
  return microApp
}

const list = async function(req, res) {
  let data = await MicroApp.findAll({
    attributes: {exclude: ['username', 'password', 'token']},
    order: [['name','ASC']]
  })
  const message = 'Listado devuelto con éxito.'
  res.send({ data, message })
}

const register = async function(req, res) {
  let params = req.body
  params.userId = req.user.id
  let { created, microApp } = await createOrUpdateApp(params)
  const message = `La microaplicación ${microApp.name} ha sido ${created ? 'registrada' : 'actualizada' } en el sistema con éxito y está lista para las peticiones de sus desarrolladores.`
  res.send({ message })
}

const createOrUpdateApp = async function(params) {
  let created = true
  let microApp = await MicroApp.findOne({ where: { name: params.name } })
  if (microApp === null) {
    microApp = await MicroApp.create(params)
  } else {
    created = false
    microApp.update(params, {
      where: { name: params.name }
    })
    await microApp.save()
  }
  return {
    created,
    microApp
  }
}


module.exports = {
  branchList,
  del,
  get,
  getItem,
  list,
  register
}
'use strict'

const Providers = require('../../models/Providers')

const list = async function(req, res) {
  let data = Object.keys(Providers).map((key) => Providers[key])
  const message = 'Listado devuelto con éxito.'
  res.send({ data, message })
}

module.exports = {
  list
}
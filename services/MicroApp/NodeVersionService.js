'use strict'

const Node = require('../../models/Node')

const list = async function(req, res) {
  let data = Object.keys(Node).map((key) => Node[key])
  const message = 'Listado devuelto con éxito.'
  res.send({ data, message })
}
module.exports = {
  list
}

'use strict'

// Node Version Service
const NodeVersionService = require('../../services/MicroApp/NodeVersionService')

/**
 * Returns nodejs list
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.index = function (req, res, next) {
  NodeVersionService.list(req, res)
}


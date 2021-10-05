'use strict'

// Provider Service
const ProviderService = require('../../services/MicroApp/ProviderService')

/**
 * Returns provider list
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.index = function (req, res, next) {
  ProviderService.list(req, res)
}
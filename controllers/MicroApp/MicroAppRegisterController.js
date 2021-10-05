'use strict'

// MicroApp Register Service
const MicroAppRegisterService = require('../../services/MicroApp/MicroAppRegisterService')

/**
 * Returns branch list of a microapp configuration by id param
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.branchList = function (req, res, next) {
  MicroAppRegisterService.branchList(req, res)
}

/**
 * Revomes a microapp configuration by id param
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.del = function (req, res, next) {
  MicroAppRegisterService.del(req, res)
}

/**
 * Returns a microapp configuration by id param
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.get = function (req, res, next) {
  MicroAppRegisterService.get(req, res)
}

/**
 * Returns microapp configuration list
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.index = function (req, res, next) {
  MicroAppRegisterService.list(req, res)
}

/**
 * Stores a new microapp configuration
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.register = function (req, res, next) {
  MicroAppRegisterService.register(req, res)
}
'use strict'

const UserRegisterService = require('../../services/User/UserRegisterService')

/**
 * Returns list of users
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.index = function (req, res, next) {
  UserRegisterService.list(req, res)
}

/**
 * Returns current user
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.getMyUser = function (req, res, next) {
  UserRegisterService.getMyUser(req, res)
}

/**
 * Returns token
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.getToken = function (req, res, next) {
  UserRegisterService.getMyUser(req, res)
}

/**
 * Register new user
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.register = function (req, res, next) {
  UserRegisterService.register(req, res)
}

'use strict'

const AuthenticationService = require('../../services/User/AuthenticationService')

/**
 * Login user into the system
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.login = function (req, res, next) {
  AuthenticationService.login(req, res)
}

/**
 * Logout user of the system
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.logout = function (req, res, next) {
  AuthenticationService.logout(req, res)
}

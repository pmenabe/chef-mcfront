'use strict'

// MicroApp Bundle Service
const MicroAppBundleService = require('../../services/MicroFrontBuilder/MicroAppBundleService')
// MicroFront Builder Service
const MicroFrontBuilderService = require('../../services/MicroFrontBuilder/MicroFrontBuilderService')

/**
 * Revomes a microapp by id param
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.del = function (req, res, next) {
  MicroAppBundleService.del(req, res)
}

/**
 * Returns microapp list
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.index = function (req, res, next) {
  MicroAppBundleService.list(req, res)
}

/**
 * Builds microapp
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
exports.build = function (req, res, next) {
  MicroFrontBuilderService.build(req, res)
}

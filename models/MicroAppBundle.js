'use strict'

const Sequelize = require('sequelize')

/**
 * MicroApp Bundle Model  
 */
module.exports = (sequelize, type) => {
  return sequelize.define('micro_app_bundle', {
      id: {
        type: type.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      branch: type.STRING,
      commit: type.STRING,
      status: type.STRING
  })
}
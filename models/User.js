'use strict'

const Sequelize = require('sequelize')

/**
 * User Model  
 */
module.exports = (sequelize, type) => {
  return sequelize.define('user', {
      id: {
        type: type.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      email: {
        type: type.STRING,
        allowNull: false,
      },
      pass: {
        type: type.STRING,
        allowNull: false,
      },
      token: type.STRING
  })
}
'use strict'

const Sequelize = require('sequelize')
const Node = require('./Node')
const Providers = require('./Providers')

/**
 * MicroApp Configuration Model  
 */
module.exports = (sequelize, type) => {
  return sequelize.define('micro_app', {
      id: {
        type: type.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      // MicroApp
      name: {
        type: type.STRING,
        unique: true
      },
      // Repository
      type: {
        type: type.STRING,
        get() {
          const rawValue = this.getDataValue('type');
          return rawValue ? Providers[rawValue] : null;
        }
      },
      repository: type.STRING,
      branchs: type.STRING,
      username: type.STRING,
      password: type.STRING,
      token: type.STRING,
      // Environment
      node: {
        type: type.STRING,
        get() {
          const rawValue = this.getDataValue('node');
          return rawValue ? Node[rawValue] : null;
        }
      },
      // Build
      commadsToBuild: type.STRING,
      // Dest
      bundleDir: type.STRING
  })
}
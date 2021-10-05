'use strict'

const express = require('express')
const router = express.Router()

// Basic Security Module
const { authorization } = require('../middleware/Auth')

// MicroFront Builder Module
const MicroFrontBuilderController = require('../controllers/MicroFrontBuilder/MicroFrontBuilderController')

// MicroApp Module
const MicroAppRegisterController = require('../controllers/MicroApp/MicroAppRegisterController')
const NodeVersionController = require('../controllers/MicroApp/NodeVersionController')
const ProviderController = require('../controllers/MicroApp/ProviderController')

// User Module
const AuthenticationController = require('../controllers/User/AuthenticationController')
const UserRegisterController = require('../controllers/User/UserRegisterController')

/**
 * API Router
 */
const APIRoutes = function() {
  /**
   * Builder Routes.
   */
  router.get('/micro-app-bundles', authorization, MicroFrontBuilderController.index)
  router.post('/micro-app-bundles', authorization, MicroFrontBuilderController.build)
  router.delete('/micro-app-bundles/:id', authorization, MicroFrontBuilderController.del)

  /**
   * Authentication routes
   */
  router.post('/login', AuthenticationController.login)
  router.get('/logout', authorization, AuthenticationController.logout)

  /**
   * MicroApp register routes
   */
  router.get('/micro-apps', authorization, MicroAppRegisterController.index)
  router.get('/micro-apps/:id', authorization, MicroAppRegisterController.get)
  router.post('/micro-apps', authorization, MicroAppRegisterController.register)
  router.delete('/micro-apps/:id', authorization, MicroAppRegisterController.del)
  router.get('/micro-apps/:id/branchs', authorization, MicroAppRegisterController.branchList)
  router.get('/node-versions', authorization, NodeVersionController.index)
  router.get('/providers', authorization, ProviderController.index)

  /**
   * User regiter routes
   */
  router.get('/users', authorization, UserRegisterController.index)
  router.get('/my-user', authorization, UserRegisterController.getMyUser)
  router.get('/token', authorization, UserRegisterController.getToken)
  router.post('/users', authorization, UserRegisterController.register)

  return router
}

module.exports = APIRoutes
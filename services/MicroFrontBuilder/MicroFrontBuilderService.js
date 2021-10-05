'use strict'

const Bull = require('bull')
const MicroAppService = require('../MicroApp/MicroAppRegisterService')
const GitSevice = require('./GitService')
const MailerService = require('../MailerSevice')
const MicroAppBundleService = require('./MicroAppBundleService')
const UserService = require('./UserService')
const { MicroAppBundle } = require('../../models')
const io = require('../../io')

const mcFrontBuilder = new Bull('mcFrontBuilder')

/**
 * Requets to build new micro app for an user.
 * It adds this user built request into the system and create a new job to process.
 *  
 * @param {Object} req 
 * @param {Object} res 
 */
exports.build = async function(req, res) {
  let params = req.body
  let user = req.user
  const { commit, branch, microAppId } = params

  // Get MicroApp Configuration
  const microApp = await MicroAppService.getItem(microAppId)
  
  // If MicroApp wasn't found, send an error message to client.
  if (!microApp) {
    res.send({ message: 'El microfrontend que quiere construir no se encuentra registrado en el sistema.' }, 404)
    return
  }
  
  // Creates new microApp to built and set status to "waiting"
  const microAppBundle = await MicroAppBundle.create({ microAppId: microApp.id, branch, commit, status: 'waiting' })
  await UserService.updateUserAppState(user, microAppBundle)

  // Adds new job to queue
  await mcFrontBuilder.add({ user, microAppBundle, microApp, branch, commit })
  res.send({ message: 'Proceso de sincronización y construcción iniciado correctamente.' })
}

/**
 * Processes a job to build new microapp
 *  
 * @param {Object} job 
 */
mcFrontBuilder.process(async (job) => {
  let { commit, microAppBundle } = job.data
  const { user, branch, microApp } = job.data

  // Get model of microapp bundle
  microAppBundle = await MicroAppBundleService.getItem(microAppBundle.id)

  // Checks if micro app has been created before.
  let existMicroAppBundle = await MicroAppBundleService.getByParams(microApp.id, commit, 'built')
  
  // Builds micro app if it isn't exits.
  if (!existMicroAppBundle) {
    microAppBundle = await MicroAppBundleService.updateStatus(microAppBundle, 'synchronizing')
    io[user.token].emit("status", microAppBundle)

    // Clones micro app from git repo.
    let gitResult = await GitSevice.cloneRepo(microApp, branch, commit)
    if (gitResult.error) {
      io[user.token].emit("status", gitResult.error)
      return
    }
    // Built micro app.
    microAppBundle.commit = gitResult.commit
    microAppBundle = await MicroAppBundleService.updateStatus(microAppBundle, 'building')
    io[user.token].emit("status", microAppBundle)

    await MicroAppBundleService.create(microApp, branch, microAppBundle.commit)
  }
  
  microAppBundle = await MicroAppBundleService.updateStatus(microAppBundle, 'built')

  return { microAppBundle, microApp, commit, user }
})

/**
 * Handles failed job
 * 
 * @param {Object} job 
 */
mcFrontBuilder.on('failed', (job, result) => {
  if (result.user) {
    io[result.user.token].emit("status", "failed")
    //MailerService.sendError(result.user.email)
  }
  console.log(`Error ${result}`, job)
})

/**
 * Handles completed job
 * 
 * @param {Object} job 
 */
mcFrontBuilder.on('completed', (job, result) => {
  if (result.user) {
    io[result.user.token].emit("status", result.microAppBundle)
    //MailerService.send(result.user.email)
  }
  console.log(`Job completed with result ${result}`)
})
'use strict'

const CONFIG = require('../../config')
const execShellCommand = require('../_utils').execShellCommand

/**
 * Builds Structure to serve a specific version of a micro app.
 * 
 * @param {String} id 
 * @param {String} commit 
 */
exports.buildRepoSpace = async function(id, commit) {
  await createStructureToServeMicroApp(id, commit)
}

/**
 * Creates a new structure of folders to server microapp from FaaS.
 * 
 * @param {MicroApp} id 
 * @param {String} commit
 */
const createStructureToServeMicroApp = async function(microApp, commit) {
  await execShellCommand(`mkdir ${CONFIG.BUILT_PATH}/${microApp.id}-${commit}`)
}
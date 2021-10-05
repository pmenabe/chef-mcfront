const CONFIG = require('../../config')
const { MicroAppBundle, MicroApp, User } = require('../../models')
const execShellCommand = require('../_utils').execShellCommand

/**
 * Builds a micro app with commit version.
 * 
 * @param {Object} microApp 
 * @param {String} branch 
 * @param {String} commit 
 */
const create = async function (microApp, branch, commit) {
  await execShellCommand(`cd ${CONFIG.BUILT_PATH}/${microApp.id}-${commit}/ && unset npm_config_prefix && . ~/.nvm/nvm.sh && nvm use ${microApp.node.label} && node -v && ${microApp.commadsToBuild}`)
}

/**
 * Updates status of a micro app.
 * 
 * @param {Object} microAppBundle 
 * @param {String} status 
 */
const updateStatus = async function (microAppBundle, status) {
  microAppBundle.status = status
  await microAppBundle.save()  
  return microAppBundle
}

/**
 * Delete a micro app bundle of an user.
 * 
 * @param {*} req 
 * @param {*} res 
 */
const del = async function(req, res) {
  let { id } = req.params
  let data = []
  let message = ''
  if (id) {
    try {
      await MicroAppBundle.destroy({ where: { id } })
      message = 'Elemento eliminado con éxito.'
    } catch(e) {
      message = 'Se ha encontrado un error durante el proceso de eliminación.'  
    }
  }
  res.send({ data, message })
}

/**
 * Get item by id
 * 
 * @param {String} id 
 */
const getItem = async function(id) {
  let microAppBundle = await MicroAppBundle.findOne({ where: { id } })
  return microAppBundle
}

/**
 * Returns bundles registered by user in the system
 * 
 * @param {*} req 
 * @param {*} res 
 */
const list = async function(req, res) {
  const data = await MicroAppBundle.findAll({
    include: [{
      model: User,
      as: 'users',
      where: {
        id: req.user.id
      },
      required: true
    },
    {
      model: MicroApp
    }]
  })
  const message = 'Listado devuelto con éxito.'
  res.send({ data, message })
}

/**
 * Checks if a micro app with this "commit" version has been created.
 * 
 * @param {String} id 
 * @param {String} commit 
 */
const getByParams = async function(microAppId, commit, status) {
  let microAppBundle = await MicroAppBundle.findOne({ where: { microAppId, commit, status } })
  return microAppBundle
}

module.exports = {
  create,
  del,
  getByParams,
  getItem,
  list,
  updateStatus
}
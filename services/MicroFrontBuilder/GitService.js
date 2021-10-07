
const git = require('simple-git')
const fs = require('fs')
const path = require('path')
const CONFIG = require('../../config')
const execShellCommand = require('../_utils').execShellCommand

/**
 * Clones repo from preconfigurated control version system of a microapp 
 * @param {Object} microApp
 * @param {String} commit
 */
exports.cloneRepo = async function(microApp, branch, commit) {
  let dest = await restoreDest(microApp, branch, commit)
  const remote = `https://${microApp.username}:${microApp.password}@${microApp.repository}`
  console.log('remote', microApp.repository)
  try {
    await git().silent(true).clone(remote, dest)
    if (commit) {
      await git().cwd(dest).reset('hard', [commit])
    } else {
      let rawCommit = await execShellCommand(`cd ${CONFIG.BUILT_PATH}/${microApp.id}-${branch} &&git log origin/${branch} -n 1 --pretty=oneline | tail -n 1`)
      commit = rawCommit.split(' ')[0]
      await execShellCommand(`cd ../..`)
      await restoreDest(microApp, branch, commit)

      await execShellCommand(`mv ${path.resolve(__dirname, `../../${CONFIG.BUILT_PATH}/${microApp.id}-${branch}`)} ${path.resolve(__dirname, `../../${CONFIG.BUILT_PATH}/${microApp.id}-${commit}`)}`)
      await execShellCommand(`cd ${path.resolve(__dirname, '../..')}`)
      await git().cwd(`${CONFIG.BUILT_PATH}/${microApp.id}-${commit}`).reset('hard', [commit])
    }
    return { commit }
  } catch (error) {
    console.error('failed: ', error)
    return { error }
  }
}


/**
 * Clone destine folder.
 * 
 * @param {MicroApp} id 
 * @param {String} commit
 */

/**
 * Restores destine folder.
 * 
 * @param {MicroApp} id 
 * @param {String} commit
 */
const restoreDest = async function(microApp, branch, commit) {
  let suffix = commit ? commit : branch
  let dest = path.resolve(__dirname, `../../${CONFIG.BUILT_PATH}/${microApp.id}-${suffix}/`)

  console.log('dest', dest)
  try {
    fs.statSync(dest)
    await execShellCommand(`rm -R ${dest}`)
  }
  catch (err) {
    console.log('err', err)
    if (err.code === 'ENOENT') {
      console.log('Directory will be created from repository');
    }
  }
  return dest
}

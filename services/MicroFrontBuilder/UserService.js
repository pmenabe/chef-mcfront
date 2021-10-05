
/**
 * Update Micro App state for a user
 * 
 * @param {String} token 
 * @param {String} id 
 * @param {String} commit 
 */
const updateUserAppState = function (user, microAppBundle) {
  microAppBundle.addUser(user.id)
}

module.exports = {
  updateUserAppState
}
const { Op } = require("sequelize")
const { User } = require('../models')

/**
 * Basic Authorization
 * It could be changed to passport strategies (http://www.passportjs.org/)
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {Function} next 
 */
const authorization = async function(req, res, next) {
  const bearerHeader = req.headers['authorization']

  if (bearerHeader) {
    const bearer = bearerHeader.split(' ')
    const bearerToken = bearer[1]
    let user = await User.findOne({ where: 
      { 
        [Op.and]: [
          { token: bearerToken },
          { token: { [Op.not]: null }}
        ] 
      } 
    })
    if (user) {
      req.user = user
      next()
    } else {
      res.sendStatus(401)    
    }
  } else {
    // Forbidden
    res.sendStatus(401)
  }
}

module.exports = {
  authorization
}
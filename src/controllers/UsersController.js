const httpStatus = require("http-status")
const User = require("../models/User")

/**
 * POST /accounts
 */
const registerUser = function(request, response) {
  response.status(httpStatus.NO_CONTENT)
}

/**
 * GET /accounts
 */
const listUsers = function(request, response) {
  User.find({}).exec(function(error, users) {
    if(error) {
      response.send(error)
    } else {
      response.status(httpStatus.OK)
      response.json(users)
    }
  })
}

/**
 * GET /accounts/:userId
 */
const getUserDetail = function(request, response) {
  response.status(httpStatus.NO_CONTENT)
}

/**
 * PUT /accounts/:userId
 */
 const updateUser = function(request, response) {
  response.status(httpStatus.NO_CONTENT)
}

/**
 * DELETE /accounts/:userId
 */
 const deleteUser = function(request, response) {
  response.status(httpStatus.NO_CONTENT)
}


module.exports = {
  registerUser: registerUser,
  listUsers: listUsers,
  getUserDetail: getUserDetail,
  updateUser: updateUser,
  deleteUser: deleteUser
}
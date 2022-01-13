const httpStatus = require("http-status")
const User = require("../models/User")

/**
 * POST /accounts
 */
const registerUser = function(request, response) {
  let user = new User(request.body)
  user.save(function(error, savedUser) {
    if(error) {
      response.send(error)
    } else {
      response.status(httpStatus.OK)
      response.json(savedUser)
    }
  })
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
  User.findById(request.params.userId).exec(function(error, user) {
    if(error) {
      response.send(error)
    } else if(user == null) {
      response.status(httpStatus.NOT_FOUND)
      response.send("Not found")
    } else {
      response.status(httpStatus.OK)
      response.json(user)
    }
  })
}

/**
 * PUT /accounts/:userId
 */
 const updateUser = function(request, response) {
  User.findById(request.params.userId).exec(function(error, user) {
    if(error) {
      response.send(error)
    } else if(user == null) {
      response.status(httpStatus.NOT_FOUND)
      response.send("NOt found")
    } else {
      (Object.assign(user, request.body)).save(function(updateError, updatedUser) {
        if(updateError) {
          response.send(updateError)
          response.send("")
        } else {
          response.status(httpStatus.OK)
          response.json(updatedUser)
        }
      })
    }
  })
}

/**
 * DELETE /accounts/:userId
 */
 const deleteUser = function(request, response) {
  User.findById(request.params.userId).exec(function(error, user) {
    if(error) {
      response.send(error)
    } else if(user == null) {
      response.status(httpStatus.NOT_FOUND)
      response.send("Not found")
    } else {
      User.remove({ _id: user._id }, function(deleteError, result) {
        if(deleteError) {
          response.send(deleteError)
        } else {
          response.status(httpStatus.OK)
          response.json(result)
        }
      })
    }
  })
}


module.exports = {
  registerUser: registerUser,
  listUsers: listUsers,
  getUserDetail: getUserDetail,
  updateUser: updateUser,
  deleteUser: deleteUser
}
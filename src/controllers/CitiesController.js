const httpStatus = require("http-status")
const City = require("../models/City")

/**
 * GET /cities
 */
const listCities = function(request, response) {
  City.find({}).exec(function(error, cities) {
    if(error) {
      response.send(error)
    } else {
      response.status(httpStatus.OK)
      response.json(cities)
    }
  })
}

module.exports = {
  listCities: listCities
}
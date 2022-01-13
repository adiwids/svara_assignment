const mongoose = require("mongoose")
const chai = require("chai")
const chaiHttp = require("chai-http")
const should = chai.should()
const httpStatus = require("http-status")
const entrypoint = require("../../src/app")
const { test } = require("../../src/config/environment")
const City = require("../../src/models/City")

chai.use(chaiHttp)

describe("CitiesController", function() {
  before(function() {
    mongoose.connect(test.mongoose.url, test.mongoose.options)
            .then(function() {
              City.deleteMany({})
            })
  })

  after(function() {
    mongoose.connection.close()
  })

  describe("GET /cities", function() {
    it("fetches all cities", function(done) {
      chai.request(entrypoint)
          .get("/cities")
          .end(function(error, response) {
            response.should.have.status(httpStatus.OK)
            response.body.should.be.a('array')
            response.body.length.should.be.eql(0)

            done()
          })
    })
  })
})
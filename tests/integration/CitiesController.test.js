process.env.NODE_ENV = "test"

const mongoose = require("mongoose")
const chai = require("chai")
const chaiHttp = require("chai-http")
const httpStatus = require("http-status")
const entrypoint = require("../../src/app")
const { test } = require("../../src/config/environment")
const City = require("../../src/models/City")
const { bandungCity, jakartaCity } = require("../factories/Cities")

chai.use(chaiHttp)
chai.should()

describe("CitiesController", function() {
  before(function() {
    mongoose.connect(test.mongoose.url, test.mongoose.options)
            .then(function() {
              City.deleteMany({})
              bandungCity.save()
              jakartaCity.save()
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
            Object.keys(response.body[0]).should.be.eql(["_id", "name"])
            done()
          })
    })
  })
})
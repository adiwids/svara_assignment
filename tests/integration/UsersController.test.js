process.env.NODE_ENV = "test"

const mongoose = require("mongoose")
const chai = require("chai")
const chaiHttp = require("chai-http")
const httpStatus = require("http-status")
const entrypoint = require("../../src/app")
const { test } = require("../../src/config/environment")
const City = require("../../src/models/City")
const { bandungCity } = require("../factories/Cities")
const { user, invalidUser } = require("../factories/Users")
const User = require("../../src/models/User")

chai.use(chaiHttp)
chai.should()

describe("UsersController", function() {
  before(function() {
    mongoose.connect(test.mongoose.url, test.mongoose.options)
            .then(function() {
              City.deleteMany({})
              bandungCity.save()
            })
  })

  afterEach(function(done) {
    User.deleteMany({}, function(ok, count, n) {
      done()
    })
  })

  after(function() {
    mongoose.connection.close()
  })

  describe("GET /accounts", function() {
    beforeEach(function(done) {
      user.save()

      done()
    })
    it("fetches all user accounts", function(done) {
      chai.request(entrypoint)
          .get("/accounts")
          .end(function(error, response) {
            response.should.have.status(httpStatus.OK)
            response.body.should.be.a('array')
            Object.keys(response.body[0]).should.be.eql(["_id", "email", "profile", "last_login", "created_at", "updated_at"])
            done()
          })
    })
  })

  describe("POST /accounts", function() {
    describe("with incorrect email format", function() {
      let obj = invalidUser

      it("returns forbidden response with message", function() {
        chai.request(entrypoint)
          .post("/accounts")
          .send(obj)
          .end(function(error, response) {
            response.should.have.status(httpStatus.FORBIDDEN)
            response.body.should.to.be.a('string')
            done()
          })
      })
    })
  })
})
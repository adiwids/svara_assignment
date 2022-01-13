process.env.NODE_ENV = "test"

const mongoose = require("mongoose")
const chai = require("chai")
const chaiHttp = require("chai-http")
const httpStatus = require("http-status")
const entrypoint = require("../../src/app")
const { test } = require("../../src/config/environment")
const City = require("../../src/models/City")
const { bandungCity } = require("../factories/Cities")
const { user, userAttributes } = require("../factories/Users")
const User = require("../../src/models/User")

chai.use(chaiHttp)
chai.should()

describe("UsersController", function() {
  let objectKeys = ["_id", "email", "profile", "last_login", "created_at", "updated_at"]

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
            Object.keys(response.body[0]).should.be.eql(objectKeys)
            done()
          })
    })
  })

  describe("POST /accounts", function() {
    describe("with incorrect email format", function() {
      let params = userAttributes

      it("returns forbidden response with message", function(done) {
        params.email = "invalid.1.email"

        chai.request(entrypoint)
          .post("/accounts")
          .send(params)
          .end(function(error, response) {
            response.should.have.status(httpStatus.FORBIDDEN)
            response.body.should.be.a('string')
            done()
          })
      })
    })

    describe("with valid parameter", function() {
      let params = userAttributes

      it("returns success status with saved user object", function(done) {
        chai.request(entrypoint)
          .post("/accounts")
          .send(params)
          .end(function(error, response) {
            response.should.have.status(httpStatus.OK)
            response.body.should.be.a('object')
            (Object.keys(response.body)).should.be.equal(objectKeys)
            done()
          })
      })
    })
  })

  describe("GET /accounts/:userId", function() {
    beforeEach(function(done) {
      user.save(function(error, u) {
        done()
      })
    })

    it("fetches user object of given ID", function(done) {
      chai.request(entrypoint)
          .get(`/accounts/${user._id}`)
          .end(function(error, response) {
            response.should.have.status(httpStatus.OK)
            response.body.should.be.a('object')
            Object.keys(response.body).should.be.eql(objectKeys)

            done()
          })
    })
  })

  describe("PUT /accounts/:userId", function() {
    beforeEach(function(done) {
      user.save(function(error, u) {
        done()
      })
    })

    describe("with valid parameters", function() {
      let params = userAttributes
      let newName = "Change Name"
      let oldName = user.name

      it("returns success status with updated user object", function(done) {
        params.name = newName

        chai.request(entrypoint)
            .put(`/accounts/${user._id}`)
            .send(params)
            .end(function(error, response) {
              response.should.have.status(httpStatus.OK)
              response.body.should.be.a('object')
              response.body.should.not.be.equal(oldName)
              response.body.should.be.equal(newName)

              done()
            })
      })
    })
  })
})
process.env.NODE_ENV = "test"

const mongoose = require("mongoose")
const chai = require("chai")
const { test } = require("../../src/config/environment")
const { user } = require("../factories/Users")

const expect = chai.expect

describe("User model", function() {
  before(function() {
    mongoose.connect(test.mongoose.url, test.mongoose.options)
            .then(function() {

            })
  })

  after(function() {
    mongoose.connection.close()
  })

  describe("#password", function() {
    let plainPassword = "12345678"

    describe("as setter method", function() {
      it("encrypts plain password", function() {
        user.password = plainPassword
        expect(user.encryptedPassword).not.to.eql(plainPassword)
        expect(user.validatePassword(plainPassword)).to.equal(true)
      })
    })
  })

  describe("#validatePassword", function() {
    describe("with incorrect plain password", function() {
      it("returns false", function() {
        expect(user.validatePassword('invalidpass')).to.equal(false)
      })
    })
  })
})
const faker = require("faker")
const User = require("../../src/models/User")
const { bandungCity } = require("./Cities")

const baseAttributes = {
  email: faker.internet.email().toLowerCase(),
  password: 'Secret123!',
  name: faker.name.findName(),
  address: faker.address.streetName(),
  cityId: bandungCity._id,
  hobbies: [
    faker.hacker.verb(),
    faker.lorem.word()
  ],
  lastLogin: null
}

const validUser = new User(baseAttributes)

const invalidEmailUser = new User(Object.assign({ email: 'invalid.1' }, baseAttributes))

module.exports = {
  user: validUser,
  invalidUser: invalidEmailUser,
  userAttributes: baseAttributes
}
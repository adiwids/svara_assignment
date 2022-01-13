const testEnv = require("./environments/test")
const devEnv = require("./environments/development")
const prodEnv = require("./environments/production")

module.exports = {
  test: testEnv,
  development: devEnv,
  production: prodEnv
}
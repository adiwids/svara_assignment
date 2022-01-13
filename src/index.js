const path = require("path")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

// load project's local environment variables
dotenv.config({ path: path.join(__dirname, "../.env") })

// init app
const app = require("./app")

// load environment that currently used
const { development, test, production } = require("../src/config/environment")
let env
switch(process.env.NODE_ENV) {
  case "production":
    env = production;
    break;
  case "test":
    env = test;
    break
  default:
    env = development;
    break
}
// data seeder
const runSeeder =  require("./db/seeds")
const port = process.env.PORT || 8080

let server
// connect database then boot up http (express) server
mongoose.connect(env.mongoose.url, env.mongoose.options)
        .then(function() {
          console.log("MongoDB is connected, booting up server...")
          if(process.env.NODE_ENV != "production" || process.env.NODE_ENV != "test") {
            runSeeder()
          }
          server = app.listen(port, function() {
            console.log(`Server is listening on port ${port}`)
          })
        })

process.on("SIGTERM", function() {
  if(server) server.close()
  console.log("Server terminated.")
})

module.exports = app
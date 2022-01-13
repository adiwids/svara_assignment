const { bandungCity, jakartaCity } = require("../../tests/factories/Cities")
const City = require("../models/City")

const runSeeder = async function() {
  City.deleteMany({}, function(ok, count, n) {
    bandungCity.save()
    jakartaCity.save()
  })
}

module.exports = runSeeder
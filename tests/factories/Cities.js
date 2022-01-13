const City = require("../../src/models/City")

const bandung = new City({ name: "Kota Bandung" })
const jakarta = new City({ name: "DKI Jakarta" })

module.exports = {
  bandungCity: bandung,
  jakartaCity: jakarta
}
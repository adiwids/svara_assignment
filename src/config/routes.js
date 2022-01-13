const express = require("express")
const router = express.Router()

const { citiesController } = require("../controllers/index")

router.get("/cities", citiesController.listCities)

module.exports = router

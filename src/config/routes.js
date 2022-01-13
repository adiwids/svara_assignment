const express = require("express")
const router = express.Router()

const { citiesController, usersController } = require("../controllers/index")

router.get("/cities", citiesController.listCities)
router.post("/accounts", usersController.registerUser)
router.get("/accounts", usersController.listUsers)
router.get("/accounts/:userId", usersController.getUserDetail)
router.put("/accounts/:userId", usersController.updateUser)
router.delete("/accounts/:userId", usersController.deleteUser)

module.exports = router

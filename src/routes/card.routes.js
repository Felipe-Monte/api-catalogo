const { Router } = require("express")

const CardsController = require("../controller/CardsController")
const cardsController = new CardsController()

const cardsRoutes = Router()

cardsRoutes.post("/", cardsController.create)
cardsRoutes.get("/", cardsController.index)


module.exports = cardsRoutes
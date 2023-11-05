const { Router } = require("express")

const cardsRouter = require("./card.routes")

const routes = Router()

routes.use("/cards", cardsRouter)

module.exports = routes
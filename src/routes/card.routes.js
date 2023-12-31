const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const CardsController = require("../controller/CardsController")

const cardsController = new CardsController()

const cardsRoutes = Router()
const upload = multer(uploadConfig.MULTER)


cardsRoutes.post("/upload", upload.single("upload"), cardsController.upload)
cardsRoutes.get("/", cardsController.index)

cardsRoutes.delete("/:code", cardsController.delete)

module.exports = cardsRoutes
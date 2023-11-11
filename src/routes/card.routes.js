const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const CardsController = require("../controller/CardsController")
const CardsImageController  = require("../controller/CardsImageController")

const cardsController = new CardsController()
const cardsImageController = new CardsImageController()

const cardsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

cardsRoutes.post("/", cardsController.create)
cardsRoutes.get("/", cardsController.index)

cardsRoutes.post("/image", upload.single("image"), cardsImageController.create)


module.exports = cardsRoutes
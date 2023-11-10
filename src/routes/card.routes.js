const { Router } = require("express")
const multer = require("multer")
const uploadConfig = require("../configs/upload")

const CardsController = require("../controller/CardsController")
const cardsController = new CardsController()

const cardsRoutes = Router()
const upload = multer(uploadConfig.MULTER)

cardsRoutes.post("/", cardsController.create)
cardsRoutes.get("/", cardsController.index)

cardsRoutes.post("/image", upload.single("image"), (request, response) => {
  console.log(request.file.filename)
  response.json()
})


module.exports = cardsRoutes
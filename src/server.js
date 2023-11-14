const express = require("express")
const knex = require("knex")

const uploadConfig = require("./configs/upload")

const cors = require("cors")
const app = express()
const routes = require("./routes")

app.use(cors())
app.use(express.json())

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))

app.use(routes)

const PORT = 3333
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
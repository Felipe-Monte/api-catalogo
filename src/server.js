const express = require("express")
const knex = require("knex")

const app = express()
const routes = require("./routes")

app.use(express.json())

app.use(routes)

const PORT = 3333
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
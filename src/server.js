const express = require("express")
const knex = require("knex")
const knexfile = require("../knexfile")

const app = express()
const db = knex(knexfile)

app.use(express.json())

app.get("/cards", async (request, response) => {
  try {
    const cards = await db('cards').select('*');
    request.json(cards);
  } catch (error) {
    response.status(500).json({ error: 'Erro ao buscar os cartões.' });
  }
})

app.post("/cards", async (request, response) => {
  const { imgUrl, title, code, price } = request.body

  if (!title || !code || !price) {
    return response.json({ error: 'Preencha os campos !' })
  }

  try {
    await db('cards').insert({ imgUrl, title, code, price })
    response.json({ message: 'Cartão adicionado com sucesso !' })
  } catch (error) {
    response.status(500).json({ error: 'Erro ao adicionar cartão' })
  }
})

const PORT = 3333
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`)
})
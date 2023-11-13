const knex = require("knex")
const knexfile = require("../../knexfile")
const db = knex(knexfile)

class CardsController {
  async create(request, response) {
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
  }

  async index(request, response) {
    try {
      const cards = await db('cards').select('*');
      response.json(cards);
    } catch (error) {
      response.status(500).json({ error: 'Erro ao buscar os cartões.' });
    }
  }

  async upload(request, response){
    const { imgUrl, title, code, price } = request.body
    console.log(imgUrl, title, code, price )
  } 

}

module.exports = CardsController
const knex = require("knex")
const knexfile = require("../../knexfile")
const db = knex(knexfile)

const DiskStorage = require("../providers/DiskStorage")

class CardsController {
  async create(request, response) {
    // const { imgUrl, title, code, price } = request.body

    // if (imgUrl === "" || imgUrl === null) {
    //   return response.json({ error: 'Coloque a imagem !' })
    // }

    // if (!title || !code || !price) {
    //   return response.json({ error: 'Preencha os campos !' })
    // }

    // try {
    //   await db('cards').insert({ title, code, price })
    //   response.json({ message: 'Cartão adicionado com sucesso !' })
    // } catch (error) {
    //   response.status(500).json({ error: 'Erro ao adicionar cartão' })
    // }
  }

  async index(request, response) {
    try {
      const cards = await db('cards').select('*');
      return response.json(cards);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar os cartões.' });
    }
  }

  async upload(request, response) {
    const avatarFileName = request.file.filename
   
    const { title, code, price } = request.body

    const diskStorage = new DiskStorage()

    const filename = await diskStorage.saveFile(avatarFileName)

    const card = await db("cards").insert({ imgUrl: filename, title, code, price })

    console.log(card)

    return response.json(card)
  }

  async delete(request, response){
    const { code } = request.params;
    const diskStorage = new DiskStorage();

    try {
      const imagePath = await db("cards").where({ code }).select("imgUrl").first();

      await db("cards").where({ code }).delete();

      if (imagePath && imagePath.imgUrl) {
        await diskStorage.deleteFile(imagePath.imgUrl);
      }

      return response.status(200).send();
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Erro ao excluir o item." });
    }

  }
}

module.exports = CardsController
const knex = require("knex")
const knexfile = require("../../knexfile")
const db = knex(knexfile)

const DiskStorage = require("../providers/DiskStorage")

class CardsController {
  async index(request, response) {
    try {
      const cards = await db('cards').select('*');
      return response.json(cards);
    } catch (error) {
      return response.status(500).json({ error: 'Erro ao buscar os cartões.' });
    }
  }

  async upload(request, response) {
    try {
      // Validar campos obrigatórios
      const { title, code, price } = request.body;
      if (!title || !code || !price) {
        return response.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
      }
  
      // Verificar se o arquivo de imagem foi fornecido
      if (!request.file) {
        return response.status(400).json({ error: 'Envie uma imagem válida.' });
      }
  
      const avatarFileName = request.file.filename;
      const diskStorage = new DiskStorage();
  
      // Salvar a imagem no sistema de armazenamento
      const filename = await diskStorage.saveFile(avatarFileName);
  
      // Inserir informações do cartão no banco de dados
      const [newCardId] = await db("cards").insert({ imgUrl: filename, title, code, price });
  
      // Retornar as informações do novo cartão
      const newCard = await db('cards').where('id', newCardId).first();
      return response.json(newCard);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: 'Erro ao realizar o upload do cartão.' });
    }
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
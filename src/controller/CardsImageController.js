const knex = require("knex");
const knexfile = require("../../knexfile");
const DiskStorage = require("../providers/DiskStorage");
const db = knex(knexfile);

class CardsImageController {
  async create(request, response) {
    const cards = await db('cards').where("id",2).select("*")
    console.log(cards)
    // try {
    //   const cardId = request.body.cardId;
    
    //   const imageFileName = request.file.filename;

    //   const diskStorage = new DiskStorage();

    //   // Consulta o card no banco de dados
    //   const card = await db("cards").where( "id", cardId ).first();

    //   // Verifica se o card existe
    //   if (!card) {
    //     return response.status(404).json({ error: 'Card não encontrado.' });
    //   }

    //   // Deleta a imagem antiga, se existir
    //   if (card.imgUrl) {
    //     await diskStorage.deleteFile(card.imgUrl);
    //   }

    //   // Salva a nova imagem e atualiza o campo imgUrl no card
    //   const newImageUrl = await diskStorage.saveFile(imageFileName);
    //   card.imgUrl = newImageUrl;

    //   // Atualiza o card no banco de dados
    //   await db("cards").where({ id: cardId }).update({ imgUrl: newImageUrl });

    //   return response.json(card);
    // } catch (error) {
    //   console.error(error);
    //   return response.status(500).json({ error: 'Erro interno no servidor.' });
    // }
  }
}

module.exports = CardsImageController;


exports.up = knex => knex.schema.createTable("cards", table => {
  table.increments('id').primary();
  table.text('imgUrl');
  table.text('title');
  table.text('code');
  table.decimal('price');
})


exports.down = knex => knex.schemas.dropTable("cards") 

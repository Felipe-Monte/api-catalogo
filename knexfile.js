module.exports = {
  client: 'sqlite3',
  connection: {
    filename: './src/database/cards.db',
  },
  useNullAsDefault: true,
  migrations: {
    directory: './src/database/knex/migrations',
  },
};

require('dotenv').config();

module.exports = {
  client: 'mysql',
  logging: false,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
  },
};
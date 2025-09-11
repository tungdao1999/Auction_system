require('dotenv').config();
const SequelizeAuto = require('sequelize-auto');

const auto = new SequelizeAuto(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT || 'mysql',
    port: process.env.DB_PORT || 3306,
    directory: 'server/database/models',
    additional: {
      timestamps: false
    },
    logging: console.log
  }
);

auto.run(err => {
  if (err) {
    console.log("error:", err);
    throw err;
  }
  console.log('✔️ Models generated successfully');
});
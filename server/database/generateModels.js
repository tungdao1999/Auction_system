const { SequelizeAuto } = require('sequelize-auto');
require('dotenv').config();

console.log("DB_NAME", process.env.DB_NAME)
const auto = new SequelizeAuto(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql', 
    port: process.env.DB_PORT,
    directory: './models',       
    additional: {
      timestamps: false
    }
  }
);

auto.run(err => {

  if (err) {
    throw err;
  };
  console.log('✔️ Models generated successfully');
});



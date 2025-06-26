const config = require('../config');
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  config.db.connection.database,
  config.db.connection.user,
  config.db.connection.password || "",
  {
    host: config.db.connection.host,
    dialect: config.db.client,
    logging: config.db.logging,
  }
);

sequelize
  .authenticate()
  .then(() => console.log(`✅ Connected to ${config.db.client.toUpperCase()}`))
  .catch((err) => console.error("❌ Database connection failed:", err));

module.exports = sequelize;
const config = require('../config');
const { initModels } = require('./models/init-models');
const { Sequelize, DataTypes } = require("sequelize");

console.log("Initializing database connection...", config.db.connection);
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


const init_model = initModels(sequelize);
const models = {
  User: init_model.users,
  Admin: init_model.admin,
  Buyer: init_model.buyer,
  Seller: init_model.seller,
  Item: init_model.item,
  Auction: init_model.auction,
  BidHistory: init_model.bid_history,
  Bid: init_model.bid,
  // Add more models here later
};

module.exports = {
  sequelize,
  ...models 
};
var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _auction = require("./auction");
var _bid_history = require("./bid_history");
var _buyer = require("./buyer");
var _item = require("./item");
var _seller = require("./seller");
var _users = require("./users");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var auction = _auction(sequelize, DataTypes);
  var bid_history = _bid_history(sequelize, DataTypes);
  var buyer = _buyer(sequelize, DataTypes);
  var item = _item(sequelize, DataTypes);
  var seller = _seller(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  bid_history.belongsTo(auction, { as: "auction", foreignKey: "auctionId"});
  auction.hasMany(bid_history, { as: "bid_histories", foreignKey: "auctionId"});
  bid_history.belongsTo(buyer, { as: "buyer", foreignKey: "buyerId"});
  buyer.hasMany(bid_history, { as: "bid_histories", foreignKey: "buyerId"});
  auction.belongsTo(item, { as: "item", foreignKey: "itemId"});
  item.hasMany(auction, { as: "auctions", foreignKey: "itemId"});
  bid_history.belongsTo(item, { as: "item", foreignKey: "itemId"});
  item.hasMany(bid_history, { as: "bid_histories", foreignKey: "itemId"});
  auction.belongsTo(seller, { as: "seller", foreignKey: "sellerId"});
  seller.hasMany(auction, { as: "auctions", foreignKey: "sellerId"});
  item.belongsTo(seller, { as: "seller", foreignKey: "sellerId"});
  seller.hasMany(item, { as: "items", foreignKey: "sellerId"});
  buyer.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(buyer, { as: "buyers", foreignKey: "userId"});
  seller.belongsTo(users, { as: "user", foreignKey: "userId"});
  users.hasMany(seller, { as: "sellers", foreignKey: "userId"});

  return {
    admin,
    auction,
    bid_history,
    buyer,
    item,
    seller,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

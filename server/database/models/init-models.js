var DataTypes = require("sequelize").DataTypes;
var _admin = require("./admin");
var _auction = require("./auction");
var _auction_item = require("./auction_item");
var _bid = require("./bid");
var _buyer = require("./buyer");
var _item = require("./item");
var _seller = require("./seller");
var _users = require("./users");

function initModels(sequelize) {
  var admin = _admin(sequelize, DataTypes);
  var auction = _auction(sequelize, DataTypes);
  var auction_item = _auction_item(sequelize, DataTypes);
  var bid = _bid(sequelize, DataTypes);
  var buyer = _buyer(sequelize, DataTypes);
  var item = _item(sequelize, DataTypes);
  var seller = _seller(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  auction.belongsToMany(item, { as: 'itemId_items', through: auction_item, foreignKey: "auctionId", otherKey: "itemId" });
  item.belongsToMany(auction, { as: 'auctionId_auctions', through: auction_item, foreignKey: "itemId", otherKey: "auctionId" });
  auction_item.belongsTo(auction, { as: "auction", foreignKey: "auctionId"});
  auction.hasMany(auction_item, { as: "auction_items", foreignKey: "auctionId"});
  bid.belongsTo(auction, { as: "auction", foreignKey: "auctionId"});
  auction.hasMany(bid, { as: "bids", foreignKey: "auctionId"});
  bid.belongsTo(buyer, { as: "buyer", foreignKey: "buyerId"});
  buyer.hasMany(bid, { as: "bids", foreignKey: "buyerId"});
  auction.belongsTo(item, { as: "item", foreignKey: "itemId"});
  item.hasMany(auction, { as: "auctions", foreignKey: "itemId"});
  auction_item.belongsTo(item, { as: "item", foreignKey: "itemId"});
  item.hasMany(auction_item, { as: "auction_items", foreignKey: "itemId"});
  bid.belongsTo(item, { as: "item", foreignKey: "itemId"});
  item.hasMany(bid, { as: "bids", foreignKey: "itemId"});
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
    auction_item,
    bid,
    buyer,
    item,
    seller,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

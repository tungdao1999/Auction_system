var DataTypes = require("sequelize").DataTypes;
var _sequelizemeta = require("./sequelizemeta");
var _test = require("./test");
var _users = require("./users");

function initModels(sequelize) {
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var test = _test(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);


  return {
    sequelizemeta,
    test,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;

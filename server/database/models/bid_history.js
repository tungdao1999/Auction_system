const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bid_history', {
    id: {
      type: DataTypes.STRING(50),
      allowNull: false,
      primaryKey: true
    },
    buyerId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'buyer',
        key: 'id'
      }
    },
    auctionId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'auction',
        key: 'id'
      }
    },
    itemId: {
      type: DataTypes.STRING(50),
      allowNull: false,
      references: {
        model: 'item',
        key: 'id'
      }
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bid_history',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "buyerId",
        using: "BTREE",
        fields: [
          { name: "buyerId" },
        ]
      },
      {
        name: "auctionId",
        using: "BTREE",
        fields: [
          { name: "auctionId" },
        ]
      },
      {
        name: "itemId",
        using: "BTREE",
        fields: [
          { name: "itemId" },
        ]
      },
    ]
  });
};
